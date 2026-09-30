import AboutSpread from '../components/sections/AboutSpread';
import Approach from '../components/sections/Approach';
import ContactCta from '../components/sections/ContactCta';
import PageIntro from '../components/sections/PageIntro';
import Recognition from '../components/sections/Recognition';
import { discipline, site } from '../config/site';
import { useSeo } from '../hooks/useSeo';

/**
 * The long version: biography, method, and the full record including kit.
 * Nothing here is written twice — the same `site.about` and `site.recognition`
 * data feeds the condensed home page spread.
 */
export default function AboutPage() {
  useSeo({
    title: `About — ${site.name}`,
    description: site.about.lead,
  });

  return (
    <>
      <PageIntro
        eyebrow={site.about.eyebrow}
        index="01"
        title={site.about.lead}
        meta={[
          { label: 'Role', value: discipline.role },
          { label: 'Based in', value: site.location },
          { label: 'Working across', value: 'Europe & UK' },
          { label: 'Status', value: site.availability },
        ]}
      />

      <AboutSpread id="biography" index="02" expanded showLead={false} />

      <Approach index="03" />

      <Recognition
        id="record"
        index="04"
        eyebrow="Record"
        title="Clients, festivals and kit"
        lede="The full list: who the work was made for, where it travelled, and what it was shot on."
        showClients
        showRecognition
        showKit
      />

      <ContactCta id="contact" index="05" />
    </>
  );
}
