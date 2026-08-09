"use client";

import { useRouter } from "next/navigation";
import { JOURNEY } from "@/data/journey";

export default function DaySwitcher({ current }: { current?: number }) {
  const router = useRouter();

  function go(day: string) {
    const n = Number(day);
    if (!Number.isNaN(n)) router.push(`/challenge/${n}`);
  }

  return (
    <div className="flex items-center gap-3">
      <span className="shrink-0 text-xs font-medium uppercase tracking-widest text-zinc-500">
        Switch day
      </span>
      <select
        value={current ?? ""}
        onChange={(e) => go(e.target.value)}
        className="w-full min-w-0 flex-1 rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 focus:border-violet-500/50 focus:outline-none"
        aria-label="Switch to any day's content"
      >
        <option value="" disabled>
          Jump to any day…
        </option>
        {JOURNEY.map((d) => (
          <option key={d.day} value={d.day}>
            Day {d.day} — {d.title}
          </option>
        ))}
      </select>
    </div>
  );
}
