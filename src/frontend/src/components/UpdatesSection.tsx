import { ArrowRight, Calendar } from "lucide-react";
import { useEffect, useRef } from "react";

const UPDATES = [
  {
    id: 1,
    tag: "REGISTRATION",
    tagColor: "var(--neon-green)",
    tagRaw: "80,220,120",
    title: "FFWS 2026 Qualifiers Open",
    date: "Feb 28, 2026",
    excerpt:
      "The Free Fire World Series 2026 qualifier registrations are now live. Teams from all regions can sign up through the official portal. Qualifying rounds begin March 10th with 2048 teams competing for 64 spots.",
    headerPattern:
      "radial-gradient(ellipse at 20% 80%, rgba(80,220,120,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,32,32,0.08) 0%, transparent 50%)",
    direction: "reveal-left",
  },
  {
    id: 2,
    tag: "PATCH NOTES",
    tagColor: "var(--neon-yellow)",
    tagRaw: "255,204,0",
    title: "New Season 5 Meta Changes",
    date: "Feb 25, 2026",
    excerpt:
      "Season 5 brings major weapon rebalancing — SMGs receive a 12% damage buff in close range, while bolt-action snipers see improved scope stability. New map zone 'Nuclear Fallout' added to ranked rotation.",
    headerPattern:
      "radial-gradient(ellipse at 80% 20%, rgba(255,204,0,0.18) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,102,0,0.06) 0%, transparent 50%)",
    direction: "reveal",
  },
  {
    id: 3,
    tag: "RESULTS",
    tagColor: "var(--neon-red)",
    tagRaw: "255,32,32",
    title: "Free Fire Pro League S3 Results",
    date: "Feb 20, 2026",
    excerpt:
      "Team Phoenix claimed the Season 3 championship with a dominant 5-2 record, taking home $30,000. Standout sniper 'Venom' earned MVP honors with a 4.2 K/D across 7 matches. Season 4 opens next week.",
    headerPattern:
      "radial-gradient(ellipse at 50% 80%, rgba(255,32,32,0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,102,0,0.08) 0%, transparent 50%)",
    direction: "reveal-right",
  },
];

