/**
 * ChartNeural marks, drawn as plain SVG so they work in the page and in
 * generated images (share cards, app icon). Keep in sync with public/brand/*.svg.
 */

/** Candlesticks (Chart) joined by a line of nodes (Neural). Transparent background. */
export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <line x1="10.5" y1="34" x2="10.5" y2="58" stroke="#A8E10D" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="6" y="41" width="9" height="15" rx="1.2" fill="#A8E10D" />
      <line x1="23.5" y1="24" x2="23.5" y2="50" stroke="#A8E10D" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="19" y="31" width="9" height="15" rx="1.2" fill="#A8E10D" />
      <line x1="36.5" y1="30" x2="36.5" y2="48" stroke="#A8E10D" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="32" y="37" width="9" height="7" rx="1.2" fill="#A8E10D" />
      <line x1="49.5" y1="14" x2="49.5" y2="46" stroke="#A8E10D" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="45" y="21" width="9" height="17" rx="1.2" fill="#A8E10D" />
      <polyline points="10.5,33 23.5,22 36.5,29 49.5,9" stroke="#A8E10D" strokeWidth="2.4" strokeLinejoin="round" fill="none" />
      <circle cx="10.5" cy="33" r="3.6" fill="#A8E10D" />
      <circle cx="23.5" cy="22" r="3.6" fill="#A8E10D" />
      <circle cx="36.5" cy="29" r="3.6" fill="#41C4E1" />
      <circle cx="49.5" cy="9" r="3.6" fill="#A8E10D" />
    </svg>
  );
}

/** Simplified three-candle mark on a dark rounded square, for small icons. */
export function BrandIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#051A23" />
      <line x1="19" y1="29" x2="19" y2="52" stroke="#A8E10D" strokeWidth="3" strokeLinecap="round" />
      <line x1="32" y1="21" x2="32" y2="44" stroke="#A8E10D" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="13" x2="45" y2="36" stroke="#A8E10D" strokeWidth="3" strokeLinecap="round" />
      <rect x="14" y="33" width="10" height="14" rx="1.5" fill="#A8E10D" />
      <rect x="27" y="25" width="10" height="13" rx="1.5" fill="#A8E10D" />
      <rect x="40" y="16" width="10" height="15" rx="1.5" fill="#A8E10D" />
      <polyline points="19,27 32,19 45,11" stroke="#A8E10D" strokeWidth="2.6" strokeLinejoin="round" fill="none" />
      <polyline points="19,54 32,46 45,38" stroke="#41C4E1" strokeWidth="2.6" strokeLinejoin="round" fill="none" />
      <circle cx="19" cy="27" r="3.4" fill="#A8E10D" />
      <circle cx="32" cy="19" r="3.4" fill="#41C4E1" />
      <circle cx="45" cy="11" r="3.4" fill="#A8E10D" />
      <circle cx="19" cy="54" r="3.4" fill="#A8E10D" />
      <circle cx="45" cy="38" r="3.4" fill="#41C4E1" />
    </svg>
  );
}
