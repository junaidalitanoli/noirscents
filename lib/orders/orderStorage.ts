import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Order, OrderStatus } from "@/types";

export function generateServerOrderId(): string {
  // Format: NS-XXXXXXXX (8 random digits: 10000000 - 99999999)
  const num = crypto.randomInt(10000000, 100000000);
  return `NS-${num}`;
}

export interface OrderStorageResult {
  success: boolean;
  isDuplicate?: boolean;
  order: Order;
  error?: string;
  storageProvider: "supabase" | "file" | "none";
}

export interface StorageStatus {
  type: "supabase" | "file";
  isConfigured: boolean;
  isDurableProduction: boolean;
  provider: string;
}

// In-memory cache for fast lookup during function execution
const memoryOrders = new Map<string, Order>();
const idempotencyMap = new Map<string, string>(); // idempotencyKey -> orderId

// Local filesystem data path
const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

function cleanEnvVal(val?: string) {
  if (!val) return "";
  let v = val.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

function getSupabaseConfig() {
  const url = cleanEnvVal(process.env.SUPABASE_URL);
  const serviceKey = cleanEnvVal(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY);
  if (url && serviceKey && !url.includes("your-project") && !serviceKey.includes("your_service_role") && !serviceKey.includes("your_anon_key")) {
    const cleanUrl = url.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
    return { url: cleanUrl, key: serviceKey };
  }
  return null;
}

export function getOrderStorageStatus(): StorageStatus {
  const supabase = getSupabaseConfig();
  if (supabase) {
    return {
      type: "supabase",
      isConfigured: true,
      isDurableProduction: true,
      provider: "Supabase PostgreSQL (Managed Cloud)",
    };
  }

  const isProd = process.env.NODE_ENV === "production";
  return {
    type: "file",
    isConfigured: !isProd, // In production, file storage is not durable on serverless
    isDurableProduction: false,
    provider: isProd
      ? "Local Ephemeral Storage (Production Database Unconfigured)"
      : "Local File Storage (data/orders.json)",
  };
}

function ensureFileStorageReady() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.warn("[OrderStorage] Notice ensuring data directory:", err);
  }
}

function readLocalOrders(): Order[] {
  try {
    ensureFileStorageReady();
    if (!fs.existsSync(ORDERS_FILE)) {
      return Array.from(memoryOrders.values());
    }
    const raw = fs.readFileSync(ORDERS_FILE, "utf8");
    const parsed: Order[] = JSON.parse(raw || "[]");
    return parsed;
  } catch (err) {
    console.error("[OrderStorage] Error reading local orders file:", err);
    return Array.from(memoryOrders.values());
  }
}

