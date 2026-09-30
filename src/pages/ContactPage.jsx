import ContactCta from '../components/sections/ContactCta';
import PageIntro from '../components/sections/PageIntro';
import { discipline, site } from '../config/site';
import { useSeo } from '../hooks/useSeo';

/**
 * Contact — the same destination as the home page's closing block, with the
 * practical detail promoted into the page head so a producer can read
 * availability, location and representation without scrolling.
 *
 * There is no contact form: without a backend it would be a broken promise.
 */
export default function ContactPage() {
  useSeo({
    title: `Contact — ${site.name}`,
    description: `Contact ${site.name}, ${discipline.role.toLowerCase()} based in ${site.location}.`,
  });

  return (
    <>
      <PageIntro
        eyebrow={site.contact.eyebrow}
        index="01"
        title={site.contact.lead}
        lede={site.contact.note}
        meta={[
          { label: 'Based in', value: `${site.location} · ${site.timezone}` },
          { label: 'Status', value: site.availability },
          { label: 'Representation', value: site.representation.map((item) => item.value).join(' · ') },
          { label: 'Response', value: 'Within two working days' },
        ]}
      />

      <ContactCta id="details" index="02" showHead={false} />
    </>
  );
}
