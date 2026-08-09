"use client";

import Link from "next/link";
import { MobileNav } from "@/components/day/ChallengeDay";
import DaySwitcher from "@/components/content/DaySwitcher";
import { ArrowLeft, Trophy } from "@/components/icons";
import { JOURNEY } from "@/data/journey";
import { CERTIFICATES } from "@/data/certificates";

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
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
                ABTalks <span className="text-zinc-500">·</span>{" "}
                <span className="text-gradient">Content</span>
              </span>
            </Link>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
            {JOURNEY.length} days
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 pb-28">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
            The content section
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            The full 60-day syllabus
          </h1>
          <p className="mt-2 max-w-lg text-sm text-zinc-400">
            Everything, part by part. Open any day’s content, or jump straight to it with the
            switcher.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
          <DaySwitcher />
        </div>

        <div className="mt-8 space-y-8">
          {CERTIFICATES.map((part) => {
            const days = JOURNEY.filter((d) => d.day >= part.start && d.day <= part.end);
            return (
              <section key={part.part} className="scroll-mt-20">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                        Part {part.part}
                      </span>
                      <span className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className={`h-1.5 w-3 rounded-full ${s <= part.stars ? "bg-violet-400" : "bg-white/10"}`}
                          />
                        ))}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {part.difficulty} difficulty
                      </span>
                    </div>
                    <h2 className="mt-1 text-lg font-semibold tracking-tight">{part.title}</h2>
                  </div>
                  <Link
                    href={`/certificate/${part.part}`}
                    className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/20"
                  >
                    <Trophy className="h-3.5 w-3.5" />
                    Certificate · Day {part.day}
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {days.map((d) => (
                    <Link
                      key={d.day}
                      href={`/challenge/${d.day}`}
                      className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-violet-500/40 hover:bg-white/[0.06]"
                    >
                      <span className="text-xs font-semibold text-violet-400">Day {d.day}</span>
                      <span className="mt-0.5 line-clamp-2 text-sm leading-snug text-zinc-300">
                        {d.title}
                      </span>
                      <span className="mt-1.5 text-[10px] uppercase tracking-wide text-zinc-600">
                        {d.skill} · {d.minutes} min
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <MobileNav active="content" />
    </div>
  );
}
