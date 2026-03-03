import { Calendar, Globe, Trophy, Users } from "lucide-react";
import { useEffect, useRef } from "react";

const EVENTS = [
  {
    id: 1,
    name: "Grand Showdown S5",
    date: "March 15–17, 2026",
    prize: "$25,000",
    region: "Global",
    slots: "512 Teams",
    status: "OPEN",
    statusColor: "var(--neon-green)",
    accent: "var(--neon-red)",
    accentRaw: "255,32,32",
    featured: true,
    category: "SQUAD",
  },
  {
    id: 2,
    name: "Clash of Champions",
    date: "April 5–7, 2026",
    prize: "$18,000",
    region: "Asia-Pacific",
    slots: "256 Teams",
    status: "OPEN",
    statusColor: "var(--neon-green)",
    accent: "var(--neon-orange)",
    accentRaw: "255,102,0",
    featured: false,
    category: "SQUAD",
  },
  {
    id: 3,
    name: "Solo Supremacy Cup",
    date: "April 22, 2026",
    prize: "$12,500",
    region: "South Asia",
    slots: "1024 Players",
    status: "SOON",
    statusColor: "var(--neon-yellow)",
    accent: "var(--neon-yellow)",
    accentRaw: "255,204,0",
    featured: false,
    category: "SOLO",
  },
  {
    id: 4,
    name: "Squad Massacre III",
    date: "May 10–12, 2026",
    prize: "$40,000",
    region: "Global",
    slots: "128 Squads",
    status: "SOON",
    statusColor: "var(--neon-yellow)",
    accent: "var(--neon-red)",
    accentRaw: "255,32,32",
    featured: true,
    category: "SQUAD",
  },
];

