import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COLORS = [
      "rgba(255, 32, 32, ",
      "rgba(255, 102, 0, ",
      "rgba(255, 204, 0, ",
      "rgba(255, 160, 50, ",
    ];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      alpha: number;
      alphaSpeed: number;
    }

    const particles: Particle[] = [];

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: height + Math.random() * 50,
      size: Math.random() * 3 + 0.8,
      speedY: -(Math.random() * 1.2 + 0.4),
      speedX: (Math.random() - 0.5) * 0.6,
      color:
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      alpha: 0,
      alphaSpeed: Math.random() * 0.006 + 0.002,
    });

    for (let i = 0; i < 100; i++) {
      const p = createParticle();
      p.y = Math.random() * height;
      p.alpha = Math.random() * 0.7;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.alphaSpeed;

        if (p.alpha > 0.85) p.alphaSpeed = -Math.abs(p.alphaSpeed);

        if (p.y < -10 || p.alpha <= 0) {
          particles[i] = createParticle();
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.alpha)})`;
        ctx.fill();

        // Glow halo
        if (p.size > 1.5) {
          const grd = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 3.5,
          );
          grd.addColorStop(0, `${p.color}${Math.max(0, p.alpha * 0.5)})`);
          grd.addColorStop(1, `${p.color}0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }
      }

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Background image — new dramatic arena */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-bg-v2.dim_1920x1080.jpg')",
        }}
      />

      {/* Multi-layer cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(4,1,1,0.5) 40%, rgba(2,0,0,0.62) 70%, rgba(8,4,4,0.92) 100%)",
        }}
      />

      {/* Radial vignette for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Bottom-up red atmospheric glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(120,8,8,0.25) 0%, transparent 100%)",
        }}
      />

      {/* Scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
          zIndex: 2,
        }}
      />

      {/* Animated scan beam */}
      <div className="scan-beam" style={{ zIndex: 3 }} />

      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        {/* Season badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-5 py-2 text-xs font-gaming tracking-widest animate-fade-in"
          style={{
            color: "var(--neon-orange)",
            border: "1px solid rgba(255,102,0,0.4)",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            boxShadow:
              "0 0 20px rgba(255,102,0,0.15), inset 0 0 20px rgba(255,102,0,0.03)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--neon-orange)",
              boxShadow: "0 0 8px var(--neon-orange)",
              display: "inline-block",
              animation: "pulse-glow 1.5s ease-in-out infinite",
            }}
          />
          SEASON 5 · REGISTRATION OPEN
        </div>

        {/* Main title — dramatic 3-tier layout */}
        <div className="relative inline-block w-full animate-fade-in-up animation-delay-200">
          {/* Corner brackets */}
          <div
            className="absolute -top-3 -left-2 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 pointer-events-none"
            style={{
              borderTop: "2px solid rgba(255,32,32,0.7)",
              borderLeft: "2px solid rgba(255,32,32,0.7)",
              boxShadow: "-2px -2px 10px rgba(255,32,32,0.3)",
            }}
          />
          <div
            className="absolute -bottom-3 -right-2 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 pointer-events-none"
            style={{
              borderBottom: "2px solid rgba(255,32,32,0.7)",
              borderRight: "2px solid rgba(255,32,32,0.7)",
              boxShadow: "2px 2px 10px rgba(255,32,32,0.3)",
            }}
          />

          <h1 className="font-display" style={{ lineHeight: 0.92 }}>
            {/* FREE — neutral, large */}
            <span
              className="block text-6xl sm:text-8xl md:text-9xl lg:text-[10rem]"
              style={{
                color: "rgba(255,255,255,0.9)",
                textShadow:
                  "0 0 60px rgba(255,60,30,0.2), 0 4px 20px rgba(0,0,0,0.8)",
                letterSpacing: "0.15em",
              }}
            >
              FREE
            </span>
            {/* FIRE — full neon blaze */}
            <span
              className="block text-7xl sm:text-9xl md:text-[10rem] lg:text-[11.5rem] hero-title-fire"
              data-text="FIRE"
              style={{
                color: "var(--neon-red)",
                textShadow:
                  "0 0 10px var(--neon-red), 0 0 30px var(--neon-red), 0 0 70px rgba(255,32,32,0.6), 0 0 120px rgba(255,32,32,0.25)",
                letterSpacing: "-0.02em",
              }}
            >
              FIRE
            </span>
            {/* ESPORTS — wide tracking, orange */}
            <span
              className="block text-2xl sm:text-4xl md:text-5xl mt-2"
              style={{
                color: "var(--neon-orange)",
                textShadow:
                  "0 0 15px var(--neon-orange), 0 0 40px rgba(255,102,0,0.4)",
                letterSpacing: "0.55em",
                fontWeight: 700,
              }}
            >
              ESPORTS
            </span>
          </h1>
        </div>

        {/* Divider line */}
        <div
          className="mx-auto mt-6 mb-6 animate-fade-in animation-delay-400"
          style={{
            height: 1,
            width: "60%",
            maxWidth: 320,
            background:
              "linear-gradient(90deg, transparent, rgba(255,102,0,0.6) 30%, rgba(255,32,32,0.8) 50%, rgba(255,102,0,0.6) 70%, transparent)",
          }}
        />

        <p
          className="text-base sm:text-lg mb-10 animate-fade-in-up animation-delay-400 max-w-xl mx-auto font-gaming"
          style={{
            color: "oklch(0.72 0.02 30)",
            letterSpacing: "0.06em",
            textShadow: "0 1px 4px rgba(0,0,0,0.8)",
            fontWeight: 400,
            textTransform: "none",
            lineHeight: 1.7,
          }}
        >
          Battle for glory. Compete at the highest level.
          <br />
          Join thousands of warriors in the ultimate tournament experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <button
            type="button"
            onClick={scrollToRegister}
            className="neon-btn-primary px-10 py-4 font-gaming text-sm tracking-widest rounded-sm"
            data-ocid="hero.register.primary_button"
          >
            ⚔ REGISTER NOW
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("events")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="neon-btn px-10 py-4 font-gaming text-sm tracking-widest rounded-sm"
            data-ocid="hero.events.secondary_button"
          >
            VIEW EVENTS
          </button>
        </div>

        {/* Stats bar — redesigned with underline accent */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 animate-fade-in animation-delay-800">
          {[
            { label: "Active Players", value: "50K+", sub: "Worldwide" },
            { label: "Prize Pool", value: "$100K", sub: "Season 5" },
            { label: "Tournaments", value: "200+", sub: "Completed" },
            { label: "Countries", value: "45+", sub: "Regions" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center relative group"
              style={{
                padding: "12px 8px",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="font-display text-2xl sm:text-3xl stat-value"
                style={{
                  color: "var(--neon-yellow)",
                  textShadow:
                    "0 0 10px var(--neon-yellow), 0 0 25px rgba(255,204,0,0.35)",
                  display: "block",
                }}
              >
                {stat.value}
              </div>
              <div
                className="font-gaming text-xs tracking-widest mt-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {stat.label}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontStyle: "italic",
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce"
        onClick={() =>
          document
            .getElementById("events")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        style={{ color: "rgba(255,255,255,0.3)" }}
        aria-label="Scroll down"
        data-ocid="hero.scroll.button"
      >
        <span className="font-gaming text-xs tracking-widest">SCROLL</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </section>
  );
}
