"use client";

import { useSyncExternalStore } from "react";
import { useCartStore } from "./cartStore";

function subscribe(callback: () => void) {
  const unsubStore = useCartStore.subscribe(callback);
  const unsubHydrate =
    typeof useCartStore.persist?.onFinishHydration === "function"
      ? useCartStore.persist.onFinishHydration(callback)
      : () => {};

  return () => {
    unsubStore();
    unsubHydrate();
  };
}

function getSnapshot(): boolean {
  if (useCartStore.getState()._hasHydrated) {
    return true;
  }
  if (
    typeof window !== "undefined" &&
    typeof useCartStore.persist?.hasHydrated === "function"
  ) {
    return useCartStore.persist.hasHydrated();
  }
  return false;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * Ensures cart store has truly rehydrated from localStorage before rendering.
 * Uses useSyncExternalStore for tear-free, hydration-safe state synchronization.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
