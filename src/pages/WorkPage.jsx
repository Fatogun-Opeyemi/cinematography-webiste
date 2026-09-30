import { useState } from 'react';
import ArrowLink from '../components/primitives/ArrowLink';
import ContactCta from '../components/sections/ContactCta';
import PageIntro from '../components/sections/PageIntro';
import WorkIndex from '../components/work/WorkIndex';
import { discipline, site } from '../config/site';
import { availableTypes, projectsByYear } from '../data/projects';
import { useSeo } from '../hooks/useSeo';
import styles from './WorkPage.module.css';

const ALL = 'All';

/**
 * The complete index.
 *
 * Filtering is text, not chips or pills: the categories sit on one hairline row
 * and the active one is marked with the accent rule. The list itself is
 * `WorkIndex`, so the home page and this page can never drift apart.
 */
export default function WorkPage() {
  const [type, setType] = useState(ALL);

  useSeo({
    title: `${discipline.workLabel} — ${site.name}`,
    description: `Selected ${discipline.plural} by ${site.name}, ${discipline.role.toLowerCase()}.`,
  });

  const visible =
    type === ALL ? projectsByYear : projectsByYear.filter((project) => project.type === type);

  const years = projectsByYear.map((project) => project.year);

  return (
    <>
      <PageIntro
        eyebrow={discipline.indexEyebrow}
        index="01"
        title={discipline.workLabel}
        lede={`A complete index, newest first. Every entry opens onto its credits, its stills and the film itself.`}
        action={<ArrowLink to="/contact">Request the full reel</ArrowLink>}
        meta={[
          { label: 'Titles', value: String(projectsByYear.length) },
          { label: 'Span', value: `${Math.min(...years)}–${Math.max(...years)}` },
          { label: 'Categories', value: availableTypes.join(' · ') },
          { label: 'Based in', value: site.location },
        ]}
      />

      <div className="shell">
        <div className={styles.filterRow}>
          <p className={styles.filterLabel}>Filter</p>

          <div className={styles.filters} role="group" aria-label="Filter work by category">
            {[ALL, ...availableTypes].map((item) => {
              const count =
                item === ALL
                  ? projectsByYear.length
                  : projectsByYear.filter((project) => project.type === item).length;

              return (
                <button
                  key={item}
                  type="button"
                  className={styles.filter}
                  aria-pressed={type === item}
                  onClick={() => setType(item)}
                >
                  {item}
                  <span className={styles.count}>{String(count).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>
        </div>

        <WorkIndex key={type} projects={visible} />

        {visible.length === 0 ? (
          <p className={styles.empty}>Nothing in this category yet.</p>
        ) : null}
      </div>

      <ContactCta id="contact" index="02" />
    </>
  );
}
