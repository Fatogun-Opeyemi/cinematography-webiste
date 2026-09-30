/** Keyboard-only escape hatch into the page body. Styled globally. */
export default function SkipLink() {
  return (
    <a className="skip-link" href="#content">
      Skip to content
    </a>
  );
}
