import { Toaster } from "@/components/ui/sonner";
import { useCallback, useState } from "react";
import { EventsSection } from "./components/EventsSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { NavBar } from "./components/NavBar";
import { ProfileSection } from "./components/ProfileSection";
import { RegistrationSection } from "./components/RegistrationSection";
import { SuccessModal } from "./components/SuccessModal";
import { UpdatesSection } from "./components/UpdatesSection";
import { YouTubeSection } from "./components/YouTubeSection";
import type { RegisteredPlayer } from "./types";

export default function App() {
  const [registeredPlayer, setRegisteredPlayer] =
    useState<RegisteredPlayer | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegistrationSuccess = useCallback((player: RegisteredPlayer) => {
    setRegisteredPlayer(player);
    setShowSuccess(true);
  }, []);

  const handleCloseSuccess = useCallback(() => {
    setShowSuccess(false);
    // Scroll to profile after closing modal
    setTimeout(() => {
      document
        .getElementById("profile")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <NavBar />
      <main>
        <HeroSection />
        <EventsSection />
        <YouTubeSection />
        <UpdatesSection />
        <RegistrationSection onSuccess={handleRegistrationSuccess} />
        <ProfileSection player={registeredPlayer} />
      </main>
      <Footer />
      <SuccessModal
        open={showSuccess}
        player={registeredPlayer}
        onClose={handleCloseSuccess}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.11 0 0)",
            border: "1px solid oklch(0.58 0.24 27)",
            color: "oklch(0.95 0 0)",
          },
        }}
      />
    </div>
  );
}
