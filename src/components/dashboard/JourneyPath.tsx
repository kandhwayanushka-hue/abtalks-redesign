"use client";

import { JOURNEY, SKILLS, STATUS_LEGEND, skillColor, type DayStatus } from "@/data/journey";
import { Check, Flame } from "@/components/icons";

const STATUS_BG: Record<DayStatus, string | undefined> = {
  ontime: "rgba(52,211,153,0.18)",
  rejected: "rgba(251,113,133,0.18)",
  missed: "rgba(161,161,170,0.12)",
  catchup: "rgba(251,191,36,0.18)",
  future: undefined,
  current: undefined,
};

const STATUS_TEXT: Record<DayStatus, string> = {
  ontime: "#34d399",
  rejected: "#fb7185",
  missed: "#a1a1aa",
  catchup: "#fbbf24",
  future: "#52525b",
  current: "#a78bfa",
};

function DayCell({ day }: { day: number }) {
  const node = JOURNEY[day - 1];
  const color = skillColor(node.skill);
  const text = STATUS_TEXT[node.status];

  if (node.status === "ontime") {
    return (
      <div
        title={`Day ${day} · On time`}
        className="flex aspect-square items-center justify-center rounded-md bg-white/5"
        style={{ background: STATUS_BG.ontime }}
      >
        <Check className="h-3.5 w-3.5" style={{ color: text }} />
      </div>
    );
  }
  if (node.status === "catchup") {
    return (
      <div
        title={`Day ${day} · Missed — catch up available`}
        className="flex aspect-square items-center justify-center rounded-md text-[9px] font-bold"
        style={{ background: STATUS_BG.catchup, color: text }}
      >
        ↻
      </div>
    );
  }
  if (node.status === "missed" || node.status === "rejected") {
    return (
      <div
        title={`Day ${day} · ${node.status === "rejected" ? "Rejected" : "Missed"}`}
        className="flex aspect-square items-center justify-center rounded-md text-[10px] font-semibold text-zinc-500"
        style={{ background: STATUS_BG[node.status] }}
      >
        {node.status === "rejected" ? "✕" : day}
      </div>
    );
  }
  if (node.status === "current") {
    return (
      <div
        title={`Day ${day} · Today`}
        className="flex aspect-square scale-110 items-center justify-center rounded-md ring-2 ring-violet-400"
        style={{ background: `${color}44` }}
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
      </div>
    );
  }
  return (
    <div
      title={`Day ${day} · Future`}
      className="flex aspect-square items-center justify-center rounded-md text-[10px] text-zinc-600"
      style={{ background: STATUS_BG.future }}
    >
      {day}
    </div>
  );
}

export default function JourneyPath() {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Your 60-Day Journey</h2>
          <p className="text-sm text-zinc-500">Calendar progress (IST) from your start date</p>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400">
          <Flame className="h-4 w-4" />
          0 · longest 1
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
        {STATUS_LEGEND.map((s) => (
          <span key={s.status} className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-10 gap-1.5 sm:grid-cols-15 lg:grid-cols-20">
        {JOURNEY.map((d) => (
          <DayCell key={d.day} day={d.day} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
        <div>
          <div className="text-sm font-medium">1 day done · 59 to go</div>
          <div className="text-xs text-zinc-500">Catch up is on — days 2–14 are open, amber ↻ cells</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-zinc-500">Skills</span>
          <div className="flex gap-3">
            {SKILLS.map((s) => (
              <span key={s.id} title={s.label} className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
