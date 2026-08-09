"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CURRENT_DAY, JOURNEY, skillColor } from "@/data/journey";
import { getChallengeContent, type ChallengeResource } from "@/lib/challenge";
import { getMemory, getProfile, remember } from "@/lib/memory";
import DaySwitcher from "@/components/content/DaySwitcher";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle,
  Flame,
  GitBranch,
  Play,
  Rocket,
  Users,
} from "@/components/icons";

const RESOURCE_ICON: Record<ChallengeResource["type"], (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  video: Play,
  repo: GitBranch,
  docs: BookOpen,
  community: Users,
};

export default function ChallengePage({ day }: { day: number }) {
  const router = useRouter();
  const node = JOURNEY.find((d) => d.day === day)!;
  const content = useMemo(() => getChallengeContent(day), [day]);
  const profile = getProfile();
  const existing = getMemory().some((e) => e.kind === "milestone" && e.key === "challenge-started");
  const [started, setStarted] = useState(existing);
  const [starting, setStarting] = useState(false);

  const color = skillColor(node.skill);
  const prev = day > 1 ? day - 1 : null;
  const next = day < CURRENT_DAY ? day + 1 : null;

  async function startChallenge() {
    setStarting(true);
    try {
      await fetch("/api/start-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day }),
      });
    } catch {
      /* offline — memory still logs the start */
    }
    remember("milestone", "challenge-started", `Started the 60-day challenge on ${new Date().toISOString()}`);
    remember("milestone", `day-${day}-opened`, `Opened Day ${day} challenge page`);
    setStarted(true);
    router.push(`/day/${day}`);
  }

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
                <span className="text-gradient">Challenge</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400">
            <Flame className="h-4 w-4" />
            {profile.streak} · max {profile.longestStreak}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-36 pt-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 via-zinc-900 to-blue-600/10 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-300">
              60 Days Challenge
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
              CLAUDE · IST day {node.day}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
              {node.level === "advanced" ? "Advanced" : "Core"} · ~{node.minutes} min
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            Day {node.day} — {node.title}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">{node.blurb}</p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                {node.skill} track
              </span>
              <span>Day {node.day} of {CURRENT_DAY}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                style={{ width: `${Math.round((node.day / CURRENT_DAY) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
          <DaySwitcher current={node.day} />
        </div>

        <section id="overview" className="mt-5 scroll-mt-20 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-violet-400" />
            <h2 className="font-semibold tracking-tight">Your task today</h2>
          </div>
          <ol className="mt-4 space-y-3">
            {content.instructions.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-xs font-semibold text-violet-300">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section id="build" className="mt-5 scroll-mt-20 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <h2 className="font-semibold tracking-tight">Done when you can tick all of these</h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {content.acceptance.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-400">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="resources" className="mt-5 scroll-mt-20 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-400" />
            <h2 className="font-semibold tracking-tight">Resources for today</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {content.resources.map((r) => {
              const Icon = RESOURCE_ICON[r.type];
              return (
                <a
                  key={r.label + r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-violet-500/30 hover:bg-white/[0.05]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15">
                    <Icon className="h-4 w-4 text-violet-400" />
                  </span>
                  <span className="mt-3 text-sm font-medium leading-snug text-zinc-200 group-hover:text-white">
                    {r.label}
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-zinc-500">{r.description}</span>
                </a>
              );
            })}
          </div>
        </section>

        <div className="mt-6 flex items-center justify-between gap-3">
          {prev ? (
            <Link
              href={`/challenge/${prev}`}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Day {prev}
            </Link>
          ) : (
            <span />
          )}
          <span className="text-xs text-zinc-600">
            Day {node.day} of {CURRENT_DAY}
          </span>
          {next ? (
            <Link
              href={`/challenge/${next}`}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
            >
              Day {next}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-semibold">Day {node.day} of 60</div>
            <div className="truncate text-xs text-zinc-500">{node.title}</div>
          </div>
          {started ? (
            <Link
              href={`/day/${day}`}
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Continue Day {day}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              onClick={startChallenge}
              disabled={starting}
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              <Rocket className="h-4 w-4" />
              {starting ? "Starting…" : "Start the challenge"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
