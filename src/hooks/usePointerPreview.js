import { useEffect, useRef } from 'react';

/**
 * Pointer-following preview for the work index.
 *
 * Returns a ref to attach to the absolutely-positioned preview element. Motion
 * is written straight to the node's transform inside a rAF loop, so following
 * the cursor never triggers a React render.
 *
 * Disabled entirely for touch input and for reduced-motion visitors — in both
 * cases the index falls back to inline thumbnails.
 */
export default function usePointerPreview(enabled) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!enabled || !node) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = reduced ? 1 : 0.13;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let seeded = false;
    let frame = 0;

    const onPointerMove = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!seeded) {
        current.x = target.x;
        current.y = target.y;
        seeded = true;
      }
    };

    const tick = () => {
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      node.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return nodeRef;
}
