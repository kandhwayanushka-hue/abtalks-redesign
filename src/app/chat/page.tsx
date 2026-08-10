"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import MentorChat from "@/components/dashboard/MentorChat";
import { ArrowLeft, Brain } from "@/components/icons";

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/dashboard#mentor" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">
              ABTalks <span className="text-zinc-500">·</span>{" "}
              <span className="text-gradient">Mentor</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:flex" />
            <Link
              href="/dashboard#mentor"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-6 sm:px-6">
        <div className="flex items-center gap-2 py-4 text-sm text-zinc-400">
          <Brain className="h-4 w-4 text-violet-400" />
          Full-screen mentor chat — every doubt is logged to memory.
        </div>
        <div className="h-[calc(100svh-12rem)]">
          <MentorChat fullScreen />
        </div>
      </main>
    </div>
  );
}
