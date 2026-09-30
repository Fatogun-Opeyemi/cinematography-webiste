import styles from './MetaList.module.css';

/**
 * A hairline-ruled definition table in the mono voice: credits on a project
 * page, formats in the kit list, contact details. Never a card grid.
 *
 * items: [{ label, value }]
 */
export default function MetaList({ items, dense = false, className = '', ...rest }) {
  return (
    <dl
      className={[styles.list, dense ? styles.dense : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {items.map((item) => (
        <div className={styles.row} key={`${item.label}-${item.value}`}>
          <dt className={styles.term}>{item.label}</dt>
          <dd className={styles.value}>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
