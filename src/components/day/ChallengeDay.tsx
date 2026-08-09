"use client";

import { useState } from "react";
import Link from "next/link";
import { JOURNEY, CURRENT_DAY, skillColor } from "@/data/journey";
import { dayBuild } from "@/lib/visual";
import TaskView from "@/components/dashboard/TaskView";
import DaySwitcher from "@/components/content/DaySwitcher";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle,
  Flame,
  GitBranch,
  Message,
  Rocket,
  Sparkles,
  Trophy,
} from "@/components/icons";
import { getProfile, getSubmission, remember, saveSubmission } from "@/lib/memory";

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" width={20} height={20}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function ChallengeDay({ day, totalDays }: { day: number; totalDays: number }) {
  const node = JOURNEY.find((d) => d.day === day)!;
  const profile = getProfile();
  const existing = getSubmission(day);
  const [github, setGithub] = useState(existing?.github ?? "");
  const [linkedin, setLinkedin] = useState(existing?.linkedin ?? "");
  const [note, setNote] = useState(existing?.note ?? "");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState<null | typeof existing>(existing);

  const color = skillColor(node.skill);
  const plan = dayBuild(node);
  const isFuture = day > totalDays;
  const isMissed = day < totalDays && day !== 1;
  const isToday = day === totalDays;

  async function handleSubmit() {
    setError("");
    const g = github.trim();
    const l = linkedin.trim();
    if (!g && !l) {
      setError("Add at least a GitHub commit link or a LinkedIn post link — that's your proof of work.");
      return;
    }
    const sub = { day, github: g, linkedin: l, note: note.trim(), ts: Date.now() };
    saveSubmission(sub);
    try {
      await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
    } catch {
      /* offline — submission is already saved to memory */
    }
    remember("submission", `day-${day}`, `github:${g || "none"} linkedin:${l || "none"}`);
    remember("milestone", `day-${day}-submitted`, `Submitted on ${new Date().toISOString()}`);
    setSubmitted(sub);
  }

  const statusBadge = isToday
    ? { label: "Today", cls: "bg-violet-500/15 text-violet-300" }
    : isFuture
      ? { label: "Future", cls: "bg-white/10 text-zinc-400" }
      : submitted
        ? { label: "On time", cls: "bg-emerald-500/15 text-emerald-400" }
        : isMissed
          ? { label: "Missed · catch up", cls: "bg-amber-500/15 text-amber-400" }
          : { label: "On time", cls: "bg-emerald-500/15 text-emerald-400" };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
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
                ABTalks <span className="text-gradient">Redesigned</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm font-semibold text-amber-400">
            <Flame className="h-4 w-4" />
            {profile.streak} · max {profile.longestStreak}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 pb-24">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-500/15 px-2.5 py-0.5 text-xs font-semibold text-violet-300">
              Day {day} of {totalDays}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge.cls}`}>
              {statusBadge.label}
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {node.level === "advanced" ? "Advanced" : "Core"} · ~{node.minutes} min
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">{node.title}</h1>
        <p className="mt-1.5 text-sm text-zinc-500">
          CLAUDE challenge · IST day {day} · {node.blurb}
        </p>

        <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-3">
          <DaySwitcher current={day} />
        </div>

        {isFuture && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
            This day unlocks once you finish the days before it. Keep the streak alive and it’ll open.
          </div>
        )}

        {isMissed && !submitted && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
            <Flame className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <div className="text-sm text-amber-200">
              <span className="font-semibold">You missed this day — but you can still catch up.</span>{" "}
              Submit today and it counts as on time. The old dashboard just showed “Missed” and moved on.
            </div>
          </div>
        )}

        <div className="mt-5 rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
          <TaskView node={node} />
        </div>

        <section className="mt-5 rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
          <div className="flex items-center gap-2">
            <Rocket className="h-4 w-4 text-violet-400" />
            <h2 className="font-semibold tracking-tight">What you’ll build today</h2>
          </div>
          <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm leading-relaxed text-zinc-300">
            {plan.deliverable}
          </p>
          <ul className="mt-4 space-y-2.5">
            {plan.checklist.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-zinc-400">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {c}
              </li>
            ))}
          </ul>
          <details className="group mt-4">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              Stuck? Get a hint
              <span className="ml-auto text-zinc-500 transition group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-3 rounded-xl bg-violet-500/10 px-4 py-3 text-sm leading-relaxed text-zinc-300">
              {plan.example}
            </p>
          </details>
        </section>

        <section className="mt-5 rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] to-transparent p-5">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <h2 className="font-semibold tracking-tight">Submit proof of work</h2>
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">
            Two things keep your streak: a GitHub commit and a LinkedIn post. Paste the links below.
          </p>

          {submitted ? (
            <div className="mt-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2 font-semibold text-emerald-400">
                <Trophy className="h-5 w-5" />
                Submitted for Day {day} — streak updated
              </div>
              <div className="mt-3 space-y-2 text-sm">
                {submitted.github && (
                  <a
                    href={submitted.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 break-all rounded-lg bg-white/5 px-3 py-2 text-zinc-300 underline-offset-2 hover:underline"
                  >
                    <GitBranch className="h-4 w-4 shrink-0 text-emerald-400" />
                    {submitted.github}
                  </a>
                )}
                {submitted.linkedin && (
                  <a
                    href={submitted.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 break-all rounded-lg bg-white/5 px-3 py-2 text-zinc-300 underline-offset-2 hover:underline"
                  >
                    <Linkedin className="h-4 w-4 shrink-0 text-blue-400" />
                    {submitted.linkedin}
                  </a>
                )}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
                <Message className="h-3.5 w-3.5" />
                {submitted.note || "No note added."}
              </div>
            </div>
          ) : (
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                  <GitBranch className="h-3.5 w-3.5" /> GitHub repository / commit URL
                </span>
                <input
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/you/day-12"
                  inputMode="url"
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn post URL
                </span>
                <input
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/posts/you/day-12"
                  inputMode="url"
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                  <Message className="h-3.5 w-3.5" /> What did you build? (optional)
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="One or two lines so your mentor remembers what you shipped…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none"
                />
              </label>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                <Check className="h-5 w-5" />
                Submit & keep the streak alive
              </button>
            </form>
          )}
        </section>

        <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-zinc-500">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          This submission is logged to your memory — the mentor will reference it tomorrow.
        </div>
      </main>

      <MobileNav active="day" />
    </div>
  );
}

export function MobileNav({ active }: { active: "home" | "dash" | "day" | "content" }) {
  const items = [
    { id: "home" as const, label: "Home", href: "/" },
    { id: "dash" as const, label: "Your challenge", href: "/dashboard" },
    { id: "content" as const, label: "Content", href: "/content" },
    { id: "day" as const, label: "Today", href: `/day/${CURRENT_DAY}` },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-1.5">
        {items.map((it) => (
          <Link
            key={it.id}
            href={it.href}
            className={`flex flex-col items-center gap-0.5 rounded-xl px-4 py-2 text-xs font-medium transition sm:px-5 ${
              active === it.id ? "text-violet-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {it.id === "home" && <Flame className="h-4 w-4" />}
            {it.id === "dash" && <GitBranch className="h-4 w-4" />}
            {it.id === "content" && <BookOpen className="h-4 w-4" />}
            {it.id === "day" && <Sparkles className="h-4 w-4" />}
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
