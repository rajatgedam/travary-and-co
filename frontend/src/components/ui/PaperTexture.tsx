import './PaperTexture.css';

/**
 * PaperTexture — three fixed overlay layers that create a "crushed paper"
 * aesthetic across the whole page:
 *
 * 1. Fine grain: SVG feTurbulence noise at full opacity, boosted with
 *    CSS filter contrast/brightness → stark black micro-dots (paper grain).
 *    mix-blend-mode: multiply means bright dots are invisible,
 *    dark dots darken the background — exactly like ink on paper.
 *
 * 2. Coarse crinkle: lower-frequency noise at large tile size → larger
 *    tonal shifts that look like paper folds and compression.
 *
 * 3. Vignette: radial gradient darkening the page edges with a warm
 *    brownish tone → aged, worn paper feel.
 */
export default function PaperTexture() {
  return (
    <>
      <div className="paper-grain" aria-hidden="true" />
      <div className="paper-crinkle" aria-hidden="true" />
      <div className="paper-vignette" aria-hidden="true" />
    </>
  );
}
