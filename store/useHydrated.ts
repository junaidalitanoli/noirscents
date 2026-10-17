"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * React 19 & Next.js 15 safe hydration detector using useSyncExternalStore.
 * Returns false on server/initial client hydration render, and true once hydrated.
 * Avoids cascading renders and hydration mismatches without useEffect setState.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