function writeLocalOrders(orders: Order[]): boolean {
  try {
    ensureFileStorageReady();
    const tempFile = `${ORDERS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(orders, null, 2), "utf8");
    fs.renameSync(tempFile, ORDERS_FILE);
    return true;
  } catch (err) {
    console.error("[OrderStorage] Error writing local orders file:", err);
    return false;
  }
}

interface SupabaseOrderRow {
  id: string;
  customer: Order["customer"];
  items: Order["items"];
  subtotal: number | string;
  shipping_fee: number | string;
  total: number | string;
  status: string;
  payment_method: string;
  created_at: string;
  email_status?: string;
  email_error?: string;
  idempotency_key?: string;
}

function mapSupabaseRowToOrder(row: SupabaseOrderRow): Order {
  return {
    id: row.id,
    customer: row.customer,
    items: row.items,
    subtotal: Number(row.subtotal),
    shippingFee: Number(row.shipping_fee),
    total: Number(row.total),
    status: row.status as OrderStatus,
    paymentMethod: (row.payment_method || "Cash on Delivery") as Order["paymentMethod"],
    createdAt: row.created_at,
    emailStatus: row.email_status as Order["emailStatus"],
    emailError: row.email_error,
    idempotencyKey: row.idempotency_key,
  };
}

/**
 * Persists an order durably to Supabase or local storage fallback.
 * Checks for duplicate submissions via idempotency key and existing order ID.
 */
export async function saveOrder(
  order: Order,
  options?: { idempotencyKey?: string }
): Promise<OrderStorageResult> {
  const supabase = getSupabaseConfig();
  const rawKey = options?.idempotencyKey || order.idempotencyKey;
  const idempotencyKey =
    typeof rawKey === "string" && /^[A-Za-z0-9_-]{10,100}$/.test(rawKey.trim())
      ? rawKey.trim()
      : undefined;

  // 1. Check in-memory idempotency cache
  if (idempotencyKey && idempotencyMap.has(idempotencyKey)) {
    const existingId = idempotencyMap.get(idempotencyKey)!;
    const existing = await getOrderById(existingId);
    if (existing) {
      return {
        success: true,
        isDuplicate: true,
        order: existing,
        storageProvider: supabase ? "supabase" : "file",
      };
    }
  }

  // Graceful fallback if Supabase credentials are not yet active in production
  if (!supabase) {
    console.warn(
      "[OrderStorage] Supabase credentials not found. Saving to in-memory fallback so order is not dropped."
    );
    memoryOrders.set(order.id, order);
    if (idempotencyKey) {
      idempotencyMap.set(idempotencyKey, order.id);
    }
    try {
      const orders = readLocalOrders();
      orders.unshift(order);
      writeLocalOrders(orders.slice(0, 500));
    } catch {}

    return {
      success: true,
      isDuplicate: false,
      order,
      storageProvider: "none",
    };
  }

  // 2. Supabase Storage Adapter
  if (supabase) {
    try {
      // Check duplicate strictly by idempotencyKey (not ID)
      if (idempotencyKey) {
        const keyUrl = `${supabase.url}/rest/v1/orders?idempotency_key=eq.${encodeURIComponent(idempotencyKey)}&select=*`;
        const keyRes = await fetch(keyUrl, {
          headers: {
            apikey: supabase.key,
            Authorization: `Bearer ${supabase.key}`,
          },
        });

        if (keyRes.ok) {
          const keyRows = await keyRes.json();
          if (Array.isArray(keyRows) && keyRows.length > 0) {
            const mappedOrder = mapSupabaseRowToOrder(keyRows[0]);
            idempotencyMap.set(idempotencyKey, mappedOrder.id);
            memoryOrders.set(mappedOrder.id, mappedOrder);
            return {
              success: true,
              isDuplicate: true,
              order: mappedOrder,
              storageProvider: "supabase",
            };
          }
        }
      }

      // Insert new order into Supabase with up to 3 retries on ID collision
      let currentOrder: Order = { ...order };
      let insertSuccess = false;
      const MAX_RETRIES = 3;

      for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        const payload = {
          id: currentOrder.id,
          customer: currentOrder.customer,
          items: currentOrder.items,
          subtotal: currentOrder.subtotal,
          shipping_fee: currentOrder.shippingFee,
          total: currentOrder.total,
          status: currentOrder.status,
          payment_method: currentOrder.paymentMethod,
          created_at: currentOrder.createdAt,
          email_status: currentOrder.emailStatus || "pending",
          email_error: currentOrder.emailError || null,
          idempotency_key: idempotencyKey || null,
        };

        const insertRes = await fetch(`${supabase.url}/rest/v1/orders`, {
          method: "POST",
          headers: {
            apikey: supabase.key,
            Authorization: `Bearer ${supabase.key}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify(payload),
        });

        if (insertRes.ok) {
          insertSuccess = true;
          break;
        }

        // Unique constraint conflict (HTTP 409)
        if (insertRes.status === 409) {
          // Check if conflict was caused by idempotencyKey (true duplicate submission)
          if (idempotencyKey) {
            const keyUrl = `${supabase.url}/rest/v1/orders?idempotency_key=eq.${encodeURIComponent(idempotencyKey)}&select=*`;
            const keyRes = await fetch(keyUrl, {
              headers: {
                apikey: supabase.key,
                Authorization: `Bearer ${supabase.key}`,
              },
            });
            if (keyRes.ok) {
              const rows = await keyRes.json();
              if (Array.isArray(rows) && rows.length > 0) {
                const dupOrder = mapSupabaseRowToOrder(rows[0]);
                memoryOrders.set(dupOrder.id, dupOrder);
                idempotencyMap.set(idempotencyKey, dupOrder.id);
                return {
                  success: true,
                  isDuplicate: true,
                  order: dupOrder,
                  storageProvider: "supabase",
                };
              }
            }
          }

          // Conflict was an ID collision on primary key: generate fresh ID and retry
          console.warn(`[OrderStorage] ID collision on ${currentOrder.id}. Retrying with fresh ID (attempt ${attempt + 1}/${MAX_RETRIES})...`);
          currentOrder = {
            ...currentOrder,
            id: generateServerOrderId(),
          };
          continue;
        }

        if (!insertRes.ok) {
          let errText = "";
          try { errText = await insertRes.text(); } catch {}
          console.error(`[OrderStorage] Supabase insert failed: ${insertRes.status} ${errText}`);
          throw new Error(`Supabase error (${insertRes.status}): ${errText}`);
        }
      }

      if (!insertSuccess) {
        throw new Error("Failed to persist order after ID collision retries.");
      }

      memoryOrders.set(currentOrder.id, currentOrder);
      if (idempotencyKey) {
        idempotencyMap.set(idempotencyKey, currentOrder.id);
      }

      return {
        success: true,
        isDuplicate: false,
        order: currentOrder,
        storageProvider: "supabase",
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[OrderStorage] Supabase exception during saveOrder:", msg);
      // Resilience fallback: Save to memory so the customer's order is NOT dropped
      memoryOrders.set(order.id, order);
      if (idempotencyKey) {
        idempotencyMap.set(idempotencyKey, order.id);
      }
      return {
        success: true,
        isDuplicate: false,
        order,
        storageProvider: "none",
      };
    }
  }

  // 3. Local File Storage Fallback (Development & Testing)
  try {
    const orders = readLocalOrders();

    // Check duplicate strictly by idempotencyKey (not ID)
    if (idempotencyKey) {
      const existingIndex = orders.findIndex((o) => o.idempotencyKey === idempotencyKey);
      if (existingIndex >= 0) {
        const existing = orders[existingIndex];
        memoryOrders.set(existing.id, existing);
        if (idempotencyKey) idempotencyMap.set(idempotencyKey, existing.id);
        return {
          success: true,
          isDuplicate: true,
          order: existing,
          storageProvider: "file",
        };
      }
    }

    // Handle ID collision on insert: if order.id exists in local storage, retry with fresh ID up to 3 times
    const orderToSave: Order = {
      ...order,
      idempotencyKey,
    };

    const MAX_FILE_RETRIES = 3;
    for (let attempt = 0; attempt < MAX_FILE_RETRIES; attempt++) {
      const isIdTaken = orders.some((o) => o.id.toLowerCase() === orderToSave.id.toLowerCase());
      if (isIdTaken) {
        console.warn(`[OrderStorage] Local ID collision on ${orderToSave.id}. Retrying with fresh ID (attempt ${attempt + 1}/${MAX_FILE_RETRIES})...`);
        orderToSave.id = generateServerOrderId();
        continue;
      }
      break;
    }

    orders.unshift(orderToSave);
    const writeOk = writeLocalOrders(orders);
    if (!writeOk) {
      console.error("[OrderStorage] Local file write returned false for order", orderToSave.id);
      return {
        success: false,
        order: orderToSave,
        error: "Failed to write order to local storage file",
        storageProvider: "file",
      };
    }

    memoryOrders.set(orderToSave.id, orderToSave);
    if (idempotencyKey) {
      idempotencyMap.set(idempotencyKey, orderToSave.id);
    }

    return {
      success: true,
      isDuplicate: false,
      order: orderToSave,
      storageProvider: "file",
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[OrderStorage] Local file save failed:", msg);
    return {
      success: false,
      order,
      error: `Local persistence failed: ${msg}`,
      storageProvider: "file",
    };
  }
}

