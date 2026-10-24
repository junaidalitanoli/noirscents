-- =============================================================================
-- NOIR SCENTS — DURABLE ORDER STORAGE SCHEMA (SUPABASE POSTGRESQL)
-- =============================================================================
-- Execute this script in the Supabase SQL Editor (https://supabase.com/dashboard)
-- to provision durable, server-side order storage for Noir Scents.

CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer JSONB NOT NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) NOT NULL,
    total NUMERIC(10, 2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Shipped', 'Delivered')),
    payment_method TEXT NOT NULL DEFAULT 'Cash on Delivery',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    email_status TEXT DEFAULT 'pending' CHECK (email_status IN ('pending', 'sent', 'failed', 'unconfigured', 'skipped')),
    email_error TEXT,
    idempotency_key TEXT UNIQUE
);

-- Indices for rapid administrative querying and customer lookups
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders((customer->>'phone'));
CREATE INDEX IF NOT EXISTS idx_orders_idempotency_key ON public.orders(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

-- Security: Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Default: Disallow anonymous client-side direct access.
-- Server-side Next.js route handlers use the SUPABASE_SERVICE_ROLE_KEY which bypasses RLS.
-- This guarantees customer PII and orders cannot be read from the browser.
