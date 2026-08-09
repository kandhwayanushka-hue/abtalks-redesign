"use client";

import { JOURNEY, SKILLS, skillColor } from "@/data/journey";
import { Check, Flame } from "@/components/icons";

export default function JourneyPath() {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Your 60-day journey</h2>
          <p className="text-sm text-zinc-500">Skills light up as you ship. Streaks burn brighter.</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400">
          <Flame className="h-4 w-4" />
          54
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
        {SKILLS.map((s) => (
          <span key={s.id} className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-10 gap-1.5 sm:grid-cols-15 lg:grid-cols-20">
        {JOURNEY.map((d) => {
          const color = skillColor(d.skill);
          const done = d.status === "done" || d.status === "current";
          const missed = d.status === "missed";
          return (
            <div
              key={d.day}
              title={`Day ${d.day} · ${d.title}`}
              className={`group relative flex aspect-square items-center justify-center rounded-md text-[10px] font-semibold transition ${
                done ? "text-white" : "text-zinc-600"
              } ${missed ? "ring-1 ring-red-500/40" : ""} ${
                d.status === "current"
                  ? "scale-110 ring-2 ring-violet-400"
                  : d.status === "locked"
                    ? "bg-zinc-800/60"
                    : ""
              }`}
              style={done && d.status !== "current" ? { background: `${color}55` } : undefined}
            >
              {d.status === "done" ? (
                <Check className="h-3.5 w-3.5" style={{ color }} />
              ) : d.status === "current" ? (
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
              ) : missed ? (
                <span className="text-red-400">!</span>
              ) : (
                d.day
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
        <div>
          <div className="text-sm font-medium">Level 9 · Grand Master</div>
          <div className="text-xs text-zinc-500">4,600 / 5,000 XP to graduate</div>
        </div>
        <div className="h-2 w-36 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500" style={{ width: "92%" }} />
        </div>
      </div>
    </div>
  );
}
