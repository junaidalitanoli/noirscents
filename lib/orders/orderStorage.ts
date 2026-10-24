import fs from "fs";
import path from "path";
import { Order, OrderStatus } from "@/types";

export interface OrderStorageResult {
  success: boolean;
  isDuplicate?: boolean;
  order: Order;
  error?: string;
  storageProvider: "supabase" | "file";
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

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (url && serviceKey && !url.includes("your-project") && !serviceKey.includes("your_service_role")) {
    return { url: url.replace(/\/$/, ""), key: serviceKey };
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

/**
 * Persists an order durably to Supabase or local storage fallback.
 * Checks for duplicate submissions via idempotency key and existing order ID.
 */
export async function saveOrder(
  order: Order,
  options?: { idempotencyKey?: string }
): Promise<OrderStorageResult> {
  const supabase = getSupabaseConfig();
  const idempotencyKey = options?.idempotencyKey || order.idempotencyKey;

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

  // 2. Supabase Storage Adapter
  if (supabase) {
    try {
      // Check if order with same ID or idempotency key already exists
      const checkUrl = idempotencyKey
        ? `${supabase.url}/rest/v1/orders?or=(id.eq.${encodeURIComponent(order.id)},idempotency_key.eq.${encodeURIComponent(idempotencyKey)})&select=*`
        : `${supabase.url}/rest/v1/orders?id=eq.${encodeURIComponent(order.id)}&select=*`;

      const checkRes = await fetch(checkUrl, {
        headers: {
          apikey: supabase.key,
          Authorization: `Bearer ${supabase.key}`,
        },
      });

      if (checkRes.ok) {
        const existingRows = await checkRes.json();
        if (Array.isArray(existingRows) && existingRows.length > 0) {
          const row = existingRows[0];
          const mappedOrder: Order = {
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
          if (idempotencyKey) {
            idempotencyMap.set(idempotencyKey, row.id);
          }
          memoryOrders.set(row.id, mappedOrder);
          return {
            success: true,
            isDuplicate: true,
            order: mappedOrder,
            storageProvider: "supabase",
          };
        }
      }

      // Insert new order into Supabase
      const payload = {
        id: order.id,
        customer: order.customer,
        items: order.items,
        subtotal: order.subtotal,
        shipping_fee: order.shippingFee,
        total: order.total,
        status: order.status,
        payment_method: order.paymentMethod,
        created_at: order.createdAt,
        email_status: order.emailStatus || "pending",
        email_error: order.emailError || null,
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

      if (!insertRes.ok) {
        const errorText = await insertRes.text();
        console.error("[OrderStorage] Supabase insert failed:", insertRes.status, errorText);
        throw new Error(`Supabase error (${insertRes.status}): ${errorText}`);
      }

      memoryOrders.set(order.id, order);
      if (idempotencyKey) {
        idempotencyMap.set(idempotencyKey, order.id);
      }

      return {
        success: true,
        isDuplicate: false,
        order,
        storageProvider: "supabase",
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[OrderStorage] Supabase exception during saveOrder:", msg);
      return {
        success: false,
        order,
        error: `Database persistence failed: ${msg}`,
        storageProvider: "supabase",
      };
    }
  }

  // 3. Local File Storage Fallback (Development & Testing)
  try {
    const orders = readLocalOrders();

    // Check duplicate by ID or idempotencyKey
    const existingIndex = orders.findIndex(
      (o) => o.id === order.id || (idempotencyKey && o.idempotencyKey === idempotencyKey)
    );

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

    const orderToSave: Order = {
      ...order,
      idempotencyKey,
    };

    orders.unshift(orderToSave);
    writeLocalOrders(orders);
    memoryOrders.set(order.id, orderToSave);
    if (idempotencyKey) {
      idempotencyMap.set(idempotencyKey, order.id);
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
  const cleanId = orderId.trim();

  // Check in-memory cache first
  for (const [id, order] of memoryOrders.entries()) {
    if (id.toLowerCase() === cleanId.toLowerCase()) {
      return order;
    }
  }

  // Check Supabase if configured
  const supabase = getSupabaseConfig();
  if (supabase) {
    try {
      const res = await fetch(
        `${supabase.url}/rest/v1/orders?id=ilike.${encodeURIComponent(cleanId)}&select=*`,
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
      if (!res.ok) {
        return false;
      }
    } catch (err) {
      console.error("[OrderStorage] Supabase updateOrderStatus error:", err);
      return false;
    }
  }

  // Update in local file
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
