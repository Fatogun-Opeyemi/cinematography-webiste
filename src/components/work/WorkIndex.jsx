import { useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import usePointerPreview from '../../hooks/usePointerPreview';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import WorkRow from './WorkRow';
import styles from './WorkIndex.module.css';

/**
 * The index of work — a ruled list, not a grid of cards, so the titles carry
 * the page and no image competes with the typography.
 *
 * On a fine pointer the hovered project plays as a small frame that trails the
 * cursor (transform written directly to the node, so it never re-renders).
 * On touch, and for reduced-motion visitors, the frame simply sits inline in
 * the row. Same data, two honest presentations.
 */
export default function WorkIndex({ projects, className = '' }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reducedMotion = usePrefersReducedMotion();

  const tracksPointer = finePointer && !reducedMotion;
  const previewRef = usePointerPreview(Boolean(activeSlug) && tracksPointer);
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? null;

  return (
    <div className={[styles.index, className].filter(Boolean).join(' ')}>
      <ol className={styles.list} onMouseLeave={() => setActiveSlug(null)}>
        {projects.map((project, index) => (
          <WorkRow
            key={project.slug}
            project={project}
            index={index}
            inlineThumb={!finePointer}
            onEnter={() => setActiveSlug(project.slug)}
            onLeave={() => setActiveSlug(null)}
          />
        ))}
      </ol>

      {tracksPointer ? (
        <div className={styles.previewLayer} aria-hidden="true">
          <div ref={previewRef} className={styles.previewAnchor}>
            <div className={styles.preview} data-visible={activeProject ? 'true' : undefined}>
              {activeProject ? (
                <>
                  <img
                    className={styles.previewMedia}
                    src={activeProject.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={styles.previewMeta}>
                    <span className={styles.previewTitle}>{activeProject.title}</span>
                    <span>
                      {activeProject.type} · {activeProject.year}
                    </span>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
