"use client";

import { CURRENT_DAY } from "@/data/journey";
import type { LearnerProfile } from "@/lib/memory";
import { Check, Flame, GitBranch, Lock, Trophy } from "@/components/icons";

const LEVELS = [
  { min: 50, name: "Grand Master" },
  { min: 30, name: "Ninja" },
  { min: 15, name: "Builder" },
  { min: 5, name: "Apprentice" },
  { min: 0, name: "Beginner" },
];

function levelName(completed: number) {
  return LEVELS.find((l) => completed >= l.min)?.name ?? "Beginner";
}

export default function Standing({ profile }: { profile: LearnerProfile }) {
  const pct = Math.round((profile.completed / CURRENT_DAY) * 100);
  const r = 34;
  const c = 2 * Math.PI * r;

  const badges = [
    { icon: Check, label: "Day 1 shipped", earned: true, hint: "Completed your first task on time" },
    { icon: GitBranch, label: "First commit", earned: true, hint: "Pushed public proof of work" },
    { icon: Flame, label: "Streak starter", earned: profile.streak >= 1, hint: "Reach a 1-day streak" },
    { icon: Trophy, label: "Catch-up finisher", earned: profile.caughtUp, hint: "Finish the catch-up plan" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight">Your standing</h2>
      <p className="text-sm text-zinc-500">Where you are, and what unlocks next.</p>

      <div className="mt-5 flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <circle
              cx="40"
              cy="40"
              r={r}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c - (c * pct) / 100}
            />
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-semibold">{pct}%</span>
            <span className="text-[10px] text-zinc-500">overall</span>
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold">
            Level {Math.min(9, 1 + Math.floor(profile.completed / 7))} · {levelName(profile.completed)}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-zinc-400">
            {profile.completed} of {CURRENT_DAY} days done. You’re in the top 40% of your campus this week — keep
            shipping and it only goes up.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {badges.map((b) => (
          <div
            key={b.label}
            title={b.hint}
            className={`rounded-xl border px-3 py-3 text-center transition ${
              b.earned
                ? "border-emerald-500/25 bg-emerald-500/10"
                : "border-white/10 bg-white/[0.02] opacity-60"
            }`}
          >
            {b.earned ? (
              <b.icon className="mx-auto h-5 w-5 text-emerald-400" />
            ) : (
              <Lock className="mx-auto h-5 w-5 text-zinc-600" />
            )}
            <div className={`mt-1.5 text-xs font-medium ${b.earned ? "text-emerald-300" : "text-zinc-500"}`}>
              {b.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
