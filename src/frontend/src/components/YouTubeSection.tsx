import { ExternalLink, Play } from "lucide-react";
import { useEffect, useRef } from "react";

const CHANNELS = [
  {
    id: 1,
    name: "Free Fire Esports",
    handle: "@FreefireEsports",
    url: "https://www.youtube.com/@FreefireEsports",
    desc: "Official competitive hub",
    subs: "2.1M subs",
    accent: "var(--neon-red)",
  },
  {
    id: 2,
    name: "Free Fire India",
    handle: "@FreefireIndia",
    url: "https://www.youtube.com/@FreefireIndia",
    desc: "India regional content",
    subs: "4.8M subs",
    accent: "var(--neon-orange)",
  },
  {
    id: 3,
    name: "Free Fire North America",
    handle: "@FreefireNA",
    url: "https://www.youtube.com/@FreefireNA",
    desc: "NA tournament coverage",
    subs: "680K subs",
    accent: "var(--neon-yellow)",
  },
  {
    id: 4,
    name: "Free Fire Battlegrounds",
    handle: "@freefire",
    url: "https://www.youtube.com/@freefire",
    desc: "Main official channel",
    subs: "31M subs",
    accent: "var(--neon-red)",
  },
];

export function YouTubeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.1 },
    );

    const els = sectionRef.current?.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right",
    );
    if (els) {
      for (const el of els) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="youtube"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.085 0 0)" }}
      data-ocid="youtube.section"
    >
      {/* Side decorations */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--neon-red), transparent)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-1"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--neon-orange), transparent)",
          opacity: 0.5,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block mb-3 px-4 py-1 text-xs font-gaming tracking-widest"
            style={{
              color: "var(--neon-red)",
              border: "1px solid rgba(255,32,32,0.3)",
              background: "rgba(255,32,32,0.05)",
            }}
          >
            ◆ WATCH LIVE
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{
              color: "white",
              textShadow: "0 0 30px rgba(255,32,32,0.3)",
            }}
          >
            YOUTUBE{" "}
            <span
              style={{
                color: "var(--neon-orange)",
                textShadow: "0 0 20px var(--neon-orange)",
              }}
            >
              CHANNELS
            </span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            Follow official Free Fire channels for live coverage, highlights,
            and exclusive content.
          </p>
        </div>

        {/* Channel grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHANNELS.map((ch, i) => (
            <a
              key={ch.id}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block rounded-sm p-6 transition-all duration-300 reveal reveal-delay-${i + 1}`}
              style={{
                background: "oklch(0.11 0 0)",
                border: "1px solid oklch(0.20 0 0)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = ch.accent;
                el.style.boxShadow = `0 0 20px ${ch.accent}40, 0 8px 20px rgba(0,0,0,0.4)`;
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "oklch(0.20 0 0)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
              data-ocid={`youtube.channel.link.${i + 1}`}
            >
              {/* YouTube icon */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center"
                  style={{
                    background: `${ch.accent}15`,
                    border: `1px solid ${ch.accent}40`,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7"
                    fill="currentColor"
                    style={{ color: ch.accent }}
                    aria-label="YouTube"
                    role="img"
                  >
                    <title>YouTube</title>
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <ExternalLink
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: ch.accent }}
                />
              </div>

              <h3
                className="font-gaming text-sm tracking-wide mb-1"
                style={{ color: "white" }}
              >
                {ch.name}
              </h3>
              <p className="text-xs mb-3" style={{ color: "oklch(0.55 0 0)" }}>
                {ch.desc}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-gaming"
                  style={{ color: ch.accent }}
                >
                  {ch.subs}
                </span>
                <div
                  className="flex items-center gap-1 px-2 py-1 text-xs font-gaming tracking-widest rounded-sm"
                  style={{
                    color: ch.accent,
                    border: `1px solid ${ch.accent}40`,
                    background: `${ch.accent}10`,
                  }}
                >
                  <Play className="w-3 h-3" />
                  WATCH
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
