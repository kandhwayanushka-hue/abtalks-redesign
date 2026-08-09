"use client";

import Link from "next/link";
import { ArrowLeft, Lock, Print } from "@/components/icons";
import { getProfile } from "@/lib/memory";
import { CERTIFICATES, type CertificateDef } from "@/data/certificates";

export default function CertificateView({ part }: { part: number }) {
  const cert = CERTIFICATES.find((c) => c.part === part) as CertificateDef;
  const profile = getProfile();
  const name = profile.name?.trim() || "Student";
  const unlocked = profile.currentDay >= cert.day;
  const progress = Math.min(Math.round((profile.currentDay / cert.day) * 100), 100);
  const date = profile.startDate || "5 Jun 2026";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="no-print sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link
              href={unlocked ? "/certificates" : "/"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <span className="text-sm font-semibold tracking-tight">
              Certificate <span className="text-gradient">· Part {part}</span>
            </span>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            <Print className="h-4 w-4" />
            Print / save PDF
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-10">
        {unlocked ? (
          <div className="print-sheet mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-[#faf7f0] p-8 text-zinc-900 shadow-2xl sm:p-12">
            <div className="rounded-2xl border-[3px] border-double border-amber-400/80 p-2">
              <div className="rounded-xl border border-amber-300/70 px-6 py-10 text-center sm:px-12">
                <div className="flex items-center justify-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-lg font-bold text-white">
                    A
                  </span>
                  <span className="text-xl font-semibold tracking-tight">ABTalks</span>
                </div>
                <p className="mt-1 text-xs tracking-wide text-zinc-500">
                  60-Day Challenge on AI · Build your coding habit. Get discovered.
                </p>

                <div className="mx-auto mt-8 h-0.5 w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                <h1 className="mt-6 text-3xl font-bold uppercase tracking-[0.2em] sm:text-4xl">
                  Certificate of Achievement
                </h1>
                <div className="mx-auto mt-3 h-0.5 w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

                <p className="mt-8 text-sm text-zinc-600">This is proudly presented to</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-amber-700 sm:text-4xl">
                  {name}
                </p>

                <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-zinc-600">
                  for successfully completing{" "}
                  <span className="font-semibold text-zinc-800">Part {cert.part}</span> — Days{" "}
                  {cert.start}–{cert.end} ·{" "}
                  <span className="font-semibold text-zinc-800">{cert.title}</span> of the 60-Day
                  ABTalks Challenge on AI, a{" "}
                  <span className="font-semibold text-zinc-800">{cert.difficulty}</span>-difficulty
                  module spanning {cert.skills.join(", ")}.
                </p>

                <div className="mt-8 flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={`h-1.5 w-6 rounded-full ${s <= cert.stars ? "bg-amber-500" : "bg-zinc-200"}`}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-zinc-500">overall difficulty rating</p>

                <div className="mt-10 flex items-end justify-between gap-6">
                  <div className="text-left">
                    <div className="border-t border-zinc-400 pt-2">
                      <div className="text-sm font-semibold">Aura</div>
                      <div className="text-xs text-zinc-500">Live Mentor</div>
                    </div>
                  </div>
                  <span className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-amber-600/70 text-amber-700">
                    <span className="text-2xl font-bold leading-none">A</span>
                    <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest">
                      ABTalks
                    </span>
                    <span className="text-[8px] font-semibold uppercase tracking-widest">Seal</span>
                  </span>
                  <div className="text-right">
                    <div className="border-t border-zinc-400 pt-2">
                      <div className="text-sm font-semibold">ABTalks Community</div>
                      <div className="text-xs text-zinc-500">Issued · {date}</div>
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-[10px] tracking-wide text-zinc-400">
                  Certificate No. ABT-2026-{String(part).padStart(2, "0")}-{profile.referralCode || "HET9HA"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
              <Lock className="h-6 w-6 text-zinc-500" />
            </span>
            <h1 className="mt-5 text-xl font-semibold tracking-tight">
              Part {cert.part} certificate is locked
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              Finish through Day {cert.day} — {cert.title} — and your Certificate of Achievement
              unlocks here.
            </p>
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Day {profile.currentDay} of {cert.day}</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <Link
              href="/challenge/60"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Back to the challenge
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
