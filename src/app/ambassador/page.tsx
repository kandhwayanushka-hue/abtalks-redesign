"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { MobileNav } from "@/components/day/ChallengeDay";
import { getUser } from "@/lib/auth";
import { remember } from "@/lib/memory";
import { CheckCircle, Rocket, Users } from "@/components/icons";

export default function AmbassadorPage() {
  const [user] = useState(() => getUser());
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    college: "",
    linkedin: "",
    why: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, code: "HET9HA" }),
      });
    } catch {
      /* offline — memory still records below */
    }
    remember("milestone", "ambassador-applied", `${form.name} · ${form.college} · ${new Date().toISOString()}`);
    setSubmitting(false);
    setDone(true);
  }

  const input =
    "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-violet-500/50";
  const label = "text-xs font-medium uppercase tracking-widest text-zinc-500";

  if (done) {
    return (
      <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
        <div className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="mx-auto w-full max-w-md text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle className="h-8 w-8 text-emerald-400" />
            </span>
            <h1 className="mt-6 font-serif text-4xl tracking-tight">You’re on the list.</h1>
            <p className="mx-auto mt-4 max-w-sm text-zinc-400">
              Thanks {form.name || "future ambassador"} — your application for {form.college || "your college"} is
              with us. We’ll reach out at {form.email || "your email"} when the ambassador round opens.
            </p>
            <p className="mt-3 text-xs text-zinc-600">
              Referral code <span className="font-mono text-amber-400">HET9HA</span> — start inviting friends now.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/profile"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
              >
                View my profile
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
        <MobileNav active="home" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">
              ABTalks <span className="text-zinc-500">·</span>{" "}
              <span className="text-gradient">Ambassador</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:flex" />
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Your challenge
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
              <Users className="h-3.5 w-3.5 text-amber-400" />
              Campus ambassador program
            </span>
            <h1 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Lead your campus on ABTalks.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              Bring your college into the challenge, earn perks for every friend you onboard, and turn
              your referral momentum into a real community — with the mentor tracking all of it.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Exclusive ambassador perks & swag",
                "Track your referrals on your profile",
                "Early access to new challenges",
                "A public page recruiters can find",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-zinc-200">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <Rocket className="h-5 w-5 shrink-0 text-violet-400" />
              <p className="text-sm text-zinc-400">
                Referral code <span className="font-mono font-semibold text-amber-400">HET9HA</span> —
                start sharing it before your application is even reviewed.
              </p>
            </div>
          </div>

          <form
            onSubmit={submit}
            className="card-glow rounded-3xl border border-white/5 bg-white/[0.02] p-8"
          >
            <h2 className="font-serif text-2xl tracking-tight">Apply to represent your campus</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label className={label} htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={`${input} mt-1.5`}
                  placeholder="Anushka Kandhway"
                />
              </div>
              <div>
                <label className={label} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={`${input} mt-1.5`}
                  placeholder="you@college.ac.in"
                />
              </div>
              <div>
                <label className={label} htmlFor="college">
                  College
                </label>
                <input
                  id="college"
                  required
                  value={form.college}
                  onChange={(e) => set("college", e.target.value)}
                  className={`${input} mt-1.5`}
                  placeholder="ABES Engineering College"
                />
              </div>
              <div>
                <label className={label} htmlFor="linkedin">
                  LinkedIn / Instagram
                </label>
                <input
                  id="linkedin"
                  value={form.linkedin}
                  onChange={(e) => set("linkedin", e.target.value)}
                  className={`${input} mt-1.5`}
                  placeholder="linkedin.com/in/you"
                />
              </div>
              <div>
                <label className={label} htmlFor="why">
                  Why you?
                </label>
                <textarea
                  id="why"
                  rows={3}
                  value={form.why}
                  onChange={(e) => set("why", e.target.value)}
                  className={`${input} mt-1.5 resize-none`}
                  placeholder="Two lines on why your campus would show up for this."
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Submit application"}
            </button>
            <p className="mt-4 text-center text-xs text-zinc-600">
              Logged to your memory profile — swap one provider and it reaches a real backend.
            </p>
          </form>
        </div>
      </main>

      <MobileNav active="home" />
    </div>
  );
}
