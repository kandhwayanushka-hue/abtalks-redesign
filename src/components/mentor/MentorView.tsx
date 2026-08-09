"use client";

import { useState } from "react";
import Link from "next/link";
import MentorChat from "@/components/dashboard/MentorChat";
import { MobileNav } from "@/components/day/ChallengeDay";
import { ArrowLeft, ArrowRight, Users } from "@/components/icons";
import ThemeToggle from "@/components/ThemeToggle";
import { getMemory, remember } from "@/lib/memory";
import { LIVE_MENTORS, type Mentor } from "@/lib/mentors";

export default function MentorView({ mentor }: { mentor: Mentor }) {
  const startedRef = `${mentor.id}-chat-opened`;
  const [opened, setOpened] = useState(() => getMemory().some((e) => e.key === startedRef));
  const online = LIVE_MENTORS.find((m) => m.id === mentor.id)?.online ?? true;

  function open() {
    remember("milestone", startedRef, `Opened ${mentor.name} chat on ${new Date().toISOString()}`);
    setOpened(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard#mentor"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
              aria-label="Back to your challenge"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 font-bold text-white">
                A
              </span>
              <span className="hidden text-sm font-semibold tracking-tight sm:block">
                ABTalks <span className="text-gradient">Redesigned</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {online ? "online now" : "away"}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-28 pt-6 md:pb-8">
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-zinc-900 to-blue-600/10 p-5">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${mentor.color}, ${mentor.color}88)` }}
          >
            {mentor.name[0]}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-xl font-semibold tracking-tight">{mentor.name}</h1>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${online ? "bg-emerald-500/15 text-emerald-400" : "bg-white/10 text-zinc-400"}`}
              >
                {online ? "online" : "away"}
              </span>
            </div>
            <p className="truncate text-sm text-zinc-400">{mentor.specialty}</p>
          </div>
          <span className="hidden items-center gap-1.5 text-xs text-zinc-500 sm:flex">
            <Users className="h-4 w-4" />
            live mentor
          </span>
        </div>

        <div className="mt-4 min-h-[420px] flex-1">
          <MentorChat mentor={mentor} />
        </div>

        {!opened && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl border border-violet-500/25 bg-violet-500/10 px-4 py-3">
            <p className="text-sm text-zinc-300">
              Doubts are logged to memory and resolved in-context — {mentor.name} remembers what you struggled with.
            </p>
            <button
              onClick={open}
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
            >
              Open chat <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </main>

      <MobileNav active="dash" />
    </div>
  );
}
