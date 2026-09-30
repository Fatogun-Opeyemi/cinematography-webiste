import { Play } from './Glyph';
import styles from './PlayButton.module.css';

/**
 * The play affordance, used wherever a film can be started: the hero showreel,
 * a featured project, a project page.
 *
 * A hairline circle, a small triangle and a mono label — an editorial caption
 * that happens to be clickable, rather than a large filled button.
 */
export default function PlayButton({
  label = 'Play film',
  runtime,
  size = 'md',
  onClick,
  className = '',
  ...rest
}) {
  return (
    <button
      type="button"
      className={[styles.play, size === 'lg' ? styles.lg : '', className]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      {...rest}
    >
      <span className={styles.glyph} aria-hidden="true">
        <Play size={size === 'lg' ? 12 : 10} />
      </span>

      <span className={styles.body}>
        <span className={styles.label}>{label}</span>
        {runtime ? <span className={styles.runtime}>{runtime}</span> : null}
      </span>
    </button>
  );
}