// Decorative icon components for each article type
function RegistrationIcon({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="6"
        width="24"
        height="28"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <line
        x1="13"
        y1="14"
        x2="27"
        y2="14"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      <line
        x1="13"
        y1="19"
        x2="27"
        y2="19"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <line
        x1="13"
        y1="24"
        x2="21"
        y2="24"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.3"
      />
      <circle
        cx="31"
        cy="30"
        r="5"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M28.5 30l1.5 1.5 2.5-2.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PatchIcon({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points="20,4 34,12 34,28 20,36 6,28 6,12"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
        fill="none"
      />
      <path
        d="M14 20l4 4 8-8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.9"
      />
      <circle cx="20" cy="20" r="3" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

function TrophyIcon({ color }: { color: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14 8h12v10a6 6 0 01-12 0V8z"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <path
        d="M14 12H8a4 4 0 004 4"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <path
        d="M26 12h6a4 4 0 01-4 4"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      <line
        x1="20"
        y1="24"
        x2="20"
        y2="29"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <rect
        x="14"
        y="29"
        width="12"
        height="3"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.7"
      />
      <circle cx="20" cy="14" r="3" fill={color} fillOpacity="0.25" />
    </svg>
  );
}

const ARTICLE_ICONS = [RegistrationIcon, PatchIcon, TrophyIcon];

export function UpdatesSection() {
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
      id="updates"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.09 0 0)" }}
      data-ocid="updates.section"
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,204,0,0.4) 30%, rgba(255,102,0,0.6) 50%, rgba(255,204,0,0.4) 70%, transparent)",
        }}
      />

      {/* Background watermark number */}
      <div
        className="section-number left-8 font-display select-none"
        aria-hidden="true"
      >
        03
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 reveal">
          <div>
            <div
              className="inline-flex items-center gap-2 mb-4 px-5 py-1.5 text-xs font-gaming tracking-widest"
              style={{
                color: "var(--neon-yellow)",
                border: "1px solid rgba(255,204,0,0.35)",
                background: "rgba(255,204,0,0.05)",
              }}
            >
              <Calendar className="w-3.5 h-3.5" />
              LATEST NEWS
            </div>
            <h2
              className="font-display text-4xl sm:text-6xl"
              style={{ color: "white" }}
            >
              TOURNAMENT{" "}
              <span
                style={{
                  color: "var(--neon-yellow)",
                  textShadow:
                    "0 0 15px var(--neon-yellow), 0 0 40px rgba(255,204,0,0.35)",
                }}
              >
                UPDATES
              </span>
            </h2>
          </div>
          <div
            className="font-gaming text-xs tracking-widest"
            style={{ color: "oklch(0.38 0 0)" }}
          >
            3 LATEST STORIES
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPDATES.map((update, i) => {
            const ArticleIcon = ARTICLE_ICONS[i];
            return (
              <article
                key={update.id}
                className={`news-card rounded-sm overflow-hidden ${update.direction} reveal-delay-${i + 1}`}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${update.tagRaw}, 0.6)`;
                  el.style.boxShadow = `0 0 30px rgba(${update.tagRaw},0.2), 0 20px 40px rgba(0,0,0,0.5)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "";
                  el.style.boxShadow = "";
                }}
                data-ocid={`updates.item.${i + 1}`}
              >
                {/* Gradient image header */}
                <div
                  className="relative h-36 overflow-hidden flex items-center justify-between px-6"
                  style={{
                    background: update.headerPattern,
                    borderBottom: `1px solid rgba(${update.tagRaw}, 0.12)`,
                  }}
                >
                  {/* Grid pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(${update.tagRaw},1) 1px, transparent 1px), linear-gradient(90deg, rgba(${update.tagRaw},1) 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* SVG decorative icon */}
                  <div className="relative z-10 opacity-80">
                    <ArticleIcon color={update.tagColor} />
                  </div>

                  {/* Large ghost date */}
                  <div
                    className="relative z-10 text-right"
                    style={{ color: `rgba(${update.tagRaw}, 0.35)` }}
                  >
                    <div
                      className="font-display text-4xl leading-none"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {update.date.split(" ")[1]}
                    </div>
                    <div
                      className="font-gaming text-xs tracking-wider mt-1"
                      style={{ opacity: 0.7 }}
                    >
                      {update.date
                        .split(" ")
                        .slice(0, 1)
                        .join(" ")
                        .toUpperCase()}{" "}
                      2026
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Tag row */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-gaming text-xs tracking-widest px-2.5 py-1 rounded-sm"
                      style={{
                        color: update.tagColor,
                        border: `1px solid rgba(${update.tagRaw}, 0.4)`,
                        background: `rgba(${update.tagRaw}, 0.08)`,
                        textShadow: `0 0 8px rgba(${update.tagRaw},0.6)`,
                      }}
                    >
                      {update.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-lg mb-3 leading-tight"
                    style={{ color: "white", letterSpacing: "0.04em" }}
                  >
                    {update.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "oklch(0.52 0.01 30)" }}
                  >
                    {update.excerpt}
                  </p>

                  {/* Read more */}
                  <button
                    type="button"
                    className="flex items-center gap-2 text-xs font-gaming tracking-widest transition-all duration-200 group"
                    style={{ color: update.tagColor }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.textShadow = `0 0 10px rgba(${update.tagRaw},0.8)`;
                      const arrow = el.querySelector(
                        "svg",
                      ) as SVGElement | null;
                      if (arrow) arrow.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.textShadow = "none";
                      const arrow = el.querySelector(
                        "svg",
                      ) as SVGElement | null;
                      if (arrow) arrow.style.transform = "translateX(0)";
                    }}
                    data-ocid={`updates.read.button.${i + 1}`}
                  >
                    READ MORE{" "}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
