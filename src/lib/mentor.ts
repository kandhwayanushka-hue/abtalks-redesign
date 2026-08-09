import type { LearnerProfile } from "./memory";
import { remember } from "./memory";
import { CURRENT_DAY, JOURNEY, catchUpCount, missedCount } from "@/data/journey";

const DAY_60_HINTS = [
  "1. Run a final review checklist — repo public, README clean, PROMPTS.md present, live URL reachable. Judges check this before they look at your code.",
  "2. Tag the release: v1.0.0. A real tag signals a finished build, not a WIP.",
  "3. Write your PROMPTS.md like a story — what you asked, what you changed, why. The authenticity review reads it.",
  "4. Record a 30-second walkthrough video. Judges skim, then deep-dive winners.",
];

const CATCH_UP_STEPS = [
  "1. Day 2 — System prompts 101: write a prompt that states a role, a constraint, and a tone. 45 min.",
  "2. Day 3 — Chain of thought: ask the model to reason before answering. 60 min.",
  "3. Day 4 — Iterate like a dev: keep prompt diffs, not prompt rewrites. 45 min.",
  "4. Day 5 — Few-shot: three examples beat five adjectives. 60 min.",
  "5. Day 6 — Structured output: give the model a schema, not prose. 75 min.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function greeting(profile: LearnerProfile, mentor?: { name: string; specialty: string }): string {
  const gap = CURRENT_DAY - 1 - profile.completed;
  const intro = mentor
    ? `I’m ${mentor.name} — ${mentor.specialty}. `
    : "";
  return `Hey ${profile.name} — ${intro}Day ${CURRENT_DAY}, and you've completed ${profile.completed} of them so far (${gap} behind, but catchable). I remember Day 1 went out on time on 5 Jun. Let's turn that 1 day into a win. What do you need?`;
}

function hint(profile: LearnerProfile): string {
  const struggle =
    profile.struggleAreas.length > 0
      ? `And you flagged "${profile.struggleAreas[0]}" as the reason you stalled — so let's fix it properly today, not skip it.`
      : "";
  return (
    `Here's today's hint pack for "${JOURNEY.find((d) => d.day === CURRENT_DAY)?.title}".\n\n` +
    DAY_60_HINTS.join("\n") +
    `\n\n${struggle}`
  );
}

function review(submission: string, profile: LearnerProfile): string {
  const checks = [
    "Repo public & cloneable — confirm the URL returns 200.",
    "Live demo reachable — open it yourself, from another browser.",
    "PROMPTS.md (or chat export) present and honest.",
    "README explains the project, not just the stack.",
  ];
  const matches = checks.filter((c) => submission.toLowerCase().includes(c.split(" ")[0].toLowerCase()));
  remember("submission", `day-${CURRENT_DAY}`, submission.slice(0, 240));
  remember("feedback", "final-review", checks.join(" | "));
  const missed = checks.filter((c) => !matches.includes(c));
  if (missed.length === 0) {
    return `That's a complete checklist — ${profile.name}, you're submission-ready. Ship it, tag v1.0.0, then go graduate. 🎓`;
  }
  return `Here's my review. Covered: ${matches.length}/${checks.length}.\n\n${missed
    .map((m) => `• ${m}`)
    .join("\n")}\n\nFix these and you're done. I've logged this so we can re-check.`;
}

function progress(profile: LearnerProfile): string {
  const pct = Math.round((profile.completed / CURRENT_DAY) * 100);
  return `You've completed ${profile.completed} of ${CURRENT_DAY} days (${pct}%). ${missedCount} missed, ${catchUpCount} eligible to catch up. Longest streak: ${profile.longestStreak} day(s). Your focus right now: ${profile.struggleAreas[0]}. Want the catch-up plan?`;
}

function catchUp(): string {
  remember("milestone", "catch-up-started", `Started ${catchUpCount}-day catch-up plan on ${new Date().toISOString()}`);
  return `Here's your catch-up plan — I've compressed ${missedCount} missed days into ${CATCH_UP_STEPS.length} starter steps so you rebuild momentum without burning out.\n\n${CATCH_UP_STEPS.join(
    "\n"
  )}\n\nStart with step 1 today. Every finished step updates your calendar to "On time". I'll log your progress.`;
}

export function mentorReply(
  input: string,
  profile: LearnerProfile,
  mentor?: { name: string; specialty: string }
): string {
  const text = input.trim().toLowerCase();
  remember("profile", "interaction", input.slice(0, 240));
  if (text.includes("?")) remember("doubt", `doubt-${Date.now()}`, input.slice(0, 200));

  if (/^(hi|hey|hello|yo|sup)\b/.test(text)) return greeting(profile, mentor);
  if (text.includes("hint") || text.includes("stuck") || text.includes("help")) return hint(profile);
  if (text.includes("catch") || text.includes("missed") || text.includes("behind") || text.includes("plan"))
    return catchUp();
  if (text.includes("review") || text.includes("feedback") || text.includes("critique") || text.includes("check"))
    return review(input, profile);
  if (text.includes("day") && /progress|streak|percent|complete/.test(text)) return progress(profile);
  if (text.includes("thank")) return `Anytime, ${profile.name}. One win today beats a perfect plan.`;
  if (text.includes("v1.0.0") || text.includes("ship") || text.includes("graduate"))
    return `Tag v1.0.0, push it, drop the URL in the submission page, and update PROMPTS.md with today's prompts. Then it's done. Want me to review your PROMPTS.md first?`;

  return pick([
    `Good question. For today, the thing that wins is a tight review pass — I can walk through your submission checklist if you paste it and say "review".`,
    `I remember your gap is momentum, not talent — Day 1 proved that. Try the task first, ask me for a hint only if you're stuck. What's blocking you?`,
    `Quick reality check — is your PROMPTS.md in the repo? It's the easiest stage to fail on. Paste it and say "review".`,
  ]);
}
