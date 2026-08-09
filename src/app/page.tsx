"use client";

import Link from "next/link";
import { MobileNav } from "@/components/day/ChallengeDay";
import ThemeToggle from "@/components/ThemeToggle";
import TiltCard from "@/components/TiltCard";
import { CERTIFICATES } from "@/data/certificates";
import {
  ArrowRight,
  Bolt,
  Brain,
  Calendar,
  CheckCircle,
  Flame,
  GitBranch,
  Message,
  Rocket,
  Sparkles,
  Trophy,
  Users,
} from "@/components/icons";

const features = [
  {
    icon: Calendar,
    title: "One task, full focus",
    body: "No wall of text. Each day is a single card — objective, hint, submit. The rest of the platform gets out of the way.",
  },
  {
    icon: Brain,
    title: "A mentor that remembers",
    body: "Persistent memory across all 60 days. It knows what you struggled with in Week 2 and tailors today's hints to match.",
  },
  {
    icon: Rocket,
    title: "Submit → feedback → polish",
    body: "Paste your work, get an instant review against the real rubric, fix, re-submit. A loop that teaches, not just grades.",
  },
  {
    icon: Trophy,
    title: "A skill path, not a checklist",
    body: "Prompting, tools, agents, deployment — watch your actual skills light up as the 60 days unlock, not just boxes ticked.",
  },
  {
    icon: Message,
    title: "Community that ships",
    body: "A gallery of Day-N builds you can vote on. Solo grind, shared momentum. Catching up after a miss is one click away.",
  },
  {
    icon: GitBranch,
    title: "Graduation that means something",
    body: "Ship v1.0.0 with a release tag, a live URL, and a PROMPTS.md story. A portfolio you can actually point to.",
  },
];

const ticker = [
  ["60", "days in the challenge"],
  ["1", "day shipped on time"],
  ["13", "days open to catch up"],
  ["1", "mentor that remembers"],
  ["3", "certificates to earn"],
  ["v1.0.0", "graduation release"],
];

const faqs = [
  "Is purchasing a Claude subscription mandatory for this challenge?",
  "Do I need to create a Claude account?",
  "Where can I find the daily task?",
  "Will I receive daily tasks or teaching sessions?",
  "What if I miss a day's task?",
  "Will I receive goodies after completing the challenge?",
  "Who should I contact if I have an issue with a task?",
  "Is there any YouTube channel for the Claude Challenge?",
  "Will we explore different AI tools during the challenge?",
  "Can I use tools other than Claude for the challenge?",
];

const rules = [
  {
    num: "01",
    title: "Build something every day",
    body: "About an hour on today’s task. Small beats skipped — consistency is the skill you’re actually learning.",
  },
  {
    num: "02",
    title: "Push a GitHub commit",
    body: "Public proof of work. Your repo becomes your resume, and recruiters genuinely look at it.",
  },
  {
    num: "03",
    title: "Post on LinkedIn",
    body: "One short update a day. Visibility compounds exactly like your streak does.",
  },
];

const colleges = [
  "ABES Engineering College",
  "DTU Delhi",
  "VIT Vellore",
  "SRM Chennai",
  "NIT Warangal",
  "Manipal",
  "BIT Mesra",
  "COEP Pune",
];

const testimonials = [
  {
    quote:
      "I was stuck at Day 1 with a 0 streak and 59 missed days. The catch-up plan got me back to Day 14 in a week — the old site just said “Missed” and moved on.",
    name: "Ananya S.",
    college: "ABES Engineering College",
  },
  {
    quote:
      "Ten minutes on my phone after college, every night. The listen button reads my task while I’m on the bus. I don’t read, I just ship.",
    name: "Rahul V.",
    college: "SRM Chennai",
  },
  {
    quote:
      "The mentor remembered I struggled with prompts in week 2 and fixed its hints. That one feature kept me from quitting at Day 19.",
    name: "Meera K.",
    college: "VIT Vellore",
  },
];

const oldPain = [
  "A countdown that read '88 days' and never moved",
  "59 missed days with no way back in",
  "A calendar that shows misses but offers no plan",
  "A streak shown as a bare number",
  "No feedback on the one thing you submitted",
];

const newFix = [
  "One calm daily card — what to do, today",
  "A catch-up plan that turns misses into a sprint",
  "A journey map that teaches you your progress",
  "Streak as momentum, plus a mentor that nudges",
  "Reviews that say what to fix, not just 'done'",
];

