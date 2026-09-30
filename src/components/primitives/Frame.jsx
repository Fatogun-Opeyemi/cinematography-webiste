import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import styles from './Frame.module.css';

/**
 * The single media primitive: a bordered aspect-ratio frame holding a still,
 * an optional caption in the mono voice, and an optional inline video loop.
 *
 * Conventions
 *   ratio      'cinema' (2.39:1) | 'wide' | 'photo' | 'portrait' | 'square'
 *   contained  show the whole frame instead of cropping (for full-frame stills)
 *   videoSrc   a muted, looping clip replaces the still — skipped entirely for
 *              reduced-motion visitors, who keep the poster
 *   children   overlay content, e.g. a title laid over the opening frame
 *
 * Images fade up from the letterbox black once decoded; failures resolve to
 * visible rather than leaving an empty frame.
 */
export default function Frame({
  src,
  alt,
  ratio = 'wide',
  caption,
  credit,
  contained = false,
  videoSrc,
  zoom = false,
  priority = false,
  className = '',
  children,
  ...rest
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  /* Handles images already in cache before the load listener attached. */
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  const showVideo = Boolean(videoSrc) && !reducedMotion;

  return (
    <figure
      className={[styles.frame, className].filter(Boolean).join(' ')}
      data-ratio={ratio}
      data-contained={contained || undefined}
      data-zoom={zoom || undefined}
      data-loaded={loaded || showVideo || undefined}
      {...rest}
    >
      <div className={styles.media}>
        {showVideo ? (
          <video
            className={styles.asset}
            src={videoSrc}
            poster={src}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            aria-label={alt}
          />
        ) : (
          <img
            ref={imgRef}
            className={styles.asset}
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
        )}

        {children ? <div className={styles.overlay}>{children}</div> : null}
      </div>

      {caption || credit ? (
        <figcaption className={styles.caption}>
          {caption ? <span>{caption}</span> : null}
          {credit ? <span className={styles.credit}>{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
