import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GrainOverlay from './components/layout/GrainOverlay';
import RouteView from './components/layout/RouteView';
import ScrollProgress from './components/layout/ScrollProgress';
import SiteFooter from './components/layout/SiteFooter';
import SiteHeader from './components/layout/SiteHeader';
import SkipLink from './components/layout/SkipLink';
import FilmProvider from './context/FilmProvider';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectPage from './pages/ProjectPage';
import WorkPage from './pages/WorkPage';

/**
 * Application shell.
 *
 *   SkipLink       keyboard escape hatch into <main>
 *   FilmProvider   one film overlay shared by the hero, projects and the menu
 *   GrainOverlay   static film grain above everything
 *   ScrollProgress 1px accent hairline at the top edge
 *   SiteHeader / SiteFooter  fixed chrome and the closing plate
 *   RouteView      scroll reset and the fade between routes
 *
 * Routes are flat and shallow on purpose — a portfolio needs no nested layouts,
 * and every project deserves a shareable URL.
 */
export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />

      <FilmProvider>
        <GrainOverlay />
        <ScrollProgress />
        <SiteHeader />

        <main id="content" tabIndex={-1}>
          <RouteView>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<ProjectPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </RouteView>
        </main>

        <SiteFooter />
      </FilmProvider>
    </BrowserRouter>
  );
}