export function EventsSection() {
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
      id="events"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.085 0 0)" }}
      data-ocid="events.section"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--neon-red) 1px, transparent 1px), linear-gradient(90deg, var(--neon-red) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,32,32,0.5) 30%, rgba(255,102,0,0.7) 50%, rgba(255,32,32,0.5) 70%, transparent)",
        }}
      />

      {/* Subtle background number */}
      <div
        className="section-number right-8 font-display select-none"
        aria-hidden="true"
      >
        01
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center mb-16 reveal">
          <div
            className="inline-flex items-center gap-2 mb-4 px-5 py-1.5 text-xs font-gaming tracking-widest"
            style={{
              color: "var(--neon-orange)",
              border: "1px solid rgba(255,102,0,0.35)",
              background: "rgba(255,102,0,0.05)",
            }}
          >
            <Trophy className="w-3.5 h-3.5" />
            TOURNAMENTS
          </div>
          <h2
            className="font-display text-4xl sm:text-6xl"
            style={{ color: "white" }}
          >
            NEW{" "}
            <span
              style={{
                color: "var(--neon-red)",
                textShadow:
                  "0 0 15px var(--neon-red), 0 0 40px rgba(255,32,32,0.4)",
              }}
            >
              EVENTS
            </span>
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-sm"
            style={{ color: "oklch(0.52 0.01 30)", letterSpacing: "0.04em" }}
          >
            Compete in the most prestigious Free Fire tournaments. Register your
            squad and claim your glory.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EVENTS.map((event, i) => (
            <div
              key={event.id}
              className={`event-card rounded-sm flex flex-col reveal reveal-delay-${i + 1} ${event.featured ? "event-card-featured" : ""}`}
              data-ocid={`events.item.${i + 1}`}
            >
              {/* Card header — gradient art area */}
              <div
                className="relative h-28 overflow-hidden flex items-end p-4"
                style={{
                  background: `linear-gradient(135deg, rgba(${event.accentRaw},0.18) 0%, rgba(0,0,0,0.0) 60%), linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)`,
                  borderBottom: `1px solid rgba(${event.accentRaw}, 0.15)`,
                }}
              >
                {/* Background hex pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(rgba(${event.accentRaw},1) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Corner accent — diagonal triangle, top-right */}
                <div className="diagonal-accent">
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                      borderStyle: "solid",
                      borderWidth: "0 32px 32px 0",
                      borderColor: `transparent ${event.accent} transparent transparent`,
                      filter: `drop-shadow(0 0 6px ${event.accent})`,
                      opacity: 0.8,
                    }}
                  />
                </div>

                {/* Big prize amount as background text */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl opacity-[0.06] whitespace-nowrap select-none pointer-events-none"
                  style={{ color: event.accent }}
                >
                  {event.prize}
                </div>

                {/* Category badge */}
                <span
                  className="relative z-10 font-gaming text-xs tracking-widest px-2 py-0.5"
                  style={{
                    color: event.accent,
                    border: `1px solid rgba(${event.accentRaw},0.4)`,
                    background: "rgba(0,0,0,0.6)",
                  }}
                >
                  {event.category}
                </span>

                {/* Status badge - absolute top-left */}
                <span
                  className="absolute top-3 left-3 font-gaming text-xs tracking-widest px-2 py-0.5 z-10"
                  style={{
                    color: event.statusColor,
                    border: `1px solid ${event.statusColor}`,
                    background: "rgba(0,0,0,0.75)",
                    textShadow: `0 0 8px ${event.statusColor}`,
                    boxShadow: `0 0 10px ${event.statusColor}30`,
                  }}
                >
                  ● {event.status}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                {/* Title */}
                <h3
                  className="font-display text-base leading-tight"
                  style={{ color: "white" }}
                >
                  {event.name}
                </h3>

                {/* Details */}
                <div className="flex flex-col gap-1.5 flex-1">
                  {[
                    { Icon: Calendar, text: event.date },
                    { Icon: Globe, text: event.region },
                    { Icon: Users, text: event.slots },
                  ].map(({ Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-xs"
                      style={{ color: "oklch(0.55 0.01 30)" }}
                    >
                      <Icon
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: `rgba(${event.accentRaw}, 0.7)` }}
                      />
                      {text}
                    </div>
                  ))}
                </div>

                {/* Prize + CTA */}
                <div
                  className="pt-4 mt-2"
                  style={{
                    borderTop: `1px solid rgba(${event.accentRaw}, 0.12)`,
                  }}
                >
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div
                        className="text-xs font-gaming tracking-widest mb-0.5"
                        style={{ color: "oklch(0.40 0 0)" }}
                      >
                        PRIZE POOL
                      </div>
                      <div
                        className="font-display text-xl"
                        style={{
                          color: "var(--neon-yellow)",
                          textShadow:
                            "0 0 12px rgba(255,204,0,0.5), 0 0 30px rgba(255,204,0,0.2)",
                        }}
                      >
                        {event.prize}
                      </div>
                    </div>
                    <Trophy
                      className="w-5 h-5 mb-1"
                      style={{
                        color: event.accent,
                        filter: `drop-shadow(0 0 6px ${event.accent})`,
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 font-gaming text-xs tracking-widest rounded-sm transition-all duration-300"
                    style={{
                      border: `1px solid rgba(${event.accentRaw}, 0.5)`,
                      color: event.accent,
                      background: `rgba(${event.accentRaw}, 0.06)`,
                    }}
                    onMouseEnter={(e) => {
                      const btn = e.currentTarget;
                      btn.style.background = `rgba(${event.accentRaw}, 0.18)`;
                      btn.style.boxShadow = `0 0 20px rgba(${event.accentRaw},0.4), inset 0 0 10px rgba(${event.accentRaw},0.05)`;
                      btn.style.borderColor = event.accent;
                      btn.style.color = "white";
                      btn.style.textShadow = `0 0 8px ${event.accent}`;
                      btn.style.transform = "none";
                    }}
                    onMouseLeave={(e) => {
                      const btn = e.currentTarget;
                      btn.style.background = `rgba(${event.accentRaw}, 0.06)`;
                      btn.style.boxShadow = "none";
                      btn.style.borderColor = `rgba(${event.accentRaw}, 0.5)`;
                      btn.style.color = event.accent;
                      btn.style.textShadow = "none";
                      btn.style.transform = "none";
                    }}
                    onClick={() =>
                      document
                        .getElementById("register")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    data-ocid={`events.join.button.${i + 1}`}
                  >
                    JOIN NOW →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
