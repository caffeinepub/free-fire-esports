import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import type { RegisteredPlayer } from "../types";

interface Props {
  onSuccess: (player: RegisteredPlayer) => void;
}

type FormStep = "name" | "age" | "role" | "terms" | "done";

export function RegistrationSection({ onSuccess }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { actor } = useActor();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState<string>("");
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState<FormStep>("name");
  const [loading, setLoading] = useState(false);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
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

  const advanceStep = (current: FormStep) => {
    const order: FormStep[] = ["name", "age", "role", "terms", "done"];
    const idx = order.indexOf(current);
    if (idx < order.length - 1) {
      setStep(order[idx + 1]);
    }
  };

  const handleNameBlur = () => {
    if (name.trim().length >= 2) advanceStep("name");
  };

  const handleAgeBlur = () => {
    const n = Number.parseInt(age);
    if (!Number.isNaN(n) && n >= 10 && n <= 99) advanceStep("age");
  };

  const handleRoleChange = (val: string) => {
    setRole(val);
    if (val) {
      setTimeout(() => advanceStep("role"), 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!actor) {
      toast.error("Connection error. Please try again.");
      return;
    }

    if (!name.trim() || !age || !role || !agreed) {
      toast.error("Please complete all fields.");
      return;
    }

    const ageNum = Number.parseInt(age);
    if (Number.isNaN(ageNum) || ageNum < 10 || ageNum > 99) {
      toast.error("Please enter a valid age (10–99).");
      return;
    }

    const validRoles = ["rusher", "sniper", "support", "igl"];
    if (!validRoles.includes(role)) {
      toast.error("Please select a valid role.");
      return;
    }

    setLoading(true);
    try {
      await actor.registerPlayer(name.trim(), BigInt(ageNum), role);
      toast.success("Registration successful!");
      onSuccess({ name: name.trim(), age: ageNum, role });
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ROLES = [
    { value: "rusher", label: "Rusher", desc: "Front-line aggressor" },
    { value: "sniper", label: "Sniper", desc: "Long-range specialist" },
    { value: "support", label: "Support", desc: "Team utility & healer" },
    { value: "igl", label: "IGL", desc: "In-game leader & strategist" },
  ];

  const stepVisible = (s: FormStep): boolean => {
    const order: FormStep[] = ["name", "age", "role", "terms", "done"];
    return order.indexOf(step) >= order.indexOf(s);
  };

  return (
    <section
      id="register"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "oklch(0.085 0 0)" }}
      data-ocid="register.section"
    >
      {/* Decorative corner */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-10"
        style={{
          background:
            "radial-gradient(circle at top right, var(--neon-red), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-10"
        style={{
          background:
            "radial-gradient(circle at bottom left, var(--neon-orange), transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 reveal">
          <div
            className="inline-block mb-3 px-4 py-1 text-xs font-gaming tracking-widest"
            style={{
              color: "var(--neon-red)",
              border: "1px solid rgba(255,32,32,0.3)",
              background: "rgba(255,32,32,0.05)",
            }}
          >
            ◆ ENLIST NOW
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl"
            style={{
              color: "white",
              textShadow: "0 0 30px rgba(255,32,32,0.4)",
            }}
          >
            JOIN THE{" "}
            <span
              style={{
                color: "var(--neon-red)",
                textShadow:
                  "0 0 20px var(--neon-red), 0 0 40px rgba(255,32,32,0.3)",
              }}
            >
              BATTLE
            </span>
          </h2>
          <p className="mt-4" style={{ color: "oklch(0.55 0 0)" }}>
            Complete your profile to register for upcoming tournaments.
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-sm p-8 reveal"
          style={{
            background: "oklch(0.10 0 0)",
            border: "1px solid oklch(0.20 0 0)",
            boxShadow: "0 0 40px rgba(255,32,32,0.05)",
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1: Player Name */}
            <div className="mb-6">
              <label
                className="block font-gaming text-xs tracking-widest mb-2"
                style={{ color: "var(--neon-orange)" }}
                htmlFor="player-name"
              >
                01 / PLAYER NAME
              </label>
              <input
                id="player-name"
                type="text"
                className="neon-input w-full px-4 py-3 rounded-sm text-sm"
                placeholder="Enter your in-game name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleNameBlur}
                autoComplete="off"
                data-ocid="register.name.input"
              />
              {name.trim().length > 0 && name.trim().length < 2 && (
                <p
                  className="mt-1.5 text-xs"
                  style={{ color: "var(--neon-red)" }}
                >
                  Name must be at least 2 characters.
                </p>
              )}
            </div>

            {/* Step 2: Player Age */}
            {stepVisible("age") && (
              <div
                className="mb-6 animate-fade-in-up"
                style={{ animationDuration: "0.5s" }}
              >
                <label
                  className="block font-gaming text-xs tracking-widest mb-2"
                  style={{ color: "var(--neon-orange)" }}
                  htmlFor="player-age"
                >
                  02 / PLAYER AGE
                </label>
                <input
                  id="player-age"
                  type="number"
                  className="neon-input w-full px-4 py-3 rounded-sm text-sm"
                  placeholder="Your age (10–99)..."
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  onBlur={handleAgeBlur}
                  min={10}
                  max={99}
                  autoComplete="off"
                  data-ocid="register.age.input"
                />
              </div>
            )}

            {/* Step 3: Player Role */}
            {stepVisible("role") && (
              <div
                className="mb-6 animate-fade-in-up"
                style={{ animationDuration: "0.5s" }}
              >
                <label
                  className="block font-gaming text-xs tracking-widest mb-2"
                  style={{ color: "var(--neon-orange)" }}
                  htmlFor="player-role"
                >
                  03 / PLAYER ROLE
                </label>
                <div className="relative">
                  <select
                    id="player-role"
                    className="neon-input w-full px-4 py-3 rounded-sm text-sm appearance-none cursor-pointer"
                    value={role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    data-ocid="register.role.select"
                    style={{ paddingRight: "2.5rem" }}
                  >
                    <option value="" disabled>
                      Select your role...
                    </option>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label} — {r.desc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: "var(--neon-red)" }}
                  />
                </div>

                {/* Role badges */}
                {role && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ROLES.map((r) => (
                      <button
                        type="button"
                        key={r.value}
                        onClick={() => handleRoleChange(r.value)}
                        className="px-3 py-1.5 text-xs font-gaming tracking-wider rounded-sm transition-all duration-200"
                        style={
                          role === r.value
                            ? {
                                background: "rgba(255,32,32,0.2)",
                                border: "1px solid var(--neon-red)",
                                color: "var(--neon-red)",
                                textShadow: "0 0 6px var(--neon-red)",
                              }
                            : {
                                background: "oklch(0.13 0 0)",
                                border: "1px solid oklch(0.22 0 0)",
                                color: "oklch(0.55 0 0)",
                              }
                        }
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Terms */}
            {stepVisible("terms") && (
              <div
                className="mb-8 animate-fade-in-up"
                style={{ animationDuration: "0.5s" }}
              >
                <label
                  className="flex items-start gap-3 cursor-pointer group"
                  htmlFor="terms-checkbox"
                >
                  <div className="relative mt-0.5">
                    <input
                      id="terms-checkbox"
                      type="checkbox"
                      className="w-5 h-5 rounded-sm cursor-pointer appearance-none transition-all duration-200"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      data-ocid="register.terms.checkbox"
                      style={
                        agreed
                          ? {
                              background: "var(--neon-red)",
                              border: "1px solid var(--neon-red)",
                              boxShadow: "0 0 10px var(--neon-red)",
                            }
                          : {
                              background: "transparent",
                              border: "1px solid oklch(0.30 0 0)",
                            }
                      }
                    />
                    {agreed && (
                      <svg
                        viewBox="0 0 12 10"
                        className="w-3 h-2.5 absolute top-1 left-1 pointer-events-none"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 5l3.5 3.5L11 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.65 0 0)" }}
                  >
                    I agree to the{" "}
                    <span style={{ color: "var(--neon-orange)" }}>
                      Terms & Conditions
                    </span>{" "}
                    and confirm I meet the minimum age requirement to
                    participate in Free Fire Esports tournaments.
                  </span>
                </label>
              </div>
            )}

            {/* Submit button */}
            {stepVisible("terms") && (
              <button
                type="submit"
                className="neon-btn-primary w-full py-4 font-gaming text-sm tracking-widest rounded-sm flex items-center justify-center gap-3"
                disabled={!agreed || loading}
                data-ocid="register.submit_button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    REGISTERING...
                  </>
                ) : (
                  "⚔ REGISTER NOW"
                )}
              </button>
            )}

            {/* Progress indicator */}
            <div className="mt-6 flex items-center gap-2 justify-center">
              {(["name", "age", "role", "terms"] as FormStep[]).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={
                      stepVisible(s)
                        ? {
                            background: "var(--neon-red)",
                            boxShadow: "0 0 6px var(--neon-red)",
                          }
                        : { background: "oklch(0.25 0 0)" }
                    }
                  />
                  {i < 3 && (
                    <div
                      className="w-6 h-px transition-all duration-300"
                      style={
                        stepVisible(s)
                          ? { background: "var(--neon-red)", opacity: 0.5 }
                          : { background: "oklch(0.20 0 0)" }
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
