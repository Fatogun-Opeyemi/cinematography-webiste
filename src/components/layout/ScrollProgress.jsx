import useScroll from '../../hooks/useScroll';
import styles from './ScrollProgress.module.css';

/**
 * A 1px accent hairline across the top of the viewport, scaling with how far
 * down the page you are. The only always-moving element on the site — and it
 * is a single transform.
 */
export default function ScrollProgress() {
  const { progress } = useScroll();

  return (
    <div className={styles.track} aria-hidden="true">
      <div className={styles.bar} style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
