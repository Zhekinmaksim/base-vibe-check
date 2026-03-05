"use client";

import { useState, useEffect, useCallback } from "react";
import { useMiniKit } from "./MiniKitProvider";

const MOODS = [
  { id: "bullish", emoji: "🚀", label: "Bullish", color: "#00D395", description: "To the moon!" },
  { id: "building", emoji: "🔨", label: "Building", color: "#0052FF", description: "Heads down, shipping" },
  { id: "vibing", emoji: "✨", label: "Vibing", color: "#A855F7", description: "Good energy today" },
  { id: "bearish", emoji: "🐻", label: "Bearish", color: "#FF4DA6", description: "Not feeling it" },
  { id: "touching_grass", emoji: "🌿", label: "Touching Grass", color: "#22C55E", description: "AFK mode" },
  { id: "degen", emoji: "🎰", label: "Full Degen", color: "#FF8A00", description: "YOLO activated" },
] as const;

type MoodId = (typeof MOODS)[number]["id"];

interface VoteData {
  [key: string]: number;
}

export default function VibeCheck() {
  const { isLoaded } = useMiniKit();
  const [selectedMood, setSelectedMood] = useState<MoodId | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState<VoteData>({});
  const [showResults, setShowResults] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);

  // Загружаем реальные голоса из базы
  useEffect(() => {
    fetch("/api/vote")
      .then((res) => res.json())
      .then((data) => {
        if (data.votes) {
          setVotes(data.votes);
          setTotalVotes(Object.values(data.votes as VoteData).reduce((a: number, b: number) => a + b, 0));
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleVote = useCallback(
    async (moodId: MoodId) => {
      if (hasVoted) return;
      setSelectedMood(moodId);
      setHasVoted(true);

      try {
        const res = await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mood: moodId }),
        });
        const data = await res.json();
        if (data.votes) {
          setVotes(data.votes);
          setTotalVotes(Object.values(data.votes as VoteData).reduce((a: number, b: number) => a + b, 0));
        }
      } catch (error) {
        console.error("Vote error:", error);
        // Fallback: обновляем локально
        setVotes((prev) => {
          const updated = { ...prev, [moodId]: (prev[moodId] || 0) + 1 };
          setTotalVotes(Object.values(updated).reduce((a, b) => a + b, 0));
          return updated;
        });
      }

      setTimeout(() => setShowResults(true), 400);
    },
    [hasVoted]
  );

  const getPercentage = (moodId: string) => {
    if (totalVotes === 0) return 0;
    return Math.round(((votes[moodId] || 0) / totalVotes) * 100);
  };

  const topMood = MOODS.reduce((top, mood) =>
    (votes[mood.id] || 0) > (votes[top.id] || 0) ? mood : top
  );

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-2 border-[var(--color-base-blue)] border-t-transparent animate-spin mx-auto mb-4" />
          <p style={{ fontFamily: "var(--font-mono)" }} className="text-[var(--color-text-secondary)] text-sm">
            Loading vibes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 max-w-md mx-auto">
      {/* Header */}
      <header className="text-center mb-8 slide-up delay-1">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
          <span className="text-xs text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>
            {totalVotes} vibes checked today
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Vibe Check
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>
          How are you vibing onchain today?
        </p>
      </header>

      {/* Top community vibe */}
      {totalVotes > 0 && (
        <div className="mb-8 slide-up delay-2">
          <div className="text-center p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(circle at center, ${topMood.color}, transparent 70%)` }} />
            <p className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-3 relative" style={{ fontFamily: "var(--font-mono)" }}>
              Community Vibe
            </p>
            <div className="text-5xl mb-2 relative pulse-glow">{topMood.emoji}</div>
            <p className="text-lg font-bold relative" style={{ fontFamily: "var(--font-display)", color: topMood.color }}>
              {topMood.label}
            </p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 relative" style={{ fontFamily: "var(--font-mono)" }}>
              {getPercentage(topMood.id)}% of the community
            </p>
          </div>
        </div>
      )}

      {/* Mood selection / Results */}
      {!showResults ? (
        <div className="slide-up delay-3">
          <p className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-4 text-center" style={{ fontFamily: "var(--font-mono)" }}>
            Cast your vibe
          </p>
          <div className="grid grid-cols-2 gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleVote(mood.id)}
                className={`mood-btn p-4 rounded-xl border text-left transition-all ${
                  selectedMood === mood.id
                    ? "border-transparent scale-95"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]"
                }`}
                style={selectedMood === mood.id ? { background: `${mood.color}22`, borderColor: mood.color } : {}}
                disabled={hasVoted}
              >
                <span className="text-2xl block mb-2">{mood.emoji}</span>
                <span className="text-sm font-semibold block" style={{ fontFamily: "var(--font-display)" }}>{mood.label}</span>
                <span className="text-xs text-[var(--color-text-secondary)] block mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>{mood.description}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="slide-up">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-widest text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>
              Live Results
            </p>
            <span className="text-xs text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>
              {totalVotes} votes
            </span>
          </div>
          <div className="space-y-3">
            {[...MOODS].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0)).map((mood) => {
              const pct = getPercentage(mood.id);
              const isSelected = selectedMood === mood.id;
              return (
                <div key={mood.id} className={`p-3 rounded-xl border ${isSelected ? "border-[var(--color-base-blue)]/30 bg-[var(--color-base-blue)]/5" : "border-[var(--color-border)] bg-[var(--color-surface)]"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{mood.emoji}</span>
                      <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)" }}>{mood.label}</span>
                      {isSelected && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-base-blue)]/20 text-[var(--color-base-blue)]" style={{ fontFamily: "var(--font-mono)" }}>
                          YOU
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: mood.color }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--color-bg)] overflow-hidden">
                    <div className="h-full rounded-full bar-grow" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${mood.color}, ${mood.color}88)` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-[var(--color-text-secondary)] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
              Share your vibe with the timeline
            </p>
            <button
              onClick={() => {
                const mood = MOODS.find((m) => m.id === selectedMood);
                if (mood) alert(`${mood.emoji} My vibe today: ${mood.label}. What's yours?`);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: "var(--font-display)", background: "var(--color-base-blue)", color: "#fff", boxShadow: "0 0 30px var(--color-base-blue-glow)" }}
            >
              Share Vibe ✨
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 text-center pb-4 slide-up delay-5">
        <p className="text-[10px] text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-mono)" }}>
          Built on <span style={{ color: "var(--color-base-blue)" }}>Base</span> · Powered by MiniKit
        </p>
      </footer>
    </div>
  );
}
