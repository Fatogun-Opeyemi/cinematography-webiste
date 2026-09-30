import { useCallback, useEffect, useRef, useState } from 'react';

/** Copy a string to the clipboard, reporting success for a short moment. */
export default function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef(0);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const copy = useCallback(
    async (value) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.clearTimeout(timeout.current);
        timeout.current = window.setTimeout(() => setCopied(false), resetAfter);
        return true;
      } catch {
        return false;
      }
    },
    [resetAfter],
  );

  return { copied, copy };
}
