/**
 * Render smoke test.
 *
 * Renders every route through Vite's SSR pipeline and React's server renderer,
 * then asserts the expected content is present. This catches the class of bug a
 * build cannot: a missing credit key, a broken prop, a component that throws on
 * first render, or a data reference that resolves to `undefined`.
 *
 *   npm run smoke
 *
 * No test framework, no browser — just the real components and the real data.
 */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const load = (path) => server.ssrLoadModule(path);

const [
  { default: FilmProvider },
  { default: SiteHeader },
  { default: SiteFooter },
] = await Promise.all([
  load('/src/context/FilmProvider.jsx'),
  load('/src/components/layout/SiteHeader.jsx'),
  load('/src/components/layout/SiteFooter.jsx'),
]);

const cases = [
  { page: '/src/pages/HomePage.jsx', entry: '/', expect: ['Elena Marchetti', 'Hollow Light', 'Play showreel'] },
  { page: '/src/pages/WorkPage.jsx', entry: '/work', expect: ['Selected Work', 'Saltline', 'Filter'] },
  {
    page: '/src/pages/ProjectPage.jsx',
    entry: '/work/hollow-light',
    path: '/work/:slug',
    expect: ['Hollow Light', 'Panavision C-Series', 'Credits', 'Previous', 'Next'],
  },
  { page: '/src/pages/AboutPage.jsx', entry: '/about', expect: ['ARRI Alexa 35', 'Navigate'] },
  { page: '/src/pages/ContactPage.jsx', entry: '/contact', expect: ['studio@elenamarchetti.com', 'Copy address'] },
  { page: '/src/pages/NotFoundPage.jsx', entry: '/nowhere', path: '*', expect: ['This frame does not exist'] },
];

let failures = 0;

for (const testCase of cases) {
  const { default: Page } = await load(testCase.page);

  const tree = h(
    MemoryRouter,
    { initialEntries: [testCase.entry] },
    h(
      FilmProvider,
      null,
      h(SiteHeader),
      h('main', { id: 'content' }, h(Routes, null, h(Route, { path: testCase.path ?? '/*', element: h(Page) }))),
      h(SiteFooter),
    ),
  );

  let html = '';

  try {
    html = renderToString(tree);
  } catch (error) {
    failures += 1;
    console.log(`✗ ${testCase.entry} — threw during render\n  ${error.message}`);
    continue;
  }

  const missing = testCase.expect.filter((text) => !html.includes(text));
  const leaksUndefined = html.includes('undefined');

  if (missing.length || leaksUndefined) {
    failures += 1;
    console.log(`✗ ${testCase.entry}`);
    if (missing.length) console.log(`  missing:  ${missing.join(', ')}`);
    if (leaksUndefined) console.log('  rendered "undefined" somewhere in the markup');
  } else {
    console.log(`✓ ${testCase.entry} — ${html.length} chars of markup`);
  }
}

await server.close();

if (failures) {
  console.log(`\n${failures} route(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${cases.length} routes rendered.`);
