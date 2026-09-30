import { discipline } from '../../config/site';
import { featuredProject, projectsByYear } from '../../data/projects';
import ArrowLink from '../primitives/ArrowLink';
import SectionHead from '../primitives/SectionHead';
import FeatureProject from '../work/FeatureProject';
import WorkIndex from '../work/WorkIndex';
import styles from './SelectedWork.module.css';

/** How many index rows follow the featured frame on the home page. */
const INDEX_LIMIT = 6;

export default function SelectedWork() {
  const indexProjects = projectsByYear
    .filter((project) => project.slug !== featuredProject.slug)
    .slice(0, INDEX_LIMIT);

  return (
    <section className="section section--lg" id="work" aria-labelledby="selected-work">
      <div className="shell">
        <SectionHead
          id="selected-work"
          index="01"
          eyebrow={discipline.indexEyebrow}
          title={discipline.workLabel}
          lede="A selection from the last four years. Every frame opens onto the full credits, the stills and the film itself."
          action={
            <ArrowLink to="/work">
              All {discipline.plural} ({projectsByYear.length})
            </ArrowLink>
          }
        />

        <FeatureProject project={featuredProject} />

        <div className={styles.index}>
          <p className={styles.indexLabel}>Further {discipline.plural}</p>
          <WorkIndex projects={indexProjects} />
        </div>
      </div>
    </section>
  );
}
