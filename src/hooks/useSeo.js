import { useEffect } from 'react';

/**
 * Document head, set the minimal way: title and description swapped on route
 * change. Deliberately no head-management dependency for a five-route site —
 * if the project later needs Open Graph tags per project, this is the one file
 * that has to change.
 */
export function useSeo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}
