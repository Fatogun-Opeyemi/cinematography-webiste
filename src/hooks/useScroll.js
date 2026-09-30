import { useEffect, useState } from 'react';

/**
 * Single rAF-throttled scroll listener supplying everything the chrome needs:
 * current offset, page progress (0–1), scroll direction and whether we are at
 * the top. Header, progress line and any sticky element read from this shape
 * instead of each attaching their own handler.
 */
export default function useScroll() {
  const [state, setState] = useState({
    y: 0,
    progress: 0,
    direction: 'down',
    atTop: true,
  });

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const delta = y - lastY;

      setState((previous) => ({
        y,
        progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
        /* Ignore sub-pixel noise so the header does not flicker. */
        direction: Math.abs(delta) > 4 ? (delta > 0 ? 'down' : 'up') : previous.direction,
        atTop: y < 24,
      }));

      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return state;
}
