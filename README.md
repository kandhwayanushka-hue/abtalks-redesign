# ABTalks · Redesigned

**Hackathon entry — Problem Statement 1: Redesign ABTalks**

The challenge platform **that remembers you**. ABTalks was a checklist with
a broken countdown; this rebuild turns it into an AI mentor. One task a
day, a persistent memory layer, and a skill path that shows real progress.

## Live demo

[abtalks-redesign.vercel.app](https://abtalks-redesign.vercel.app)

## What changed

- **One task, full focus** — a single daily card (Day 60: "Ship v1.0.0 and
  graduate") instead of a wall of instructions.
- **An AI mentor that remembers** — persistent memory of struggles,
  strengths, and feedback across all 60 days; hints are personalized.
- **Submit → feedback → polish** — paste your work, get a review against
  the judging rubric, fix, re-submit.
- **A skill path, not a checklist** — 60-day grid colored by skill
  (prompting, tools, agents, systems, deployment, portfolio).
- **Community that ships** — a gallery of Day-N builds to vote on.

## Memory layer (Breeth-ready)

The mentor runs on a typed, persistent memory store (`src/lib/memory.ts`).
In the demo it's backed by `localStorage` so the app deploys with zero
credentials. It exposes a `MemoryProvider` interface — set
`NEXT_PUBLIC_BREETH_URL` and the same code talks to a Breeth-compatible
server (API/MCP) with no other changes.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## AI usage

See [PROMPTS.md](./PROMPTS.md) — a full, honest log of the prompts that
built this project.
