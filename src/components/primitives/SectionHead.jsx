import Eyebrow from './Eyebrow';
import styles from './SectionHead.module.css';

/**
 * The recurring editorial section opening: hairline, mono eyebrow, display
 * heading on the left, supporting copy or an action on the right.
 *
 * Asymmetric on purpose — an even two-column split reads as a product page.
 */
export default function SectionHead({
  eyebrow,
  index,
  title,
  lede,
  action,
  id,
  className = '',
}) {
  return (
    <div className={`${styles.head} ${className}`}>
      <div className={styles.rule} aria-hidden="true" />

      <div className={styles.row}>
        <div className={styles.lead}>
          {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
          {title ? (
            <h2 id={id} className={styles.title}>
              {title}
            </h2>
          ) : null}
        </div>

        {lede || action ? (
          <div className={styles.support}>
            {lede ? <p className={styles.lede}>{lede}</p> : null}
            {action ? <div className={styles.action}>{action}</div> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
