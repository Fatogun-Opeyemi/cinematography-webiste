import { discipline, site } from '../../config/site';
import Reveal from '../primitives/Reveal';
import SectionHead from '../primitives/SectionHead';
import styles from './Recognition.module.css';

/**
 * Clients, festivals and kit — three data lists, hairline ruled, in the mono
 * voice. Deliberately no client logos: the names set as type read as a record
 * rather than as a badge wall.
 *
 * Labels come from the active discipline preset, so an editor sees "Cut For"
 * where a cinematographer sees "Clients & Collaborators".
 */
export default function Recognition({
  id = 'recognition',
  index = '03',
  eyebrow = 'Record',
  title = 'Clients & recognition',
  lede,
  showClients = true,
  showRecognition = true,
  showKit = false,
}) {
  const labels = discipline.metaLabels;
  const columns = [showClients, showRecognition, showKit].filter(Boolean).length;

  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="shell">
        <SectionHead id={`${id}-title`} index={index} eyebrow={eyebrow} title={title} lede={lede} />

        <div className={styles.grid} data-columns={columns}>
          {showClients ? (
            <Reveal className={styles.column}>
              <h3 className={styles.columnTitle}>{labels.clients}</h3>
              <ul className={styles.clients}>
                {site.clients.map((client) => (
                  <li key={client}>{client}</li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {showRecognition ? (
            <Reveal className={styles.column} delay={80}>
              <h3 className={styles.columnTitle}>{labels.recognition}</h3>
              <ul className={styles.record}>
                {site.recognition.map((entry) => (
                  <li className={styles.recordRow} key={`${entry.year}-${entry.title}`}>
                    <span className={styles.year}>{entry.year}</span>
                    <span className={styles.recordBody}>
                      <span className={styles.recordTitle}>{entry.title}</span>
                      <span className={styles.recordDetail}>{entry.detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {showKit ? (
            <Reveal className={styles.column} delay={160}>
              <h3 className={styles.columnTitle}>{labels.kit}</h3>
              <ul className={styles.kit}>
                {site.about.kit.map((group) => (
                  <li className={styles.kitGroup} key={group.label}>
                    <span className={styles.kitLabel}>{group.label}</span>
                    <span className={styles.kitItems}>{group.items.join(' · ')}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