/**
 * Retrieve an order by its order ID (case-insensitive)
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  if (!orderId || typeof orderId !== "string") {
    return null;
  }
  const cleanId = orderId.trim();

  // Wildcard rejection: Disallow wildcard characters (*, %, _) to prevent data leakage
  if (/[*%_]/.test(cleanId)) {
    return null;
  }

  // Check in-memory cache first (case-insensitive exact comparison)
  for (const [id, order] of memoryOrders.entries()) {
    if (id.toLowerCase() === cleanId.toLowerCase()) {
      return order;
    }
  }

  // Check Supabase if configured (exact match eq)
  const supabase = getSupabaseConfig();
  if (supabase) {
    try {
      const res = await fetch(
        `${supabase.url}/rest/v1/orders?id=eq.${encodeURIComponent(cleanId)}&select=*`,
        {
          headers: {
            apikey: supabase.key,
            Authorization: `Bearer ${supabase.key}`,
          },
        }
      );
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          const row = rows[0];
          const order: Order = {
            id: row.id,
            customer: row.customer,
            items: row.items,
            subtotal: Number(row.subtotal),
            shippingFee: Number(row.shipping_fee),
            total: Number(row.total),
            status: row.status as OrderStatus,
            paymentMethod: row.payment_method,
            createdAt: row.created_at,
            emailStatus: row.email_status,
            emailError: row.email_error,
            idempotencyKey: row.idempotency_key,
          };
          memoryOrders.set(order.id, order);
          return order;
        }
      }
    } catch (err) {
      console.error("[OrderStorage] Supabase getOrderById error:", err);
    }
  }

  // Check local file storage
  const localOrders = readLocalOrders();
  const matched = localOrders.find(
    (o) => o.id.toLowerCase() === cleanId.toLowerCase()
  );
  if (matched) {
    memoryOrders.set(matched.id, matched);
    return matched;
  }

  return null;
}

/**
 * List orders for the authenticated admin dashboard
 */
