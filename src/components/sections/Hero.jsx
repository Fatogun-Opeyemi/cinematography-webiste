import { discipline, site } from '../../config/site';
import { useFilm } from '../../context/filmContext';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import useTimecode from '../../hooks/useTimecode';
import PlayButton from '../primitives/PlayButton';
import Reveal from '../primitives/Reveal';
import styles from './Hero.module.css';

/**
 * The opening frame.
 *
 * Not a headline-and-buttons hero: one full-height reel frame, the name set as
 * large as it will safely set, a single line of positioning, and a base strip of
 * craft metadata in the mono voice — the way a credit block is set.
 *
 * Reduced-motion visitors get the still instead of the loop, and the timecode
 * readout freezes rather than ticking.
 */
export default function Hero() {
  const { openFilm } = useFilm();
  const reducedMotion = usePrefersReducedMotion();
  const timecodeRef = useTimecode(!reducedMotion);

  const openReel = () => {
    openFilm({
      src: site.hero.reel.src,
      poster: site.hero.reel.poster,
      title: `${site.name} — ${discipline.reelLabel}`,
      meta: `${discipline.short} · ${site.hero.reel.runtime}`,
    });
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        {reducedMotion ? (
          <img className={styles.video} src={site.hero.reel.poster} alt="" />
        ) : (
          <video
            className={styles.video}
            src={site.hero.reel.src}
            poster={site.hero.reel.poster}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={`shell ${styles.inner}`}>
        <div className={styles.head}>
          <Reveal as="p" className={styles.eyebrow} delay={80}>
            {site.hero.eyebrow}
          </Reveal>

          <Reveal as="h1" id="hero-title" className={styles.name} delay={140}>
            <span className="reveal-curtain">
              <span>{site.name}</span>
            </span>
          </Reveal>

          <Reveal as="p" className={styles.statement} delay={260}>
            {site.hero.statement}
          </Reveal>
        </div>

        <Reveal className={styles.actions} delay={340}>
          <PlayButton
            label={site.hero.reel.label}
            runtime={site.hero.reel.runtime}
            size="lg"
            onClick={openReel}
          />
        </Reveal>

        <Reveal className={styles.base} delay={420} mode="fade">
          <dl className={styles.metaList}>
            {site.hero.meta.map((item) => (
              <div className={styles.metaRow} key={item.label}>
                <dt className={styles.metaLabel}>{item.label}</dt>
                <dd className={styles.metaValue}>{item.value}</dd>
              </div>
            ))}
          </dl>

          <p className={styles.timecode}>
            <span className={styles.tcLabel}>TC</span>
            <span ref={timecodeRef} className={styles.tcValue}>
              00:00:00:00
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
