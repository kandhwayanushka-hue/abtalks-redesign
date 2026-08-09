"use client";

import { useState } from "react";
import Link from "next/link";
import MentorChat from "./MentorChat";
import JourneyPath from "./JourneyPath";
import TaskView from "./TaskView";
import { MobileNav } from "@/components/day/ChallengeDay";
import { LIVE_MENTORS } from "@/lib/mentors";
import {
  ArrowRight,
  Bolt,
  Check,
  CheckCircle,
  Flame,
  MapPin,
  Message,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "@/components/icons";
import { getProfile, remember, updateProfile, type LearnerProfile } from "@/lib/memory";
import {
  catchUpCount,
  CURRENT_DAY,
  JOURNEY,
  LONGEST_STREAK,
  RECENT_SUBMISSIONS,
  REFERRAL_CODE,
} from "@/data/journey";

const navItems = [
  { label: "Today", active: true },
  { label: "Journey" },
  { label: "Mentor" },
  { label: "Community" },
];

const posts = [
  { author: "Priya R.", day: 57, tag: "refactor", title: "I made my repo my resume", votes: 84 },
  { author: "Arjun K.", day: 59, tag: "case-study", title: "Breaking down my launch numbers", votes: 71 },
  { author: "Sneha T.", day: 55, tag: "teach", title: "Teaching my friend Day 2 — it stuck", votes: 63 },
  { author: "Dev M.", day: 58, tag: "polish", title: "The 90-minute polish pass that worked", votes: 58 },
];

function askMentor(text: string) {
  window.dispatchEvent(new CustomEvent("abtalks:mentor-ask", { detail: text }));
}

export default function Dashboard() {
  const [profile, setProfile] = useState<LearnerProfile | null>(() => getProfile());
  const [completedToday, setCompletedToday] = useState(false);

  const today = JOURNEY.find((d) => d.day === CURRENT_DAY)!;

  function completeToday() {
    if (!profile) return;
    const next = { ...profile, completed: profile.completed + 1, caughtUp: true };
    updateProfile({ completed: next.completed, caughtUp: true });
    remember("milestone", "day-60-graduated", `Shipped v1.0.0 and graduated on ${new Date().toISOString()}`);
    setProfile(next);
    setCompletedToday(true);
  }

  function askCatchUp() {
    askMentor("I missed a lot of days. Give me a catch-up plan.");
  }

  if (!profile) return null;

  const studentName = profile.name?.trim() || "Student";
  const emptyProfile = !profile.name?.trim() || profile.currentDay < 1;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">
              ABTalks <span className="text-zinc-500">·</span>{" "}
              <span className="text-gradient">Redesigned</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {navItems.map((n) => (
              <a
                key={n.label}
                href={n.active ? "#today" : "#"}
                className={`rounded-full px-4 py-1.5 text-sm transition ${
                  n.active ? "bg-white text-zinc-950 font-medium" : "text-zinc-400 hover:text-white"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400">
              <Flame className="h-4 w-4" />
              {profile.streak} · max {profile.longestStreak}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="hidden text-right sm:block">
                <div className="text-sm font-medium leading-tight">{studentName}</div>
                <div className="text-xs text-zinc-500">Solo · Day {CURRENT_DAY}</div>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
                AK
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 pb-28 sm:px-6 md:pb-8">
        {emptyProfile && (
          <div className="mb-6 rounded-2xl border border-violet-500/25 bg-violet-500/10 px-5 py-4">
            <h2 className="font-semibold text-violet-200">Welcome to ABTalks</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Pick a track, then build something every day — a GitHub commit + a LinkedIn post keep your
              streak alive. Your journey starts at Day 1.
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {completedToday ? "Graduated. That's a wrap." : `Good evening, ${studentName}.`}
            </h1>
            <p className="mt-1 text-zinc-500">
              {completedToday
                ? "Day 60 complete — v1.0.0 shipped and logged to memory."
                : `${profile.completed} of ${CURRENT_DAY} days done · ${catchUpCount} days open for catch-up · your mentor is ready.`}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Deadline · today 8:00 PM IST
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { icon: Flame, label: "Current streak", value: `${profile.streak} days · longest ${LONGEST_STREAK}`, tone: "text-amber-400" },
            { icon: CheckCircle, label: "Days completed", value: `${profile.completed} / 60`, tone: "text-emerald-400" },
            { icon: Users, label: "Referrals", value: `${profile.referrals} · code ${REFERRAL_CODE}`, tone: "text-blue-400" },
            { icon: Bolt, label: "Catch up open", value: `${catchUpCount} days`, tone: "text-violet-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="flex items-center gap-2 text-zinc-500">
                <s.icon className={`h-4 w-4 ${s.tone}`} />
                <span className="text-xs">{s.label}</span>
              </div>
              <div className="mt-2 text-xl font-semibold tracking-tight">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/[0.08] to-violet-500/[0.05] p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15">
              <MapPin className="h-5 w-5 text-amber-400" />
            </span>
            <div>
              <h3 className="font-semibold">Want to be a campus ambassador for your college?</h3>
              <p className="mt-0.5 text-sm text-zinc-400">
                Lead your campus on ABTalks, earn perks, and grow the AI community. Share your code{" "}
                <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-amber-300">{REFERRAL_CODE}</span>.
              </p>
            </div>
          </div>
          <button className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">
            Become an ambassador
          </button>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Doubt solving · live mentors</h2>
              <p className="text-sm text-zinc-500">Tap a mentor to start a live chat. Doubts are logged and resolved in-context.</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              3 online
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LIVE_MENTORS.map((m) => (
              <button
                key={m.id}
                onClick={() => askMentor(m.prompt)}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-violet-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}88)` }}
                  >
                    {m.name[0]}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-sm font-semibold">
                      {m.name}
                      <span className={`flex items-center gap-1 text-[10px] font-medium ${m.online ? "text-emerald-400" : "text-zinc-500"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${m.online ? "bg-emerald-400" : "bg-zinc-600"}`} />
                        {m.online ? "online" : "away"}
                      </span>
                    </div>
                    <div className="truncate text-xs text-zinc-500">{m.specialty}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-violet-400 opacity-0 transition group-hover:opacity-100">
                  Start live chat <ArrowRight className="h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section id="today" className="card-glow rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] to-transparent p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500">
                    <Rocket className="h-6 w-6 text-white" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-violet-500/15 px-2.5 py-0.5 text-xs font-semibold text-violet-300">
                        CLAUDE challenge · IST day {today.day}
                      </span>
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                        {today.level === "advanced" ? "Advanced" : "Core"} · ~{today.minutes} min
                      </span>
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                        Day {today.day} of {CURRENT_DAY}
                      </span>
                    </div>
                    <h2 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-2xl">
                      {today.title}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400">
                  <Flame className="h-4 w-4" />
                  {profile.streak} · max {profile.longestStreak}
                </div>
              </div>

              <TaskView node={today} />

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ["Repo public", "URL returns 200, cloneable", "done"],
                  ["Live demo", "Reachable from another browser", "done"],
                  ["PROMPTS.md", "Prompt story in the repo", "done"],
                ].map(([t, sub, state]) => (
                  <div key={t} className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3">
                    <Check className={`mt-0.5 h-4 w-4 ${state === "done" ? "text-emerald-400" : "text-zinc-600"}`} />
                    <div>
                      <div className="text-sm font-medium">{t}</div>
                      <div className="text-xs text-zinc-500">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {completedToday ? (
                  <div className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-500/15 px-6 py-3.5 font-semibold text-emerald-400">
                    <Trophy className="h-5 w-5" />
                    Day 60 complete — you graduated
                  </div>
                ) : (
                  <button
                    onClick={completeToday}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    <Check className="h-5 w-5" />
                    Mark complete & ship v1.0.0
                  </button>
                )}
                <button
                  onClick={() => askMentor("Give me a hint for Day 60 — I need to ship v1.0.0.")}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
                >
                  <Sparkles className="h-4 w-4 text-violet-400" />
                  Ask the mentor
                </button>
                <button
                  onClick={askCatchUp}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-6 py-3.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20"
                >
                  <Bolt className="h-4 w-4" />
                  Catch-up plan
                </button>
              </div>
            </section>

            <JourneyPath />

            <section className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5 sm:p-6">
              <h2 className="text-lg font-semibold tracking-tight">Recent activity · last 7 submissions</h2>
              <p className="text-sm text-zinc-500">Every submission, logged to memory.</p>
              <div className="mt-4 space-y-2.5">
                {RECENT_SUBMISSIONS.map((s) => (
                  <div
                    key={s.day}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                        <Check className="h-4 w-4 text-emerald-400" />
                      </span>
                      <div>
                        <div className="text-sm font-medium">
                          Day {s.day} · {s.title}
                        </div>
                        <div className="text-xs text-zinc-500">completed on {s.date}</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                      {s.outcome}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="flex min-h-[520px] flex-col">
            <MentorChat />
          </div>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Community · this week’s ships</h2>
              <p className="text-sm text-zinc-500">Vote on Day-N builds from your cohort.</p>
            </div>
            <Link href="/" className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {posts.map((p) => (
              <button
                key={p.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-violet-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                    Day {p.day} · {p.tag}
                  </span>
                  <Message className="h-4 w-4 text-zinc-600 transition group-hover:text-violet-400" />
                </div>
                <h3 className="mt-3 font-medium leading-snug">{p.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{p.author}</span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-amber-400">
                    <Trophy className="h-3.5 w-3.5" />
                    {p.votes}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm text-zinc-500 sm:flex-row sm:px-6">
          <span>ABTalks · Redesigned — a hackathon rebuild, vibe-coded.</span>
          <span className="text-zinc-600">Memory layer: local store (Breeth-ready provider) · synced</span>
        </div>
      </footer>

      <MobileNav active="dash" />
    </div>
  );
}
