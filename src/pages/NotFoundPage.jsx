import ArrowLink from '../components/primitives/ArrowLink';
import Eyebrow from '../components/primitives/Eyebrow';
import { site } from '../config/site';
import { useSeo } from '../hooks/useSeo';
import styles from './NotFoundPage.module.css';

/**
 * Not found — also reused by ProjectPage when a slug does not resolve, so the
 * dead end is always the same quiet page rather than a blank screen.
 */
export default function NotFoundPage({
  title = 'This frame does not exist',
  lede = 'The page may have been moved or the link mistyped. The work itself is one step away.',
}) {
  useSeo({ title: `Not found — ${site.name}` });

  return (
    <section className={`shell ${styles.notFound}`} aria-labelledby="page-title">
      <Eyebrow index="404">Error</Eyebrow>
      <h1 id="page-title" className={styles.title}>
        {title}
      </h1>
      <p className={styles.lede}>{lede}</p>

      <div className={styles.actions}>
        <ArrowLink to="/work">All work</ArrowLink>
        <ArrowLink to="/">Back to the reel</ArrowLink>
      </div>
    </section>
  );
}