const footerCols = [
  {
    title: "Challenge",
    links: [
      ["Start", "/login"],
      ["Content", "/content"],
      ["Certificates", "/certificates"],
      ["Mentor", "/mentor/general"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Interview practice", "/interview"],
      ["Live day", "/day/12"],
      ["Your challenge", "/dashboard"],
      ["PROMPTS.md", "https://github.com/kandhwayanushka-hue/abtalks-redesign/blob/master/PROMPTS.md"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Why this exists", "#why"],
      ["Features", "#features"],
      ["Memory layer", "#memory"],
      ["Become an ambassador", "#ambassador"],
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <nav className="fixed left-1/2 top-6 z-50 w-[95%] max-w-[672px] -translate-x-1/2">
        <div className="glass flex h-14 items-center justify-between rounded-full px-4 sm:px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
              A
            </span>
            <span className="font-serif text-sm tracking-tight">
              ABTalks <span className="text-zinc-500">·</span>{" "}
              <span className="text-gradient">Redesigned</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-widest text-zinc-400 md:flex">
            <a href="#why" className="transition hover:text-white">
              Why
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <Link href="/content" className="transition hover:text-white">
              Content
            </Link>
            <Link href="/login" className="transition hover:text-white">
              Sign in
            </Link>
          </nav>
          <div className="flex items-center gap-2.5">
            <ThemeToggle className="hidden sm:flex" />
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
            >
              Open your challenge
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="glow-grid absolute inset-0" />
        <div className="aurora-bg">
          <div
            className="aurora-blob -top-24 left-[6%] h-[500px] w-[500px] bg-violet-600/50"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="aurora-blob -top-20 right-[4%] h-[480px] w-[480px] bg-cyan-500/40"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="aurora-blob bottom-[-140px] left-[18%] h-[440px] w-[440px] bg-emerald-500/35"
            style={{ animationDelay: "-12s" }}
          />
          <div
            className="aurora-blob right-[16%] top-[42%] h-[380px] w-[380px] bg-violet-500/30"
            style={{ animationDelay: "-3s" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="float-3d preserve-3d glass absolute left-[5%] top-[30%] rounded-xl px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Flame className="h-4 w-4 text-amber-400 [transform:translateZ(30px)]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 [transform:translateZ(20px)]">
                Streak 7 · longest 13
              </span>
            </div>
          </div>
          <div
            className="float-3d preserve-3d glass absolute right-[3%] top-[44%] rounded-xl px-4 py-3"
            style={{ animationDelay: "-2s" }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-amber-300 [transform:translateZ(30px)]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 [transform:translateZ(20px)]">
                Certificate · Part 1 unlocked
              </span>
            </div>
          </div>
          <div
            className="float-3d preserve-3d glass absolute left-[11%] top-[68%] rounded-xl px-4 py-3"
            style={{ animationDelay: "-4s" }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Rocket className="h-4 w-4 text-emerald-400 [transform:translateZ(30px)]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 [transform:translateZ(20px)]">
                v1.0.0 shipped
              </span>
            </div>
          </div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-36 sm:px-6 sm:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <span className="stagger inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              A redesign of the platform you’re standing on
            </span>
            <h1 className="stagger stagger-1 mt-8 font-serif text-5xl font-normal leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              The challenge platform
              <br />
              <span className="shimmer-text">that remembers you.</span>
            </h1>
            <p className="stagger stagger-2 mx-auto mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">
              ABTalks, reimagined: one task a day, an AI mentor that remembers
              every day you’ve shipped, and a skill path that shows you what you
              actually learned — not just boxes ticked.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login" className="shiny-btn group w-full sm:w-auto">
                <span className="flex w-full items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white transition group-hover:brightness-125 sm:w-auto">
                  Start your challenge
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
              <a
                href="#features"
                className="stagger stagger-3 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:text-white sm:w-auto"
              >
                See what changed
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker border-y border-white/5 bg-black/40">
        <div className="ticker-track py-4">
          {[...ticker, ...ticker].map(([num, label], i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {label}
              </span>
              <span className="font-mono text-base text-zinc-100">{num}</span>
              <span className="h-1 w-1 rounded-full bg-violet-500" />
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              What actually changed
            </span>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              Every form became a coach.
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Every piece of the old dashboard was a form. Every piece of this
              one is a coach.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <TiltCard
                key={f.title}
                className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition hover:border-violet-500/40 hover:bg-white/[0.04]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 [transform:translateZ(24px)]">
                  <f.icon className="h-6 w-6 text-violet-400 transition group-hover:scale-110 group-hover:rotate-3" />
                </span>
                <h3 className="mt-5 font-serif text-xl tracking-tight [transform:translateZ(16px)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400 [transform:translateZ(12px)]">
                  {f.body}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              How it works
            </span>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              Three steps to your first streak
            </h2>
            <p className="mx-auto mt-4 max-w-md text-zinc-400">
              Built for your phone, late at night after college. Ten minutes a day, proof you can show.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Bolt,
                step: "01",
                title: "Pick a track",
                body: "Choose a 60-day challenge — prompting, agents, deployment, portfolio. One track, one skill at a time.",
              },
              {
                icon: GitBranch,
                step: "02",
                title: "Build & submit daily",
                body: "Every day, build something small. Push a GitHub commit and post on LinkedIn — that’s your proof of work.",
              },
              {
                icon: Rocket,
                step: "03",
                title: "Streak grows, you get noticed",
                body: "Consistency compounds. Miss a day? Catch up instead of quitting. Recruiters see your public streak.",
              },
            ].map((s) => (
              <TiltCard
                key={s.step}
                className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-8"
              >
                <span className="absolute right-6 top-5 font-serif text-4xl text-white/5">{s.step}</span>
                <s.icon className="h-6 w-6 text-violet-400 [transform:translateZ(24px)]" />
                <h3 className="mt-5 font-serif text-xl tracking-tight [transform:translateZ(16px)]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400 [transform:translateZ(12px)]">{s.body}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                The syllabus
              </span>
              <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
                60 days, three parts, three certificates
              </h2>
            </div>
            <p className="max-w-sm text-sm text-zinc-500">
              Each part is rated by overall difficulty. Finish a part — 20 days — and a
              Certificate of Achievement unlocks.
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {CERTIFICATES.map((c) => (
              <TiltCard
                key={c.part}
                className="relative flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-8 transition hover:border-violet-500/40"
              >
                <Link
                  href={`/challenge/${c.start}`}
                  aria-label={`Open ${c.title} — Days ${c.start} to ${c.end} challenges`}
                  className="absolute inset-0 z-[1] rounded-3xl"
                >
                  <span className="sr-only">Open challenges</span>
                </Link>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                    Part {c.part}
                  </span>
                  <span className="flex items-center gap-0.5" aria-label={`${c.difficulty} difficulty`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`h-1.5 w-3 rounded-full ${s <= c.stars ? "bg-violet-400" : "bg-white/10"}`}
                      />
                    ))}
                  </span>
                </div>
                <h3 className="relative z-[2] mt-4 font-serif text-xl tracking-tight [transform:translateZ(16px)]">
                  <Link
                    href={`/challenge/${c.start}`}
                    className="transition group-hover:text-violet-300 group-hover:underline"
                  >
                    {c.title}
                  </Link>
                </h3>
                <div className="relative z-[2] mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                  Days {c.start}–{c.end} ·{" "}
                  <span className="text-zinc-300">{c.difficulty}</span>
                </div>
                <p className="relative z-[2] mt-3 text-sm leading-relaxed text-zinc-400">{c.blurb}</p>
                <div className="relative z-[2] mt-5 flex flex-wrap gap-1.5">
                  {c.skills.map((sk) => (
                    <span key={sk} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                      {sk}
                    </span>
                  ))}
                </div>
                <div className="relative z-[2] mt-auto pt-6">
                  <Link
                    href={`/certificate/${c.part}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20"
                  >
                    <Trophy className="h-4 w-4" />
                    Certificate of Achievement · Day {c.day}
                  </Link>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                The rules
              </span>
              <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
                Three rules. That’s the whole challenge.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-zinc-500">
              No sign-up maze, no syllabus. Do this daily and the streak takes care of itself.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {rules.map((r) => (
              <TiltCard key={r.num} className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8">
                <span className="absolute -right-2 -top-6 font-serif text-7xl text-white/5">{r.num}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-400">Rule {r.num}</span>
                <h3 className="mt-3 font-serif text-xl tracking-tight [transform:translateZ(16px)]">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400 [transform:translateZ(12px)]">{r.body}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="card-glow relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-600/20 via-zinc-900 to-cyan-600/10 p-8 text-center sm:p-12">
            <div className="aurora-bg">
              <div className="aurora-blob -right-20 -top-24 h-[300px] w-[300px] bg-violet-600/40" />
              <div className="aurora-blob -bottom-24 -left-16 h-[300px] w-[300px] bg-cyan-500/30" />
            </div>
            <div className="relative">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
                <Rocket className="h-3.5 w-3.5 text-violet-400" />
                Publicly commit — make it real
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl font-serif text-4xl tracking-tight sm:text-5xl">
                Telling people is the first streak.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                The most reliable accountability trick in the book: announce it. Share your challenge on
                LinkedIn, copy your referral code, and tomorrow you’ll feel the difference.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/commit" className="shiny-btn group w-full sm:w-auto">
                  <span className="flex w-full items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white transition group-hover:brightness-125 sm:w-auto">
                    Commit publicly
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText("HET9HA");
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 sm:w-auto"
                >
                  Copy referral code · HET9HA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Students, not statistics
            </span>
            <h2 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
              What students say after a few weeks
            </h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <TiltCard
                key={t.name}
                className="flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-8"
              >
                <blockquote className="flex-1 font-serif text-lg leading-relaxed text-zinc-200 [transform:translateZ(12px)]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/5 pt-4">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.college}</div>
                </figcaption>
              </TiltCard>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Students already shipping from
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {colleges.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-400"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">
              Before — the checklist
            </span>
            <ul className="mt-6 space-y-4">
              {oldPain.map((p) => (
                <li key={p} className="flex items-start gap-3 text-zinc-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/70" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-glow rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] to-transparent p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
              After — the mentor
            </span>
            <ul className="mt-6 space-y-4">
              {newFix.map((p) => (
                <li key={p} className="flex items-start gap-3 text-zinc-200">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="memory" className="border-t border-white/5 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
              <Brain className="h-3.5 w-3.5 text-violet-400" />
              The memory layer
            </span>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Your journey, remembered.
              <br />
              Every session, every day.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              The mentor doesn’t start fresh each morning. A persistent memory
              layer stores your struggles, strengths, and feedback across all 60
              days — so Day 40 hints know about Day 8 wins. The demo runs on a
              zero-credential local store; swap one provider and it plugs into a
              real memory server (Breeth-compatible API/MCP), no other code
              changes.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Remembers weak spots and tunes every hint",
                "Feedback from reviews is stored, not lost",
                "Progress reads like a story, not a CSV",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-zinc-200">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Try the mentor
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="code-window overflow-hidden rounded-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/40" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/40" />
                <span className="h-3 w-3 rounded-full bg-green-500/40" />
              </div>
              <span className="font-mono text-xs text-zinc-500">memory.ts</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                synced
              </span>
            </div>
            <pre className="scrollbar-thin overflow-x-auto p-5 font-mono text-sm leading-relaxed">
              <code>
                <span className="code-k">const</span> memory = <span className="code-k">await</span>{" "}
                sync(<span className="code-s">{"\"breeth://mentor\""}</span>);
                {"\n"}
                memory.<span className="code-cn">remember</span>({"{"}
                {"\n  "}day: <span className="code-s">{"\"day-12\""}</span>,{"\n  "}strength:{" "}
                <span className="code-s">{"\"prompting\""}</span>,{"\n  "}struggle:{" "}
                <span className="code-s">{"\"deployment\""}</span>,{"\n"}
                {"}"});
                {"\n"}
                <span className="code-c">{"// Day 40 hints now know about Day 8 wins."}</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section id="ambassador" className="border-t border-white/5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
              <Users className="h-3.5 w-3.5 text-amber-400" />
              Grow with ABTalks
            </span>
            <h2 className="mt-6 font-serif text-4xl tracking-tight sm:text-5xl">
              Want to be a campus ambassador for your college?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              Lead your campus on ABTalks, earn perks, and help build the AI
              community around you. Bring people in with your referral code,
              track it on your challenge page, and turn every friend you onboard
              into momentum for your own streak.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200">
                Become an ambassador
              </button>
              <a
                href="https://www.youtube.com/results?search_query=ABTalks+on+AI"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10"
              >
                Watch ABTalks on AI
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl tracking-tight">Frequently asked questions</h2>
            <p className="mt-2 text-zinc-500">The real ones, answered where you already are.</p>
            <div className="mt-6 space-y-2.5">
              {faqs.map((q, i) => (
                <details
                  key={q}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-violet-500/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-zinc-200">
                    {q}
                    <span className="text-zinc-500 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                    {i % 2 === 0
                      ? "Ask your mentor — it remembers your challenge and can answer in context. For anything account-related, the WhatsApp community and support are one tap away from your challenge page."
                      : "Not automatically. Your mentor tailors the answer to your day, your streak, and where you are in the journey — and it’s logged to memory so you never re-ask the same thing twice."}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
            One day left. One task. Graduation.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            The redesigned challenge is live — walk in, ask the mentor, ship
            v1.0.0.
          </p>
          <Link
            href="/dashboard"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200"
          >
            Start your challenge
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <footer className="footer-dark border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-xs font-bold text-white">
                  A
                </span>
                <span className="font-serif text-lg tracking-tight">ABTalks</span>
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
                A hackathon rebuild, vibe-coded. The challenge platform that
                remembers you — one task a day, a mentor, a certificate.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-zinc-400 transition hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6">
            <span>© 2026 ABTalks · Redesigned</span>
            <span className="flex items-center gap-2 font-mono uppercase tracking-[0.2em] text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              All Systems Operational
            </span>
          </div>
        </div>
      </footer>

      <MobileNav active="home" />
    </div>
  );
}
