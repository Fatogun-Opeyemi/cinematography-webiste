import { discipline } from '../../config/site';
import Reveal from '../primitives/Reveal';
import SectionHead from '../primitives/SectionHead';
import styles from './Approach.module.css';

/**
 * How the work is made — four numbered statements from the active discipline
 * preset (see config/disciplines.js).
 *
 * Ruled rows, never service cards: the number, a serif heading and a short
 * paragraph, which is all a producer or a director actually needs to read.
 */
export default function Approach({ index = '02' }) {
  return (
    <section className="section" aria-labelledby="approach">
      <div className="shell">
        <SectionHead
          id="approach"
          index={index}
          eyebrow="Approach"
          title={discipline.capabilitiesTitle}
          lede="Four things that decide how a job goes. The rest is scheduling."
        />

        <ol className={styles.list}>
          {discipline.capabilities.map((capability, position) => (
            <Reveal as="li" key={capability.title} className={styles.row} delay={position * 70}>
              <span className={styles.number}>{String(position + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>{capability.title}</h3>
              <p className={styles.body}>{capability.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
