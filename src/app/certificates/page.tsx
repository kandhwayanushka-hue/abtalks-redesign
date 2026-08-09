"use client";

import Link from "next/link";
import { MobileNav } from "@/components/day/ChallengeDay";
import { ArrowRight, CheckCircle, Lock, Trophy } from "@/components/icons";
import { getProfile } from "@/lib/memory";
import { CERTIFICATES } from "@/data/certificates";

export default function CertificatesPage() {
  const profile = getProfile();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">
              ABTalks <span className="text-zinc-500">·</span>{" "}
              <span className="text-gradient">Certificates</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 pb-28">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15">
            <Trophy className="h-7 w-7 text-amber-400" />
          </span>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Your certificates of achievement
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
            Every 20 days unlocks a new one. Finish a part, collect it, print it, and show it.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {CERTIFICATES.map((c) => {
            const earned = profile.currentDay >= c.day;
            return (
              <Link
                key={c.part}
                href={`/certificate/${c.part}`}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-amber-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                    Part {c.part}
                  </span>
                  {earned ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                      <CheckCircle className="h-4 w-4" /> Earned
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-zinc-500">
                      <Lock className="h-3.5 w-3.5" /> Day {c.day}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-semibold leading-snug tracking-tight">{c.title}</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Days {c.start}–{c.end} · {c.difficulty}
                </p>
                <div className="mt-3 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`h-1.5 w-3.5 rounded-full ${s <= c.stars ? "bg-violet-400" : "bg-white/10"}`}
                    />
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-amber-300 transition group-hover:translate-x-0.5">
                  {earned ? "View certificate" : "See requirements"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-zinc-600">
          Certificates unlock automatically once your day count passes the milestone — no forms, no
          fees.
        </p>
      </main>

      <MobileNav active="dash" />
    </div>
  );
}
