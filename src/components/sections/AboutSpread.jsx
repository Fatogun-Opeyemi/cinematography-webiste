import { site } from '../../config/site';
import { still } from '../../data/media';
import ArrowLink from '../primitives/ArrowLink';
import Eyebrow from '../primitives/Eyebrow';
import Frame from '../primitives/Frame';
import Reveal from '../primitives/Reveal';
import styles from './AboutSpread.module.css';

/**
 * The about spread — an editorial pairing of portrait and text.
 *
 * Used twice with the same data: in condensed form on the home page (lead plus
 * two paragraphs and a link onward) and in full on /about. Nothing is duplicated
 * in the content layer.
 */
export default function AboutSpread({
  id = 'about',
  index = '04',
  expanded = false,
  showLead = true,
  label = 'About',
}) {
  const { about } = site;
  const paragraphs = expanded ? about.paragraphs : about.paragraphs.slice(0, 2);

  return (
    <section
      className="section section--lg"
      id={id}
      /* The heading is optional, so never point at an id that was not rendered. */
      aria-labelledby={showLead ? `${id}-title` : undefined}
      aria-label={showLead ? undefined : label}
    >
      <div className={`shell ${styles.grid}`}>
        <Reveal className={styles.portrait} mode="fade">
          <Frame
            src={still(about.portrait, 'portrait')}
            alt={`${site.name}, ${site.location}`}
            ratio="portrait"
            caption={about.portraitCaption}
            contained
          />
        </Reveal>

        <div className={styles.text}>
          <Eyebrow index={index}>{about.eyebrow}</Eyebrow>

          {showLead ? (
            <Reveal as="h2" id={`${id}-title`} className={styles.lead} delay={60}>
              {about.lead}
            </Reveal>
          ) : null}

          <div className={styles.paragraphs}>
            {paragraphs.map((paragraph, position) => (
              <Reveal
                as="p"
                key={paragraph.slice(0, 32)}
                className={styles.body}
                delay={100 + position * 60}
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.stats} delay={220}>
            <dl className={styles.statList}>
              {about.stats.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <dt className={styles.statValue}>{stat.value}</dt>
                  <dd className={styles.statLabel}>{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {!expanded ? (
            <Reveal delay={260}>
              <ArrowLink to="/about">More about the work</ArrowLink>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
