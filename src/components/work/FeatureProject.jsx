import { Link } from 'react-router-dom';
import { discipline } from '../../config/site';
import { useFilm } from '../../context/filmContext';
import ArrowLink from '../primitives/ArrowLink';
import Eyebrow from '../primitives/Eyebrow';
import Frame from '../primitives/Frame';
import PlayButton from '../primitives/PlayButton';
import Reveal from '../primitives/Reveal';
import styles from './FeatureProject.module.css';

/**
 * The one project promoted to a full-width frame on the home page.
 *
 * Reads as a title card: a 2.39:1 opening frame (looping silently if a clip is
 * available), the logline set large beneath it, then the specs as mono metadata
 * and two text actions. The still is a link to the project; the play control is
 * deliberately separate so the two destinations never conflict.
 */
export default function FeatureProject({ project }) {
  const { openFilm } = useFilm();

  const openFeatureFilm = () => {
    openFilm({
      src: project.video,
      poster: project.hero,
      title: project.title,
      meta: `${project.type} · ${project.year}`,
      footnote: discipline.short,
    });
  };

  return (
    <article className={styles.feature}>
      <Reveal mode="fade" className={styles.frameLink}>
        <Link to={`/work/${project.slug}`} aria-label={`${project.title} — view project`}>
          <Frame
            src={project.hero}
            alt={`${project.title} — opening frame`}
            ratio="cinema"
            videoSrc={project.video}
            zoom
            priority
            caption={project.location}
            credit={`${project.type} · ${project.year}`}
          />
        </Link>
      </Reveal>

      <div className={styles.info}>
        <Reveal className={styles.lead} delay={80}>
          <Eyebrow>{discipline.featuredLabel}</Eyebrow>
          <h3 className={styles.title}>
            <Link to={`/work/${project.slug}`}>{project.title}</Link>
          </h3>
          <p className={styles.logline}>{project.logline}</p>
        </Reveal>

        <Reveal className={styles.spec} delay={140}>
          <dl className={styles.specList}>
            {project.credits.director ? (
              <div className={styles.specRow}>
                <dt>Director</dt>
                <dd>{project.credits.director}</dd>
              </div>
            ) : null}
            <div className={styles.specRow}>
              <dt>Runtime</dt>
              <dd>{project.runtime}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <Reveal className={styles.actions} delay={180}>
        {project.video ? (
          <PlayButton
            label={`Play ${project.title}`}
            runtime={project.runtime}
            onClick={openFeatureFilm}
          />
        ) : null}
        <ArrowLink to={`/work/${project.slug}`}>View project</ArrowLink>
      </Reveal>
    </article>
  );
}
