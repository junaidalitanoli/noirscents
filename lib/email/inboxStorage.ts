import fs from "fs";
import path from "path";

export interface InboundEmailRecord {
  id: string;
  emailId: string;
  from: string;
  to: string[];
  subject: string;
  receivedAt: string;
  text?: string;
  html?: string;
  snippet?: string;
  attachmentsCount?: number;
  rawEvent?: unknown;
}

// In-memory set for rapid idempotency verification
const processedEventIds = new Set<string>();

// Data file path for local persistence
const DATA_DIR = path.join(process.cwd(), "data");
const INBOX_FILE = path.join(DATA_DIR, "inbound-emails.json");

// Ensure data directory exists
function ensureStorageReady() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(INBOX_FILE)) {
      fs.writeFileSync(INBOX_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.warn("[InboxStorage] Filesystem storage notice (in-memory mode active):", err);
  }
}

export function isEventProcessed(eventId: string): boolean {
  if (processedEventIds.has(eventId)) {
    return true;
  }
  return false;
}

export function markEventProcessed(eventId: string): void {
  processedEventIds.add(eventId);
  // Cap in-memory set size to prevent memory bloat
  if (processedEventIds.size > 1000) {
    const firstKey = processedEventIds.values().next().value;
    if (firstKey) processedEventIds.delete(firstKey);
  }
}

export function saveInboundEmail(record: InboundEmailRecord): boolean {
  markEventProcessed(record.id);
  if (record.emailId) {
    markEventProcessed(record.emailId);
  }

  try {
    ensureStorageReady();
    let records: InboundEmailRecord[] = [];
    if (fs.existsSync(INBOX_FILE)) {
      const content = fs.readFileSync(INBOX_FILE, "utf8");
      records = JSON.parse(content || "[]");
    }

    // Check if emailId already saved
    if (!records.some((r) => r.emailId === record.emailId || r.id === record.id)) {
      records.unshift(record); // newest first
      // Keep up to 200 recent emails
      if (records.length > 200) {
        records = records.slice(0, 200);
      }
      fs.writeFileSync(INBOX_FILE, JSON.stringify(records, null, 2), "utf8");
    }
    return true;
  } catch (err) {
    console.error("[InboxStorage] Error writing inbound email to storage:", err);
    return false;
  }
}

export function getInboundEmails(limit = 50): InboundEmailRecord[] {
  try {
    ensureStorageReady();
    if (!fs.existsSync(INBOX_FILE)) {
      return [];
    }
    const content = fs.readFileSync(INBOX_FILE, "utf8");
    const records: InboundEmailRecord[] = JSON.parse(content || "[]");
    return records.slice(0, limit);
  } catch (err) {
    console.error("[InboxStorage] Error reading inbound emails:", err);
    return [];
  }
}