export async function listOrders(limit = 100): Promise<Order[]> {
  const supabase = getSupabaseConfig();
  if (supabase) {
    try {
      const res = await fetch(
        `${supabase.url}/rest/v1/orders?select=*&order=created_at.desc&limit=${limit}`,
        {
          headers: {
            apikey: supabase.key,
            Authorization: `Bearer ${supabase.key}`,
          },
        }
      );
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows)) {
          return rows.map((row) => ({
            id: row.id,
            customer: row.customer,
            items: row.items,
            subtotal: Number(row.subtotal),
            shippingFee: Number(row.shipping_fee),
            total: Number(row.total),
            status: row.status as OrderStatus,
            paymentMethod: row.payment_method,
            createdAt: row.created_at,
            emailStatus: row.email_status,
            emailError: row.email_error,
            idempotencyKey: row.idempotency_key,
          }));
        }
      }
    } catch (err) {
      console.error("[OrderStorage] Supabase listOrders error:", err);
    }
  }

  const localOrders = readLocalOrders();
  return localOrders.slice(0, limit);
}

/**
 * Update order status (Pending -> Shipped -> Delivered)
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<boolean> {
  const supabase = getSupabaseConfig();
  if (supabase) {
    try {
      const res = await fetch(
        `${supabase.url}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}`,
        {
          method: "PATCH",
          headers: {
            apikey: supabase.key,
            Authorization: `Bearer ${supabase.key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        const cached = memoryOrders.get(orderId);
        if (cached) {
          memoryOrders.set(orderId, { ...cached, status });
        }
        return true;
      }
      return false;
    } catch (err) {
      console.error("[OrderStorage] Supabase updateOrderStatus error:", err);
      return false;
    }
  }

  // Update in local file (only when Supabase is not configured)
  const orders = readLocalOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index >= 0) {
    orders[index].status = status;
    writeLocalOrders(orders);
    memoryOrders.set(orderId, orders[index]);
    return true;
  }
  return false;
}

/**
 * Updates email notification dispatch status on an existing order
 */
export async function updateOrderEmailStatus(
  orderId: string,
  emailStatus: "sent" | "failed" | "unconfigured" | "skipped",
  emailError?: string
): Promise<boolean> {
  const supabase = getSupabaseConfig();
  if (supabase) {
    try {
      await fetch(
        `${supabase.url}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}`,
        {
          method: "PATCH",
          headers: {
            apikey: supabase.key,
            Authorization: `Bearer ${supabase.key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_status: emailStatus,
            email_error: emailError || null,
          }),
        }
      );
    } catch (err) {
      console.warn("[OrderStorage] Supabase updateOrderEmailStatus error:", err);
    }
  }

  // Update in local file
  const orders = readLocalOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index >= 0) {
    orders[index].emailStatus = emailStatus;
    if (emailError) orders[index].emailError = emailError;
    writeLocalOrders(orders);
    if (memoryOrders.has(orderId)) {
      const mem = memoryOrders.get(orderId)!;
      mem.emailStatus = emailStatus;
      mem.emailError = emailError;
    }
    return true;
  }
  return false;
}
