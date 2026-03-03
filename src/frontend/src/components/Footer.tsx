import { Flame, Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="relative py-12 overflow-hidden"
      style={{
        background: "oklch(0.06 0 0)",
        borderTop: "1px solid oklch(0.14 0 0)",
      }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--neon-red) 25%, var(--neon-orange) 50%, var(--neon-yellow) 75%, transparent)",
          opacity: 0.4,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Flame
              className="w-6 h-6"
              style={{
                color: "var(--neon-orange)",
                filter: "drop-shadow(0 0 6px var(--neon-orange))",
              }}
            />
            <span
              className="font-display text-sm tracking-widest"
              style={{
                color: "var(--neon-red)",
                textShadow: "0 0 10px var(--neon-red)",
              }}
            >
              FREE FIRE ESPORTS
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Home", href: "#home" },
              { label: "Events", href: "#events" },
              { label: "YouTube", href: "#youtube" },
              { label: "Updates", href: "#updates" },
              { label: "Register", href: "#register" },
            ].map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() =>
                  document
                    .querySelector(link.href)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-gaming text-xs tracking-widest transition-all duration-200"
                style={{ color: "oklch(0.45 0 0)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--neon-orange)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.45 0 0)";
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Attribution */}
          <div className="text-xs" style={{ color: "oklch(0.40 0 0)" }}>
            <span>© {year}. Built with </span>
            <Heart
              className="inline-block w-3 h-3 mx-0.5"
              style={{ color: "var(--neon-red)", fill: "var(--neon-red)" }}
            />
            <span> using </span>
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "var(--neon-orange)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textShadow =
                  "0 0 6px var(--neon-orange)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.textShadow =
                  "none";
              }}
            >
              caffeine.ai
            </a>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-10 text-center">
          <p
            className="font-gaming text-xs tracking-widest"
            style={{ color: "oklch(0.25 0 0)" }}
          >
            ◆ BATTLE FOR GLORY ◆ COMPETE AT THE HIGHEST LEVEL ◆ SEASON 5 ◆
          </p>
        </div>
      </div>
    </footer>
  );
}
