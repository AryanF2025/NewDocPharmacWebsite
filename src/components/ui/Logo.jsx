/**
 * The logo mark: a stylised cross whose intertwining lines form an infinity
 * symbol. Drawn from the brand SVG, never recoloured, tilted, outlined, boxed
 * or gradiented — the two paths keep their exact brand fills.
 *
 * `tone="mono"` is the one-colour variant the guide allows for dense
 * backgrounds; it paints both paths in `currentColor`.
 */
export function LogoMark({ className = "h-8 w-8", tone = "colour" }) {
  const green = tone === "mono" ? "currentColor" : "#A1E666";
  const blue = tone === "mono" ? "currentColor" : "#0291D7";

  return (
    <svg
      viewBox="0 0 48 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="DocPharma"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36.1311 17.1057C39.7095 17.1057 40.9131 18.7629 40.8946 20.3785C40.8436 23.8736 37.6402 23.8366 35.1358 22.8876C32.8722 22.0265 30.1039 20.3924 27.0949 18.6611C23.6091 16.6613 18.2115 13.4903 13.0823 12.2265C8.3698 11.0646 3.67116 11.4766 1.25472 16.1752C-0.504378 19.6008 -0.286805 23.9615 1.12047 27.0492C0.791799 21.6747 2.05094 16.8789 5.23583 15.0226C8.43461 13.1662 11.564 14.018 14.7257 15.4623C20.9612 18.3047 31.7797 27.0492 37.1171 27.0492C46.5653 27.3455 47.0884 13.1246 36.1311 13.1246H32.7888V9.77767C32.7888 4.94015 28.8355 0.986816 24.0072 0.986816C19.179 0.986816 15.221 4.94015 15.221 9.77767V11.6293C16.5681 12.0599 17.8967 12.583 19.2114 13.1709V9.77767C19.2114 7.14828 21.3779 4.97719 24.0119 4.97719C26.6459 4.97719 28.8077 7.14365 28.8077 9.77767V17.115H36.1404L36.1311 17.1057Z"
        fill={green}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8687 27.0999C8.29035 27.0999 7.08676 25.4427 7.10527 23.8271C7.15619 20.3321 10.3596 20.3691 12.864 21.3181C15.1277 22.1791 17.8959 23.8132 20.9049 25.5445C24.3907 27.5443 29.7884 30.7153 34.9175 31.9791C39.63 33.141 44.3287 32.729 46.7451 28.0304C48.5042 24.6048 48.2867 20.2441 46.8794 17.1564C47.208 22.5309 45.9489 27.3268 42.764 29.1831C39.5652 31.0394 36.4359 30.1876 33.2741 28.7433C27.0386 25.901 16.2202 17.1564 10.8827 17.1564C1.4345 16.8602 0.911401 31.0811 11.8687 31.0811H15.211V34.428C15.211 39.2655 19.1643 43.2188 23.9926 43.2188C28.8209 43.2188 32.7788 39.2655 32.7788 34.428V32.5763C31.4317 32.1458 30.1031 31.6227 28.7885 31.0348V34.428C28.7885 37.0574 26.622 39.2284 23.988 39.2284C21.354 39.2284 19.1921 37.062 19.1921 34.428V27.0907H11.8595L11.8687 27.0999Z"
        fill={blue}
      />
    </svg>
  );
}

/**
 * Horizontal lockup: mark + wordmark. The wordmark is set in the brand's two
 * colours rather than loaded as a bitmap, so it stays crisp at any size and
 * inverts cleanly on the black panels.
 */
export function Logo({ className = "", tone = "colour", markClass = "h-9 w-9" }) {
  const isMono = tone === "mono";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClass} tone={tone} />
      <span
        className="text-[1.35rem] font-bold leading-none tracking-[-0.02em]"
        style={{ color: isMono ? "currentColor" : "#0291D7" }}
      >
        Doc
        <span style={{ color: isMono ? "currentColor" : "#94C11F" }}>Pharma</span>
      </span>
    </span>
  );
}
