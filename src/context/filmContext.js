import { createContext, useContext } from 'react';

/**
 * The film overlay's context, kept in a non-component module so the provider
 * file can stay a components-only export (React Fast Refresh requirement).
 */
export const FilmContext = createContext(null);

/**
 * Open the shared film overlay from anywhere:
 *
 *   const { openFilm } = useFilm();
 *   openFilm({ src, poster, title, meta, footnote });
 */
export function useFilm() {
  const context = useContext(FilmContext);
  if (!context) throw new Error('useFilm must be used inside <FilmProvider>');
  return context;
}
