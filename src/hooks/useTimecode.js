import { useEffect, useRef } from 'react';

const pad = (value) => String(value).padStart(2, '0');

/**
 * A running HH:MM:SS:FF readout at 24 fps — the small clapperboard detail in
 * the hero base strip. Writes to the node's textContent inside a rAF loop
 * rather than through state, so it never re-renders the hero.
 *
 * Pass `enabled: false` (reduced motion) to leave the readout frozen at its
 * initial value.
 */
export default function useTimecode(enabled = true, fps = 24) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return undefined;

    const started = performance.now();
    let frame = 0;

    const render = (now) => {
      const elapsed = (now - started) / 1000;
      const seconds = Math.floor(elapsed);
      const frames = Math.floor((elapsed - seconds) * fps);

      node.textContent = [
        pad(Math.floor(seconds / 3600)),
        pad(Math.floor(seconds / 60) % 60),
        pad(seconds % 60),
        pad(frames),
      ].join(':');

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [enabled, fps]);

  return ref;
}
