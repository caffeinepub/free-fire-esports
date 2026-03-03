import { Award, Calendar, Shield, Target, User } from "lucide-react";
import { useEffect, useRef } from "react";
import type { RegisteredPlayer } from "../types";

interface Props {
  player: RegisteredPlayer | null;
}

const ROLE_CONFIG: Record<
  string,
  { color: string; label: string; icon: string; desc: string }
> = {
  rusher: {
    color: "var(--neon-red)",
    label: "RUSHER",
    icon: "🔥",
    desc: "Front-Line Aggressor",
  },
  sniper: {
    color: "var(--neon-yellow)",
    label: "SNIPER",
    icon: "🎯",
    desc: "Long-Range Specialist",
  },
  support: {
    color: "var(--neon-green)",
    label: "SUPPORT",
    icon: "🛡️",
    desc: "Team Utility & Healer",
  },
  igl: {
    color: "var(--neon-purple)",
    label: "IGL",
    icon: "♟️",
    desc: "In-Game Leader",
  },
};

export function ProfileSection({ player }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        }
      },
      { threshold: 0.1 },
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (els) {
      for (const el of els) {
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, []);

  const roleInfo = player
    ? ROLE_CONFIG[player.role] || ROLE_CONFIG.rusher
    : null;

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "oklch(0.09 0 0)" }}
      data-ocid="profile.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 reveal">
          <div
            className="inline-block mb-3 px-4 py-1 text-xs font-gaming tracking-widest"
            style={{
              color: "var(--neon-purple, oklch(0.60 0.22 300))",
              border: "1px solid rgba(160,50,220,0.3)",
              background: "rgba(160,50,220,0.05)",
            }}
          >
            ◆ PLAYER CARD
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{
              color: "white",
              textShadow: "0 0 30px rgba(255,32,32,0.3)",
            }}
          >
            YOUR{" "}
            <span
              style={{
                color: "var(--neon-orange)",
                textShadow: "0 0 20px var(--neon-orange)",
              }}
            >
              PROFILE
            </span>
          </h2>
        </div>

        {!player ? (
          /* Empty state */
          <div
            className="max-w-md mx-auto text-center py-16 px-8 rounded-sm reveal"
            style={{
              background: "oklch(0.10 0 0)",
              border: "1px dashed oklch(0.22 0 0)",
            }}
            data-ocid="profile.empty_state"
          >
            <Shield
              className="w-16 h-16 mx-auto mb-6"
              style={{ color: "oklch(0.30 0 0)" }}
            />
            <h3
              className="font-display text-2xl mb-3"
              style={{ color: "oklch(0.55 0 0)" }}
            >
              NO PLAYER REGISTERED
            </h3>
            <p className="text-sm mb-8" style={{ color: "oklch(0.40 0 0)" }}>
              Complete the registration form above to see your profile card
              here.
            </p>
            <button
              type="button"
              className="neon-btn px-8 py-3 font-gaming text-xs tracking-widest rounded-sm"
              onClick={() =>
                document
                  .getElementById("register")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="profile.register.button"
            >
              REGISTER NOW →
            </button>
          </div>
        ) : (
          /* Profile card */
          <div className="max-w-xl mx-auto">
            <div
              className="profile-reveal rounded-sm overflow-hidden"
              style={{
                background: "oklch(0.10 0 0)",
                border: `1px solid ${roleInfo!.color}`,
                boxShadow: `0 0 30px ${roleInfo!.color}30, 0 0 60px ${roleInfo!.color}10`,
              }}
              data-ocid="profile.card"
            >
              {/* Header stripe */}
              <div
                className="h-1.5"
                style={{
                  background: `linear-gradient(90deg, ${roleInfo!.color}, var(--neon-orange))`,
                  boxShadow: `0 0 15px ${roleInfo!.color}80`,
                }}
              />

              <div className="p-8">
                {/* Top row */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    {/* Registration badge */}
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-sm font-gaming text-xs tracking-widest"
                      style={{
                        background: `${roleInfo!.color}15`,
                        border: `1px solid ${roleInfo!.color}50`,
                        color: roleInfo!.color,
                        textShadow: `0 0 6px ${roleInfo!.color}`,
                      }}
                    >
                      <Award className="w-3.5 h-3.5" />
                      REGISTERED PLAYER
                    </div>
                    <h3
                      className="font-display text-3xl sm:text-4xl"
                      style={{
                        color: "white",
                        textShadow: `0 0 20px ${roleInfo!.color}60`,
                        lineHeight: 1,
                      }}
                    >
                      {player.name}
                    </h3>
                  </div>

                  {/* Role icon */}
                  <div
                    className="w-16 h-16 rounded-sm flex items-center justify-center text-3xl"
                    style={{
                      background: `${roleInfo!.color}10`,
                      border: `1px solid ${roleInfo!.color}40`,
                      boxShadow: `0 0 20px ${roleInfo!.color}20`,
                    }}
                  >
                    {roleInfo!.icon}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div
                    className="rounded-sm p-4 text-center"
                    style={{
                      background: "oklch(0.13 0 0)",
                      border: "1px solid oklch(0.18 0 0)",
                    }}
                  >
                    <Calendar
                      className="w-4 h-4 mx-auto mb-2"
                      style={{ color: "var(--neon-orange)" }}
                    />
                    <div
                      className="font-display text-2xl"
                      style={{
                        color: "var(--neon-yellow)",
                        textShadow: "0 0 8px var(--neon-yellow)",
                      }}
                    >
                      {player.age}
                    </div>
                    <div
                      className="text-xs font-gaming tracking-widest mt-1"
                      style={{ color: "oklch(0.45 0 0)" }}
                    >
                      AGE
                    </div>
                  </div>

                  <div
                    className="rounded-sm p-4 text-center"
                    style={{
                      background: "oklch(0.13 0 0)",
                      border: "1px solid oklch(0.18 0 0)",
                    }}
                  >
                    <Target
                      className="w-4 h-4 mx-auto mb-2"
                      style={{ color: roleInfo!.color }}
                    />
                    <div
                      className="font-gaming text-sm tracking-wide"
                      style={{
                        color: roleInfo!.color,
                        textShadow: `0 0 8px ${roleInfo!.color}`,
                      }}
                    >
                      {roleInfo!.label}
                    </div>
                    <div
                      className="text-xs font-gaming tracking-widest mt-1"
                      style={{ color: "oklch(0.45 0 0)" }}
                    >
                      ROLE
                    </div>
                  </div>

                  <div
                    className="rounded-sm p-4 text-center"
                    style={{
                      background: "oklch(0.13 0 0)",
                      border: "1px solid oklch(0.18 0 0)",
                    }}
                  >
                    <User
                      className="w-4 h-4 mx-auto mb-2"
                      style={{ color: "var(--neon-red)" }}
                    />
                    <div
                      className="font-display text-lg"
                      style={{
                        color: "var(--neon-red)",
                        textShadow: "0 0 8px var(--neon-red)",
                      }}
                    >
                      S5
                    </div>
                    <div
                      className="text-xs font-gaming tracking-widest mt-1"
                      style={{ color: "oklch(0.45 0 0)" }}
                    >
                      SEASON
                    </div>
                  </div>
                </div>

                {/* Role description */}
                <div
                  className="flex items-center gap-3 p-4 rounded-sm"
                  style={{
                    background: `${roleInfo!.color}08`,
                    border: `1px solid ${roleInfo!.color}25`,
                  }}
                >
                  <span className="text-2xl">{roleInfo!.icon}</span>
                  <div>
                    <div
                      className="font-gaming text-sm tracking-widest"
                      style={{ color: roleInfo!.color }}
                    >
                      {roleInfo!.label}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "oklch(0.55 0 0)" }}
                    >
                      {roleInfo!.desc}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        background: "var(--neon-green)",
                        boxShadow: "0 0 8px var(--neon-green)",
                      }}
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className="neon-btn-primary flex-1 py-3 font-gaming text-xs tracking-widest rounded-sm"
                    onClick={() =>
                      document
                        .getElementById("events")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    data-ocid="profile.events.primary_button"
                  >
                    ⚔ JOIN TOURNAMENT
                  </button>
                  <button
                    type="button"
                    className="neon-btn flex-1 py-3 font-gaming text-xs tracking-widest rounded-sm"
                    onClick={() =>
                      document
                        .getElementById("youtube")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    data-ocid="profile.youtube.secondary_button"
                  >
                    ▶ WATCH STREAMS
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
