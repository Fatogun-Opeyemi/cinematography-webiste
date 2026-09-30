import AboutSpread from '../components/sections/AboutSpread';
import Approach from '../components/sections/Approach';
import ContactCta from '../components/sections/ContactCta';
import Hero from '../components/sections/Hero';
import Recognition from '../components/sections/Recognition';
import SelectedWork from '../components/sections/SelectedWork';
import { site } from '../config/site';
import { useSeo } from '../hooks/useSeo';

/**
 * The home page as a sequence of movements rather than a stack of modules:
 *
 *   00  hero          one reel frame, the name, the craft metadata
 *   01  selected work the featured film, then the index
 *   02  approach      four numbered statements
 *   03  record        clients, festivals
 *   04  about         portrait and biography
 *   05  contact       the address, at display scale
 */
export default function HomePage() {
  useSeo({ title: site.title, description: site.seo.description });

  return (
    <>
      <Hero />
      <SelectedWork />
      <Approach index="02" />
      <Recognition
        id="record"
        index="03"
        eyebrow="Record"
        title="Clients & recognition"
        lede="Work produced for agencies, studios and broadcasters, and the festivals the films have travelled to."
      />
      <AboutSpread id="about" index="04" />
      <ContactCta id="contact" index="05" />
    </>
  );
}
