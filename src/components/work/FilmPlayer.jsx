import { useEffect, useRef } from 'react';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { Close } from '../primitives/Glyph';
import styles from './FilmPlayer.module.css';

/**
 * The film overlay — the one moment where the site gets out of the way and the
 * footage fills the screen.
 *
 * Opened through `useFilm()` from anywhere on the site, so the hero showreel,
 * a featured frame and a project page all share one player and one dialog.
 *
 * film: { src, poster, title, meta, footnote }
 */
export default function FilmPlayer({ film, onClose }) {
  const open = Boolean(film);
  const closeRef = useRef(null);
  const videoRef = useRef(null);
  const returnFocusRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;

    /* Remember where focus came from so it can be handed back on close. */
    returnFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    /* Requested by a real click, so autoplay with sound is permitted here. */
    videoRef.current?.play().catch(() => {});

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (returnFocusRef.current instanceof HTMLElement) returnFocusRef.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`${film.title} — video player`}
      onClick={onClose}
    >
      <div className={styles.bar}>
        <div className={styles.titles}>
          <p className={styles.title}>{film.title}</p>
          {film.meta ? <p className={styles.meta}>{film.meta}</p> : null}
        </div>

        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          <Close />
          <span>Close</span>
        </button>
      </div>

      <div className={styles.stage} onClick={(event) => event.stopPropagation()}>
        <video
          ref={videoRef}
          className={styles.video}
          src={film.src}
          poster={film.poster}
          controls
          autoPlay
          playsInline
          preload="auto"
        />
      </div>

      <div className={styles.foot}>
        {film.footnote ? <p className={styles.footnote}>{film.footnote}</p> : null}
        <p className={styles.hint}>Esc to close</p>
      </div>
    </div>
  );
}
