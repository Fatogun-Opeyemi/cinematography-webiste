import { discipline, site } from '../../config/site';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import ArrowLink from '../primitives/ArrowLink';
import MetaList from '../primitives/MetaList';
import Reveal from '../primitives/Reveal';
import SectionHead from '../primitives/SectionHead';
import styles from './ContactCta.module.css';

/**
 * The closing movement: one large statement, the address set at display scale,
 * then the practical details that a producer or a production company needs
 * before they send a brief.
 *
 * No form — a form with no backend is a broken promise. The email address is
 * the action, with copy-to-clipboard for convenience.
 */
export default function ContactCta({ id = 'contact', index = '05', showHead = true }) {
  const { copied, copy } = useCopyToClipboard();

  const details = [
    { label: 'Based in', value: `${site.location} · ${site.timezone}` },
    { label: 'Status', value: site.availability },
    ...site.representation.map((item) => ({ label: item.label, value: item.value })),
    { label: 'On request', value: `Full ${discipline.reelLabel.toLowerCase()}, credits and references` },
  ];

  return (
    <section
      className="section section--lg"
      id={id}
      /* Suppressing the head must also drop its label reference. */
      aria-labelledby={showHead ? `${id}-title` : undefined}
      aria-label={showHead ? undefined : site.contact.eyebrow}
    >
      <div className="shell">
        {showHead ? (
          <SectionHead
            id={`${id}-title`}
            index={index}
            eyebrow={site.contact.eyebrow}
            title={site.contact.lead}
            lede={site.contact.note}
          />
        ) : null}

        <div className={styles.grid}>
          <Reveal className={styles.address}>
            <a className={styles.email} href={`mailto:${site.email}`}>
              {site.email}
            </a>

            <div className={styles.actions}>
              <button type="button" className={styles.copy} onClick={() => copy(site.email)}>
                {copied ? 'Address copied' : 'Copy address'}
              </button>
              <a className={styles.phone} href={`tel:${site.phone.replace(/\s+/g, '')}`}>
                {site.phone}
              </a>
            </div>

            <p className={styles.note}>{site.contact.secondaryNote}</p>
          </Reveal>

          <Reveal className={styles.details} delay={100}>
            <MetaList items={details} />
          </Reveal>
        </div>

        <Reveal className={styles.socialRow} delay={160}>
          {site.socials.map((social) => (
            <ArrowLink key={social.label} href={social.href}>
              {social.label}
            </ArrowLink>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
