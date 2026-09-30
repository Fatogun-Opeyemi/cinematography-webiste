import styles from './Eyebrow.module.css';

/**
 * The small mono label that opens every section. A hairline rule, an optional
 * index, then the label — the site's alternative to a decorative icon.
 */
export default function Eyebrow({ children, index, className = '' }) {
  return (
    <p className={`${styles.eyebrow} ${className}`}>
      {index ? <span className={styles.index}>{index}</span> : null}
      <span className={styles.label}>{children}</span>
    </p>
  );
}
