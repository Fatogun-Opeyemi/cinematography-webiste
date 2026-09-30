import { NavLink } from 'react-router-dom';
import { discipline, site } from '../../config/site';
import { Play } from '../primitives/Glyph';
import styles from './SiteMenu.module.css';

/**
 * Full-screen navigation for narrow viewports.
 *
 * Deliberately not a drawer: at this scale the menu is an editorial page —
 * large serif links, a reel trigger, then the contact details that would
 * otherwise sit in a footer the visitor has to scroll to find.
 *
 * Kept mounted (so it can transition) but taken out of the tab order and the
 * accessibility tree with `inert` while closed.
 */
export default function SiteMenu({ open, onClose, onPlayReel }) {
  return (
    <div
      id="site-menu"
      className={styles.menu}
      data-open={open || undefined}
      inert={open ? undefined : true}
      aria-hidden={open ? undefined : true}
    >
      <div className={`shell ${styles.inner}`}>
        <nav aria-label="Menu">
          <ul className={styles.list}>
            {site.nav.map((item, index) => (
              <li
                key={item.to}
                className={styles.item}
                style={{ '--item-delay': `${80 + index * 60}ms` }}
              >
                <NavLink to={item.to} className={styles.link} onClick={onClose}>
                  <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.label}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={styles.reelRow}
          style={{ '--item-delay': `${80 + site.nav.length * 60}ms` }}
        >
          <button
            type="button"
            className={styles.reel}
            onClick={() => {
              onClose();
              onPlayReel();
            }}
          >
            <span className={styles.reelGlyph} aria-hidden="true">
              <Play />
            </span>
            <span>{discipline.reelLabel}</span>
            <span className={styles.reelRuntime}>{site.hero.reel.runtime}</span>
          </button>
        </div>

        <div
          className={styles.foot}
          style={{ '--item-delay': `${160 + site.nav.length * 60}ms` }}
        >
          <a className={styles.email} href={`mailto:${site.email}`}>
            {site.email}
          </a>

          <ul className={styles.socials}>
            {site.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer noopener">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <p className={styles.location}>
            {site.location} — {site.availability}
          </p>
        </div>
      </div>
    </div>
  );
}
