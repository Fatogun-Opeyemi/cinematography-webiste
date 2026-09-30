import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribe to a CSS media query.
 *
 * Built on `useSyncExternalStore` so the browser is the single source of truth:
 * React re-reads it on every change instead of mirroring it into state inside
 * an effect (which causes a cascading render on mount). Used for pointer
 * capability and motion preference, never for layout.
 */
export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (onStoreChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onStoreChange);
      return () => list.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  /* Server snapshot: assume the conservative case. */
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

