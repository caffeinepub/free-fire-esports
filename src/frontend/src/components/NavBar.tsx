import { Flame } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "YouTube", href: "#youtube" },
  { label: "Updates", href: "#updates" },
  { label: "Register", href: "#register" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
      data-ocid="nav.panel"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2 group"
            onClick={() => handleNavClick("#home")}
            data-ocid="nav.home.link"
            aria-label="Free Fire Esports home"
          >
            <Flame
              className="w-6 h-6"
              style={{
                color: "var(--neon-orange)",
                filter: "drop-shadow(0 0 6px var(--neon-orange))",
              }}
            />
            <span
              className="font-display text-sm sm:text-base tracking-widest"
              style={{
                color: "var(--neon-red)",
                textShadow:
                  "0 0 10px var(--neon-red), 0 0 20px rgba(255,32,32,0.4)",
              }}
            >
              FREE FIRE ESPORTS
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-gaming text-xs tracking-widest transition-all duration-200 hover:text-white"
                style={{ color: "oklch(0.65 0 0)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--neon-orange)";
                  (e.currentTarget as HTMLButtonElement).style.textShadow =
                    "0 0 8px var(--neon-orange)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.65 0 0)";
                  (e.currentTarget as HTMLButtonElement).style.textShadow =
                    "none";
                }}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            <span
              className={`block w-6 h-0.5 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              style={{ background: "var(--neon-red)" }}
            />
            <span
              className={`block w-6 h-0.5 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
              style={{ background: "var(--neon-red)" }}
            />
            <span
              className={`block w-6 h-0.5 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              style={{ background: "var(--neon-red)" }}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden pb-4 border-t"
            style={{
              borderColor: "rgba(255,32,32,0.2)",
              background: "rgba(8,8,8,0.97)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-4 py-3 font-gaming text-xs tracking-widest transition-colors"
                style={{ color: "oklch(0.65 0 0)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--neon-orange)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "oklch(0.65 0 0)";
                }}
                data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
