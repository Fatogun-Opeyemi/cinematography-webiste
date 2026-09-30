import { Link } from 'react-router-dom';
import styles from './WorkRow.module.css';

/**
 * One line of the work index. The whole row is the link, so the hit area is
 * the row rather than the words.
 *
 * Layout shifts by breakpoint: a two-line stack on small screens, a single
 * ruled line across five columns on desktop. `display: contents` on the meta
 * wrapper lets the same markup serve both.
 */
export default function WorkRow({ project, index, onEnter, onLeave, inlineThumb = false }) {
  return (
    <li className={styles.row}>
      <Link
        to={`/work/${project.slug}`}
        className={styles.link}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
      >
        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.title}>{project.title}</span>

        <span className={styles.meta}>
          <span className={styles.type}>{project.type}</span>
          <span className={styles.year}>{project.year}</span>
          <span className={styles.runtime}>{project.runtime}</span>
        </span>

        {inlineThumb ? (
          <span className={styles.thumb}>
            <img src={project.poster} alt="" loading="lazy" decoding="async" />
          </span>
        ) : null}
      </Link>
    </li>
  );
}
