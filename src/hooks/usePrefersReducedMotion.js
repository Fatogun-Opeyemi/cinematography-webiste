import useMediaQuery from './useMediaQuery';

/**
 * True when the visitor has asked the system to reduce motion.
 * Used to stop autoplaying video, freeze the timecode readout and disable
 * pointer-tracking previews — CSS alone cannot cover those.
 */
export default function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
