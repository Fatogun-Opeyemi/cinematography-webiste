/**
 * The site's entire icon set — four hairline strokes, drawn inline so they
 * inherit colour and match the 1px rules used everywhere else.
 * No icon library, no filled shapes, nothing decorative.
 */

export function ArrowRight({ size = 13, strokeWidth = 1, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M1 7h11.4M8.6 3.2 12.4 7l-3.8 3.8" />
    </svg>
  );
}

export function ArrowUpRight({ size = 13, strokeWidth = 1, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M3.5 10.5 10.5 3.5M4.6 3.5h5.9v5.9" />
    </svg>
  );
}

export function Play({ size = 11, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M2 1.2 10.6 6 2 10.8z" />
    </svg>
  );
}

export function Close({ size = 14, strokeWidth = 1, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d="M1.5 1.5 12.5 12.5M12.5 1.5 1.5 12.5" />
    </svg>
  );
}
