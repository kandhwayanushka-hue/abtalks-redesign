"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { MobileNav } from "@/components/day/ChallengeDay";
import { initials, getUser, clearUser } from "@/lib/auth";
import { getProfile, getMemory, type LearnerProfile } from "@/lib/memory";
import { CERTIFICATES } from "@/data/certificates";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Flame,
  Gift,
  Mail,
  MapPin,
  Rocket,
  Trophy,
  Users,
} from "@/components/icons";

export default function ProfilePage() {
  const router = useRouter();
  const [user] = useState(() => getUser());
  const [profile] = useState<LearnerProfile | null>(() => getProfile());

  if (!profile) return null;

  const name = user?.name ?? profile.name ?? "Student";
  const email = user?.email ?? "student@abes.ac.in";
  const joined = user?.joinedAt ? new Date(user.joinedAt) : null;
  const joinedLabel = joined
    ? joined.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "5 Jun 2026";
  const earned = CERTIFICATES.filter((c) => profile.currentDay >= c.day);
  const nextCert = CERTIFICATES.find((c) => profile.currentDay < c.day);
  const dayPct = Math.min(100, Math.round((profile.currentDay / 60) * 100));
  const milestones = getMemory().filter((e) => e.kind === "milestone");
  const shipped = Math.max(0, profile.completed);

  function signOut() {
    clearUser();
    router.push("/");
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
              <span className="text-gradient">Profile</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle className="hidden sm:flex" />
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Your challenge
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="card-glow rounded-3xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-2xl font-bold text-white">
                  {initials(name)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-serif text-3xl tracking-tight">{name}</h1>
                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-violet-300">
                      {user?.provider === "google" ? "Google" : "Solo"} learner
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      {email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      ABES Engineering College
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" />
                      Joined {joinedLabel}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={signOut}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/10"
                  >
                    Sign out
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["Current day", `${profile.currentDay}`, "of 60"],
                  ["Streak", `${profile.streak}`, `max ${profile.longestStreak}`],
                  ["Days shipped", `${shipped}`, "with proof"],
                  ["Referrals", `${profile.referrals}`, `code ${profile.referralCode}`],
                ].map(([label, val, sub]) => (
                  <div key={label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                      {label}
                    </div>
                    <div className="mt-1 font-serif text-2xl tracking-tight text-white">{val}</div>
                    <div className="text-xs text-zinc-500">{sub}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-400">Journey progress</span>
                  <span className="font-mono text-xs text-violet-400">{dayPct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all"
                    style={{ width: `${dayPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Brain className="h-4 w-4 text-violet-400" />
                  Memory snapshot
                </div>
                <ul className="mt-4 space-y-3">
                  {profile.strengths.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                      Strength: {s}
                    </li>
                  ))}
                  {profile.struggleAreas.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/70" />
                      Working on: {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2 text-xs text-zinc-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {milestones.length} milestone{milestones.length === 1 ? "" : "s"} remembered
                </div>
              </div>

              <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Gift className="h-4 w-4 text-amber-400" />
                  Your referral code
                </div>
                <p className="mt-3 text-sm text-zinc-500">
                  Share it with friends — every onboarded friend adds momentum to your own streak.
                </p>
                <button
                  onClick={() => navigator.clipboard?.writeText(profile.referralCode)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 font-mono text-sm font-semibold tracking-widest text-amber-300 transition hover:bg-amber-500/20"
                >
                  {profile.referralCode}
                </button>
                <Link
                  href="/ambassador"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/10"
                >
                  Become an ambassador
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Trophy className="h-4 w-4 text-amber-400" />
                Certificates
              </div>
              <div className="mt-4 space-y-3">
                {CERTIFICATES.map((c) => {
                  const isEarned = earned.includes(c);
                  return (
                    <Link
                      key={c.part}
                      href={`/certificate/${c.part}`}
                      className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition hover:border-violet-500/30"
                    >
                      {isEarned ? (
                        <CheckCircle className="h-5 w-5 shrink-0 text-emerald-400" />
                      ) : (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 text-[10px] text-zinc-500">
                          {c.part}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-zinc-200">{c.title}</div>
                        <div className="text-xs text-zinc-500">
                          Day {c.day} · {isEarned ? "Earned" : c.difficulty}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {nextCert && (
                <div className="mt-4 rounded-xl bg-violet-500/10 px-4 py-3 text-xs text-zinc-400">
                  Next unlock: <span className="font-semibold text-violet-300">{nextCert.title}</span> at Day{" "}
                  {nextCert.day} ({Math.max(0, nextCert.day - profile.currentDay)} day
                  {Math.max(0, nextCert.day - profile.currentDay) === 1 ? "" : "s"} to go).
                </div>
              )}
            </div>

            <Link
              href="/interview"
              className="group mt-4 flex items-center justify-between rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-violet-500/30"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Rocket className="h-4 w-4 text-emerald-400" />
                  Interview practice
                </div>
                <p className="mt-1 text-xs text-zinc-500">Recruiter-persona drill. 4 questions, scored.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:translate-x-0.5" />
            </Link>

            <div className="mt-4 flex items-center gap-3 rounded-3xl border border-white/5 bg-white/[0.02] p-6">
              <Flame className="h-6 w-6 text-amber-400" />
              <div className="text-sm text-zinc-400">
                <span className="font-semibold text-zinc-100">Keep the streak alive.</span> One task, one
                commit, one post — today.
              </div>
            </div>
          </div>
        </div>
      </main>

      <MobileNav active="dash" />
    </div>
  );
}
