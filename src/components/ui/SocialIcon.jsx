/** Line icons for the social networks in siteInfo's SOCIAL list. */
const PATHS = {
  LinkedIn: "M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7M4 4h16v16H4z",
  Instagram: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm8 7.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M17 7v.01",
};

export function SocialIcon({ name, size = 16 }) {
  if (!PATHS[name]) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={PATHS[name]} />
    </svg>
  );
}
