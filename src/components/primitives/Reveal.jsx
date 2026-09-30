import { useEffect, useRef, useState } from 'react';

/**
 * The site's only scroll animation.
 *
 * Wraps a child, reveals it once when it enters the viewport, then disconnects.
 * Visual behaviour lives in `styles/utilities.css` under `[data-reveal]` so a
 * single definition governs the whole site.
 *
 * Props
 *   as      element to render (default 'div')
 *   delay   ms to stagger siblings, e.g. index * 60
 *   mode    'fade' for full-bleed media that must not shift position
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  mode,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  /* Environments without IntersectionObserver start revealed — content is
     never hidden behind a feature that may not exist. */
  const [shown, setShown] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setShown(true);
          observer.disconnect();
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-state={shown ? 'in' : 'out'}
      data-reveal-mode={mode}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

