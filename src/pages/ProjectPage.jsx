import { Link, useParams } from 'react-router-dom';
import ArrowLink from '../components/primitives/ArrowLink';
import Eyebrow from '../components/primitives/Eyebrow';
import Frame from '../components/primitives/Frame';
import MetaList from '../components/primitives/MetaList';
import PlayButton from '../components/primitives/PlayButton';
import Reveal from '../components/primitives/Reveal';
import { creditLabel } from '../config/disciplines';
import { discipline, site } from '../config/site';
import { useFilm } from '../context/filmContext';
import { getProject, getProjectNeighbours } from '../data/projects';
import { useSeo } from '../hooks/useSeo';
import NotFoundPage from './NotFoundPage';
import styles from './ProjectPage.module.css';

/**
 * A project, laid out as a title card followed by a stills sequence.
 *
 * The credits table is assembled from the active discipline's `creditOrder`, so
 * the same records read correctly whether this site belongs to a
 * cinematographer (Director, Production, Camera, Optics) or a colourist
 * (Director, Finishing, Deliverables) — see config/disciplines.js.
 *
 * Still rhythm alternates full-bleed and inset so the sequence never settles
 * into a uniform grid.
 */
const GALLERY_RHYTHM = ['full', 'right', 'full', 'left'];

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const { openFilm } = useFilm();

  useSeo({
    title: project ? `${project.title} (${project.year}) — ${site.name}` : `Not found — ${site.name}`,
    description: project?.logline,
  });

  if (!project) {
    return (
      <NotFoundPage
        title="That film is not in the index"
        lede="The link may be old, or the project may have been renamed. The full index is one page away."
      />
    );
  }

  const { previous, next } = getProjectNeighbours(project.slug);
  const total = project.gallery.length;

  const credits = discipline.creditOrder
    .filter((key) => project.credits?.[key])
    .map((key) => ({ label: creditLabel(discipline, key), value: project.credits[key] }));

  const openProjectFilm = () => {
    openFilm({
      src: project.video,
      poster: project.hero,
      title: project.title,
      meta: `${project.type} · ${project.year}`,
      footnote: discipline.short,
    });
  };

  return (
    <article className={styles.project}>
      <div className={styles.opening}>
        <Reveal mode="fade">
          <Frame
            src={project.hero}
            alt={`${project.title} — opening frame`}
            ratio="cinema"
            videoSrc={project.video}
            priority
          />
        </Reveal>
      </div>

      <header className={`shell ${styles.head}`}>
        <Eyebrow index={String(project.year)}>{project.type}</Eyebrow>

        <Reveal as="h1" id="page-title" className={styles.title} delay={60}>
          {project.title}
        </Reveal>

        <Reveal as="p" className={styles.logline} delay={120}>
          {project.logline}
        </Reveal>

        {project.video ? (
          <Reveal className={styles.playRow} delay={180}>
            <PlayButton
              label={`Play ${project.title}`}
              runtime={project.runtime}
              size="lg"
              onClick={openProjectFilm}
            />
          </Reveal>
        ) : null}
      </header>

      <div className={`shell ${styles.body}`}>
        <div className={styles.synopsis}>
          <h2 className={styles.sectionLabel}>On shooting it</h2>
          {project.synopsis.map((paragraph, position) => (
            <Reveal
              as="p"
              key={paragraph.slice(0, 32)}
              className={styles.paragraph}
              delay={position * 60}
            >
              {paragraph}
            </Reveal>
          ))}
        </div>

        <div className={styles.side}>
          <h2 className={styles.sectionLabel}>Credits</h2>
          <MetaList items={credits} dense />

          {project.awards?.length ? (
            <div className={styles.awards}>
              <h2 className={styles.sectionLabel}>Recognition</h2>
              <ul className={styles.awardList}>
                {project.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.gallery}>
        {project.gallery.map((item, position) => {
          const rhythm = GALLERY_RHYTHM[position % GALLERY_RHYTHM.length];

          return (
            <Reveal key={item.src} className={styles[rhythm]} mode="fade">
              <Frame
                src={item.src}
                alt={`${project.title} — still ${position + 1}`}
                ratio={item.ratio}
                caption={item.caption}
                credit={`${String(position + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
              />
            </Reveal>
          );
        })}
      </div>

      <nav className={`shell ${styles.pager}`} aria-label="Project navigation">
        <ArrowLink to="/work">All {discipline.plural}</ArrowLink>

        <div className={styles.pagerPair}>
          {previous ? (
            <Link to={`/work/${previous.slug}`} className={styles.pagerLink}>
              <span className={styles.pagerDirection}>Previous</span>
              <span className={styles.pagerTitle}>{previous.title}</span>
              <span className={styles.pagerMeta}>
                {previous.type} · {previous.year}
              </span>
            </Link>
          ) : null}

          {next ? (
            <Link to={`/work/${next.slug}`} className={styles.pagerLink} data-align="end">
              <span className={styles.pagerDirection}>Next</span>
              <span className={styles.pagerTitle}>{next.title}</span>
              <span className={styles.pagerMeta}>
                {next.type} · {next.year}
              </span>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
