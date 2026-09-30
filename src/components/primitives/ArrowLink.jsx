import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from './Glyph';
import styles from './ArrowLink.module.css';

/**
 * The default call to action across the site.
 *
 * Deliberately a text link, never a large button: a label, a hairline wipe on
 * hover and a small arrow that steps forward a few pixels. Internal routes use
 * react-router; `href` renders an anchor.
 */
export default function ArrowLink({
  to,
  href,
  children,
  variant = 'inline',
  arrow = true,
  className = '',
  ...rest
}) {
  const external = Boolean(href && /^https?:/i.test(href));
  const classes = [styles.link, variant === 'block' ? styles.block : '', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          {external ? <ArrowUpRight /> : <ArrowRight />}
        </span>
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      {...rest}
    >
      {content}
    </a>
  );
}
