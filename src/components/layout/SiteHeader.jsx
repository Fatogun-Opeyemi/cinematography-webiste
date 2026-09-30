import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { discipline, site } from '../../config/site';
import { useFilm } from '../../context/filmContext';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import useScroll from '../../hooks/useScroll';
import SiteMenu from './SiteMenu';
import styles from './SiteHeader.module.css';

/**
 * Fixed chrome with three behaviours, all restrained:
 *   · transparent over the hero, then a blurred near-black plate once scrolled
 *   · retracts while scrolling down, returns on any upward movement
 *   · below 900px the primary nav becomes a full-screen panel (see SiteMenu)
 *
 * The reel trigger opens the shared film overlay rather than navigating away.
 */
export default function SiteHeader() {
  const { atTop, direction } = useScroll();
  const { pathname } = useLocation();
  const { openFilm } = useFilm();

  /* The panel records which route it was opened on, so navigating closes it by
     derivation rather than by an effect — no stale open panel, no cascading
     render, and no way for the state and the location to disagree. */
  const [menu, setMenu] = useState({ open: false, onPath: pathname });
  const menuOpen = menu.open && menu.onPath === pathname;

  useLockBodyScroll(menuOpen);

  useEffect(() => {
    document.body.dataset.menuOpen = menuOpen ? 'true' : 'false';
    return () => {
      delete document.body.dataset.menuOpen;
    };
  }, [menuOpen]);

  const hidden = !menuOpen && !atTop && direction === 'down';

  const openReel = () => {
    openFilm({
      src: site.hero.reel.src,
      poster: site.hero.reel.poster,
      title: `${site.name} — ${discipline.reelLabel}`,
      meta: `${discipline.short} · ${site.hero.reel.runtime}`,
    });
  };

  return (
    <header
      className={styles.header}
      data-hidden={hidden || undefined}
      data-solid={!atTop || menuOpen || undefined}
      data-open={menuOpen || undefined}
    >
      <div className={`shell ${styles.bar}`}>
        <Link to="/" className={styles.identity}>
          <span className={styles.monogram} aria-hidden="true">
            {site.mark}
          </span>
          <span className={styles.identityText}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.craft}>{discipline.role}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {site.nav.map((item, index) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.navLinkActive : '']
                      .filter(Boolean)
                      .join(' ')
                  }
                >
                  <span className={styles.navIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <button type="button" className={styles.reel} onClick={openReel}>
            <span className={styles.reelDot} aria-hidden="true" />
            {discipline.reelLabel}
          </button>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenu({ open: !menuOpen, onPath: pathname })}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      <SiteMenu
        open={menuOpen}
        onClose={() => setMenu({ open: false, onPath: pathname })}
        onPlayReel={openReel}
      />
    </header>
  );
}
