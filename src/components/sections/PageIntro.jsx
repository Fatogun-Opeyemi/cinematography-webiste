import SectionHead from '../primitives/SectionHead';
import styles from './PageIntro.module.css';

/**
 * Opening block for interior pages (/work, /about, /contact).
 *
 * Carries the fixed-header offset so a page never starts underneath the chrome,
 * then reuses SectionHead so interior pages read in the same voice as the home
 * page sections.
 */
export default function PageIntro({ eyebrow, index, title, lede, action, meta }) {
  return (
    <header className={`shell ${styles.intro}`}>
      <SectionHead
        id="page-title"
        eyebrow={eyebrow}
        index={index}
        title={title}
        lede={lede}
        action={action}
      />

      {meta?.length ? (
        <dl className={styles.meta}>
          {meta.map((item) => (
            <div className={styles.metaItem} key={item.label}>
              <dt className={styles.metaLabel}>{item.label}</dt>
              <dd className={styles.metaValue}>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}
