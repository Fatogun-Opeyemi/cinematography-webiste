import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RouteView.module.css';

/**
 * Wraps the routed page: resets scroll on navigation and fades the new view in.
 *
 * The `key` is what makes the transition work — changing it remounts the whole
 * subtree, so a project page always opens at the top of its own opening frame
 * rather than inheriting the previous page's scroll position or state.
 */
export default function RouteView({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return (
    <div key={pathname} className={styles.view}>
      {children}
    </div>
  );
}
