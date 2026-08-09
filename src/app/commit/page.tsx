"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MobileNav } from "@/components/day/ChallengeDay";
import {
  ArrowRight,
  Check,
  CheckCircle,
  Flame,
  GitBranch,
  Rocket,
  Sparkles,
  Trophy,
} from "@/components/icons";
import { remember } from "@/lib/memory";
import { REFERRAL_CODE } from "@/data/journey";

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const COMMIT_TEXT =
  "I'm publicly committing to the 60-day ABTalks challenge on AI. Building daily, pushing to GitHub, posting on LinkedIn. Consistency over intensity.";

const NEXT_STEPS = [
  { icon: Rocket, title: "Day 1 starts now", body: "Open today's task, build something small, and submit proof of work." },
  { icon: GitBranch, title: "Commit + post daily", body: "One GitHub commit and one LinkedIn post keep your streak alive." },
  { icon: Trophy, title: "Watch the streak grow", body: "Miss a day? Catch up instead of quitting — the mentor builds your plan." },
];

export default function CommitPage() {
  const [copied, setCopied] = useState(false);
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  useEffect(() => {
    remember("milestone", "public-commit", `Committed to the challenge on ${new Date().toISOString()}`);
  }, []);

  function copyCode() {
    navigator.clipboard?.writeText(REFERRAL_CODE).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">
              ABTalks <span className="text-gradient">Redesigned</span>
            </span>
          </Link>
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400">
            <Flame className="h-4 w-4" />
            0 · Day 1
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 pb-28">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/25 to-violet-500/25 ring-1 ring-emerald-500/30">
            <CheckCircle className="h-10 w-10 text-emerald-400" />
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Commitment confirmed.
          </h1>
          <p className="mt-3 max-w-md text-zinc-400">
            You’re in, {today}. Day 1 of 60 starts now — and it’s already logged
            to your mentor’s memory.
          </p>
        </div>

        <div className="mt-8 card-glow rounded-2xl border border-white/10 bg-zinc-900/70 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-violet-400" />
            Your public commitment
          </div>
          <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm leading-relaxed text-zinc-300">
            “{COMMIT_TEXT}”
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fabtalks-redesign-fawn.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              <Linkedin className="h-4 w-4" />
              Share on LinkedIn
            </a>
            <button
              onClick={copyCode}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  Copied {REFERRAL_CODE}
                </>
              ) : (
                <>
                  Copy referral code · {REFERRAL_CODE}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold tracking-tight">What happens next</h2>
          <div className="mt-4 space-y-3">
            {NEXT_STEPS.map((s, i) => (
              <div key={s.title} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-900">
                  <s.icon className="h-4 w-4 text-violet-400" />
                </span>
                <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <div className="text-sm font-semibold">
                    <span className="mr-1.5 text-zinc-500">{i + 1}.</span>
                    {s.title}
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/challenge/1`}
            className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Start Day 1
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/dashboard"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
          >
            Open your challenge
          </Link>
        </div>
      </main>

      <MobileNav active="dash" />
    </div>
  );
}
