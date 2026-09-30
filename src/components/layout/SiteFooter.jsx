import { Link } from 'react-router-dom';
import { discipline, site } from '../../config/site';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { ArrowUpRight } from '../primitives/Glyph';
import styles from './SiteFooter.module.css';

/**
 * Closing plate: identity at display scale, then three short columns — nav,
 * external, contact. Hairlines only, no cards, nothing that reads as a
 * corporate footer.
 */
export default function SiteFooter() {
  const reducedMotion = usePrefersReducedMotion();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <Link to="/" className={styles.name}>
              {site.name}
            </Link>
            <p className={styles.role}>
              {discipline.role} — {site.location}
            </p>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <h2 className={styles.columnTitle}>Navigate</h2>
            <ul className={styles.list}>
              {site.nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Elsewhere</h2>
            <ul className={styles.list}>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer noopener">
                    {social.label}
                    <ArrowUpRight className={styles.external} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Contact</h2>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/\s+/g, '')}`}>{site.phone}</a>
              </li>
              <li className={styles.muted}>{site.timezone}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            © {year} {site.name}. All images and films © their respective productions.
          </p>
          <p className={styles.status}>{site.availability}</p>
          <button type="button" className={styles.toTop} onClick={scrollToTop}>
            Back to top
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
