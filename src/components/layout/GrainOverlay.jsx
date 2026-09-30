import styles from './GrainOverlay.module.css';

/**
 * A single static film-grain plane over the whole document.
 *
 * Generated as SVG fractal noise in CSS rather than a bitmap, so it costs no
 * request and no render loop. Opacity is a token (`--grain-opacity`) and the
 * whole plane can be removed by rendering nothing.
 */
export default function GrainOverlay() {
  return <div className={styles.grain} aria-hidden="true" />;
}
