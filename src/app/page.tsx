"use client";

import Link from "next/link";
import { MobileNav } from "@/components/day/ChallengeDay";
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

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold tracking-tight">
              ABTalks <span className="text-zinc-500">·</span>{" "}
              <span className="text-gradient">Redesigned</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
            <a href="#why" className="transition hover:text-white">
              Why
            </a>
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#memory" className="transition hover:text-white">
              Memory
            </a>
            <Link href="/content" className="transition hover:text-white">
              Content
            </Link>
            <Link href="/login" className="transition hover:text-white">
              Sign in
            </Link>
          </nav>
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          >
                Open your challenge
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="glow-grid absolute inset-0" />
        <div className="aurora-bg">
          <div
            className="aurora-blob -top-24 left-[6%] h-[500px] w-[500px] bg-violet-600/50"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="aurora-blob -top-20 right-[4%] h-[480px] w-[480px] bg-blue-500/40"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="aurora-blob bottom-[-140px] left-[18%] h-[440px] w-[440px] bg-emerald-500/35"
            style={{ animationDelay: "-12s" }}
          />
          <div
            className="aurora-blob right-[16%] top-[42%] h-[380px] w-[380px] bg-pink-500/30"
            style={{ animationDelay: "-3s" }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              A redesign of the platform you’re standing on
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              The challenge platform
              <br />
              <span className="text-gradient">that remembers you.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
              ABTalks, reimagined: one task a day, an AI mentor that remembers
              every day you’ve shipped, and a skill path that shows you what you
              actually learned — not just boxes ticked.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto"
              >
                Start your challenge
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#features"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 sm:w-auto"
              >
                See what changed
              </a>
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              ["60", "days in the challenge"],
              ["1", "day shipped on time"],
              ["13", "days open to catch up"],
              ["1", "mentor that remembers"],
            ].map(([num, label]) => (
              <div key={label} className="bg-zinc-950 px-6 py-6 text-center">
                <div className="text-3xl font-semibold tracking-tight text-gradient">{num}</div>
                <div className="mt-1 text-sm text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How it works — 3 steps to your first streak
            </h2>
            <p className="mx-auto mt-3 max-w-md text-zinc-400">
              Built for your phone, late at night after college. Ten minutes a day, proof you can show.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
              <div key={s.step} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <span className="absolute right-5 top-5 text-3xl font-semibold text-white/5">{s.step}</span>
                <s.icon className="h-6 w-6 text-violet-400" />
                <h3 className="mt-4 font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                The syllabus
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                60 days, three parts, three certificates
              </h2>
            </div>
            <p className="max-w-sm text-sm text-zinc-500">
              Each part is rated by overall difficulty. Finish a part — 20 days — and a
              Certificate of Achievement unlocks.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {CERTIFICATES.map((c) => (
              <div
                key={c.part}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
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
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{c.title}</h3>
                <div className="mt-1 text-sm text-zinc-500">
                  Days {c.start}–{c.end} ·{" "}
                  <span className="text-zinc-300">{c.difficulty} difficulty</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{c.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.skills.map((sk) => (
                    <span key={sk} className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-zinc-300">
                      {sk}
                    </span>
                  ))}
                </div>
                <div className="mt-auto pt-5">
                  <Link
                    href={`/certificate/${c.part}`}
                    className="flex items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20"
                  >
                    <Trophy className="h-4 w-4" />
                    Certificate of Achievement · Day {c.day}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                The rules
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Three rules. That’s the whole challenge.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-zinc-500">
              No sign-up maze, no syllabus. Do this daily and the streak takes care of itself.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {rules.map((r) => (
              <div key={r.num} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <span className="absolute -right-3 -top-5 text-7xl font-bold text-white/5">{r.num}</span>
                <span className="text-xs font-semibold text-violet-400">Rule {r.num}</span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="card-glow rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-600/20 via-zinc-900 to-blue-600/10 p-8 text-center sm:p-12">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
              <Rocket className="h-3.5 w-3.5 text-violet-400" />
              Publicly commit — make it real
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Telling people is the first streak.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              The most reliable accountability trick in the book: announce it. Share your challenge on
              LinkedIn, copy your referral code, and tomorrow you’ll feel the difference.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/commit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 sm:w-auto"
              >
                Commit publicly
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
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
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Students, not statistics
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              What students say after a few weeks
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <blockquote className="flex-1 text-sm leading-relaxed text-zinc-300">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-white/5 pt-4">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.college}</div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-center text-xs font-medium uppercase tracking-widest text-zinc-600">
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-red-400">
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
          <div className="card-glow rounded-2xl border border-violet-500/20 bg-gradient-to-b from-violet-500/[0.08] to-transparent p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
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

      <section id="features" className="border-t border-white/5 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What actually changed
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Every piece of the old dashboard was a form. Every piece of this
              one is a coach.
            </p>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-500/30 hover:bg-white/[0.05]"
              >
                <f.icon className="h-6 w-6 text-violet-400 transition group-hover:scale-110" />
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.body}</p>
              </div>
            ))}
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
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
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
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Try the mentor
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="card-glow rounded-2xl border border-white/10 bg-zinc-900 p-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-xs font-bold text-white">
                M
              </span>
              <div>
                <div className="text-sm font-semibold">Mentor</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  remembers Day 6 → 60
                </div>
              </div>
            </div>
            <div className="space-y-4 pt-4 text-sm leading-relaxed">
              <div className="rounded-xl bg-zinc-800 px-4 py-3 text-zinc-300">
                i missed 59 days and gave up. can i still finish?
              </div>
              <div className="rounded-xl bg-violet-500/10 px-4 py-3 text-zinc-200">
                I remember Day 1 went out on time on 5 Jun. The problem wasn’t you — it was a calendar that showed “Missed” 58 times and offered nothing back. I’ve compressed your catch-up into 13 starter steps. Say the word and we start today.
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-zinc-800/60 px-4 py-2.5 text-xs text-zinc-500">
                <Flame className="h-4 w-4 text-amber-400" />
                Streak 0 · longest 1 · Day 60 · memory 100% synced
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
              <Users className="h-3.5 w-3.5 text-amber-400" />
              Grow with ABTalks
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Want to be a campus ambassador for your college?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-zinc-400">
              Lead your campus on ABTalks, earn perks, and help build the AI
              community around you. Bring people in with your referral code,
              track it on your challenge page, and turn every friend you onboard
              into momentum for your own streak.
            </p>
            <div className="mt-8 flex items-center gap-4">
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
            <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
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
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
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

      <footer className="border-t border-white/5 py-10 pb-28 md:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-zinc-500 sm:flex-row sm:px-6">
          <span>ABTalks · Redesigned — a hackathon rebuild, vibe-coded.</span>
          <span className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-amber-400" />
            Built in a weekend, remembered forever
          </span>
        </div>
      </footer>

      <MobileNav active="home" />
    </div>
  );
}
