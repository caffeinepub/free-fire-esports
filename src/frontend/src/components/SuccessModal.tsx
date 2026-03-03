import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2, ChevronRight } from "lucide-react";
import type { RegisteredPlayer } from "../types";

interface Props {
  open: boolean;
  player: RegisteredPlayer | null;
  onClose: () => void;
}

const ROLE_LABELS: Record<string, string> = {
  rusher: "🔥 Rusher",
  sniper: "🎯 Sniper",
  support: "🛡️ Support",
  igl: "♟️ IGL",
};

const ROLE_COLORS: Record<string, string> = {
  rusher: "var(--neon-red)",
  sniper: "var(--neon-yellow)",
  support: "var(--neon-green)",
  igl: "var(--neon-purple)",
};

export function SuccessModal({ open, player, onClose }: Props) {
  if (!player) return null;

  const roleColor = ROLE_COLORS[player.role] || "var(--neon-red)";
  const roleLabel = ROLE_LABELS[player.role] || player.role;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-md border-0 p-0 overflow-hidden"
        style={{
          background: "oklch(0.09 0 0)",
          border: `1px solid ${roleColor}`,
          boxShadow: `0 0 40px ${roleColor}30, 0 0 80px rgba(0,0,0,0.8)`,
        }}
        data-ocid="register.success.modal"
      >
        {/* Top glow strip */}
        <div
          className="h-1"
          style={{
            background: `linear-gradient(90deg, var(--neon-red), ${roleColor}, var(--neon-orange))`,
            boxShadow: `0 0 20px ${roleColor}`,
          }}
        />

        <DialogHeader className="px-8 pt-8 pb-0">
          <div className="flex items-center justify-center mb-6">
            <div
              className="relative w-20 h-20 rounded-sm flex items-center justify-center"
              style={{
                background: `${roleColor}15`,
                border: `1px solid ${roleColor}50`,
                boxShadow: `0 0 30px ${roleColor}30`,
              }}
            >
              <CheckCircle2
                className="w-10 h-10"
                style={{
                  color: roleColor,
                  filter: `drop-shadow(0 0 10px ${roleColor})`,
                }}
              />
              {/* Corner accents */}
              <span
                className="absolute top-0 left-0 w-3 h-3 border-t border-l"
                style={{ borderColor: roleColor, top: "-1px", left: "-1px" }}
              />
              <span
                className="absolute top-0 right-0 w-3 h-3 border-t border-r"
                style={{ borderColor: roleColor, top: "-1px", right: "-1px" }}
              />
              <span
                className="absolute bottom-0 left-0 w-3 h-3 border-b border-l"
                style={{ borderColor: roleColor, bottom: "-1px", left: "-1px" }}
              />
              <span
                className="absolute bottom-0 right-0 w-3 h-3 border-b border-r"
                style={{
                  borderColor: roleColor,
                  bottom: "-1px",
                  right: "-1px",
                }}
              />
            </div>
          </div>
          <DialogTitle
            className="text-center font-display text-3xl"
            style={{
              color: "white",
              textShadow: `0 0 20px ${roleColor}60`,
            }}
          >
            REGISTRATION
            <br />
            <span
              style={{ color: roleColor, textShadow: `0 0 20px ${roleColor}` }}
            >
              COMPLETE
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="px-8 pb-8 pt-6">
          {/* Player data display */}
          <div
            className="rounded-sm p-5 mb-6"
            style={{
              background: "oklch(0.12 0 0)",
              border: "1px solid oklch(0.18 0 0)",
            }}
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span
                  className="font-gaming text-xs tracking-widest"
                  style={{ color: "oklch(0.45 0 0)" }}
                >
                  PLAYER NAME
                </span>
                <span
                  className="font-display text-lg"
                  style={{
                    color: "white",
                    textShadow: "0 0 10px rgba(255,255,255,0.2)",
                  }}
                >
                  {player.name}
                </span>
              </div>
              <div className="h-px" style={{ background: "oklch(0.18 0 0)" }} />
              <div className="flex justify-between items-center">
                <span
                  className="font-gaming text-xs tracking-widest"
                  style={{ color: "oklch(0.45 0 0)" }}
                >
                  AGE
                </span>
                <span
                  className="font-display text-lg"
                  style={{
                    color: "var(--neon-yellow)",
                    textShadow: "0 0 8px var(--neon-yellow)",
                  }}
                >
                  {player.age}
                </span>
              </div>
              <div className="h-px" style={{ background: "oklch(0.18 0 0)" }} />
              <div className="flex justify-between items-center">
                <span
                  className="font-gaming text-xs tracking-widest"
                  style={{ color: "oklch(0.45 0 0)" }}
                >
                  ROLE
                </span>
                <span
                  className="font-gaming text-sm tracking-widest px-3 py-1 rounded-sm"
                  style={{
                    color: roleColor,
                    border: `1px solid ${roleColor}50`,
                    background: `${roleColor}15`,
                    textShadow: `0 0 6px ${roleColor}`,
                  }}
                >
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>

          <p
            className="text-center text-sm mb-6"
            style={{ color: "oklch(0.55 0 0)" }}
          >
            You have been added to the Season 5 roster. Your profile is now
            active.
          </p>

          <button
            type="button"
            className="neon-btn-primary w-full py-3.5 font-gaming text-sm tracking-widest rounded-sm flex items-center justify-center gap-2"
            onClick={onClose}
            data-ocid="register.success.confirm_button"
          >
            VIEW MY PROFILE <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
