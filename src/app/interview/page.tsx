"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileNav } from "@/components/day/ChallengeDay";
import ThemeToggle from "@/components/ThemeToggle";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle,
  Message,
  Send,
  Sparkles,
} from "@/components/icons";
import { getProfile, remember } from "@/lib/memory";
import {
  TRACKS,
  evaluateAnswer,
  buildSummary,
  type AnswerResult,
  type InterviewTrack,
} from "@/lib/interviewer";

interface QResult {
  question: string;
  result: AnswerResult;
}

export default function InterviewPage() {
  const profile = getProfile();
  const [track, setTrack] = useState<InterviewTrack | null>(null);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState(false);
  const [results, setResults] = useState<QResult[]>([]);
  const [done, setDone] = useState(false);

  const question = track?.questions[step] ?? null;
  const summary = done ? buildSummary(results.map((r) => r.result)) : null;

  function start(t: InterviewTrack) {
    setTrack(t);
    setStep(0);
    setResults([]);
    setDone(false);
    setAnswer("");
    remember("milestone", "interview-started", `Started ${t.name} live interview on ${new Date().toISOString()}`);
  }

  function submit() {
    if (!track || !question || thinking) return;
    const trimmed = answer.trim();
    if (!trimmed) return;
    setThinking(true);
    window.setTimeout(() => {
      const result = evaluateAnswer(trimmed, question);
      const nextResults = [...results, { question: question.q, result }];
      setResults(nextResults);
      setThinking(false);
      setAnswer("");
      if (step + 1 >= track.questions.length) {
        setDone(true);
        remember("skill", "interview", nextResults.map((r) => `Q:${r.result.score}/5`).join(", "));
        remember("milestone", "interview-finished", `Finished ${track.name} interview on ${new Date().toISOString()}`);
      } else {
        setStep(step + 1);
      }
    }, 800);
  }

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
                ABTalks <span className="text-zinc-500">·</span>{" "}
                <span className="text-gradient">Live interview</span>
              </span>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 pb-28">
        {!track && (
          <>
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15">
                <Brain className="h-7 w-7 text-violet-400" />
              </span>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Practice with a live interviewer
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
                Four questions, one mock interview, instant feedback. Pick a track — every answer is
                scored and logged to memory so your mentor can reference it.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {TRACKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => start(t)}
                  className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-violet-500/30 hover:bg-white/[0.05]"
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                  >
                    {t.name[0]}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      {t.name}
                      <span className="text-xs text-zinc-500">· 4 questions</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">{t.intro}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {track && !done && (
          <div className="flex flex-col">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/15 via-zinc-900 to-blue-600/10 p-4">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full text-base font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${track.color}, ${track.color}88)` }}
              >
                {track.name[0]}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">Recruiter · {track.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  live · question {step + 1} of {track.questions.length}
                </div>
              </div>
              <button
                onClick={() => setTrack(null)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition hover:bg-white/10 hover:text-zinc-200"
              >
                End
              </button>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all"
                style={{ width: `${((step + 1) / track.questions.length) * 100}%` }}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-violet-400">
                <Message className="h-3.5 w-3.5" />
                Question {step + 1}
              </div>
              <p className="mt-3 text-lg font-medium leading-relaxed">{question?.q}</p>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                placeholder="Answer as you would out loud — one paragraph is plenty…"
                className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none"
              />
              <button
                onClick={submit}
                disabled={!answer.trim() || thinking}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
                {thinking ? "Reviewing…" : "Submit answer"}
              </button>
            </div>

            {results.length > 0 && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  Feedback on your last answer
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {results[results.length - 1].result.feedback}
                </p>
                <div className="mt-3 flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`h-1.5 w-6 rounded-full ${s <= results[results.length - 1].result.score ? "bg-violet-400" : "bg-white/10"}`}
                    />
                  ))}
                  <span className="ml-1 text-xs text-zinc-500">
                    {results[results.length - 1].result.score}/5
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {track && done && summary && (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6">
            <div className="text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15">
                <Sparkles className="h-7 w-7 text-violet-400" />
              </span>
              <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                Interview complete, {profile.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {track.name} · average score {summary.score}/5
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {results.map((r, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">Q{i + 1}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span
                            key={s}
                            className={`h-1.5 w-3 rounded-full ${s <= r.result.score ? "bg-violet-400" : "bg-white/10"}`}
                          />
                        ))}
                      </span>
                      <span className="text-xs text-zinc-500">{r.result.score}/5</span>
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">{r.question}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-violet-500/25 bg-violet-500/10 p-4">
              <div className="text-sm font-semibold text-violet-200">Verdict</div>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">{summary.verdict}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
              {summary.strong.length > 0 && (
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-400">
                  Strong: {summary.strong.join(", ")}
                </span>
              )}
              {summary.weak.length > 0 && (
                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 font-medium text-amber-300">
                  Revisit: {summary.weak.join(", ")}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => start(track)}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Practice again
              </button>
              <Link
                href="/dashboard#mentor"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
              >
                Ask a mentor about it
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <MobileNav active="dash" />
    </div>
  );
}
