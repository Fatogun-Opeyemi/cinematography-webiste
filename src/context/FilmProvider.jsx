import { useCallback, useMemo, useState } from 'react';
import FilmPlayer from '../components/work/FilmPlayer';
import { FilmContext } from './filmContext';

/**
 * One film overlay for the whole site.
 *
 * The hero showreel, a featured frame, a project page and the mobile menu all
 * open the same player through `useFilm()` — one dialog, one source of truth,
 * no prop drilling.
 */
export default function FilmProvider({ children }) {
  const [film, setFilm] = useState(null);

  const openFilm = useCallback((next) => setFilm(next), []);
  const closeFilm = useCallback(() => setFilm(null), []);

  const value = useMemo(() => ({ film, openFilm, closeFilm }), [film, openFilm, closeFilm]);

  return (
    <FilmContext.Provider value={value}>
      {children}
      <FilmPlayer film={film} onClose={closeFilm} />
    </FilmContext.Provider>
  );
}
