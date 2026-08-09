import type { LearnerProfile } from "./memory";
import { remember } from "./memory";
import { CURRENT_DAY, JOURNEY } from "@/data/journey";

const DAY_60_HINTS = [
  "1. Run a final review checklist — repo public, README clean, PROMPTS.md present, live URL reachable. Judges check this before they look at your code.",
  "2. Tag the release: v1.0.0. A real tag signals a finished build, not a WIP.",
  "3. Write your PROMPTS.md like a story — what you asked, what you changed, why. The authenticity review reads it.",
  "4. Record a 30-second walkthrough video. Judges skim, then deep-dive winners.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function greeting(profile: LearnerProfile): string {
  const open = CURRENT_DAY - profile.completed;
  return `Hey ${profile.name} — Day ${CURRENT_DAY}, streak ${profile.streak}, ${open} task${open === 1 ? "" : "s"} to go. I remember tooling clicked for you around Day 8. Today is a graduation, not a grind. What do you need?`;
}

function hint(profile: LearnerProfile): string {
  const struggle =
    profile.struggleAreas.length > 0
      ? `And you flagged "${profile.struggleAreas[0]}" as a weak spot earlier — so double-check that part of your submission before you hit ship.`
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
  return `You've completed ${profile.completed} of ${CURRENT_DAY} days (${pct}%). Streak ${profile.streak} days. Your strongest skill so far: ${profile.strengths[0]}. Your focus area for the next 24h: ${profile.struggleAreas[0]}. Ask me to review anything.`;
}

export function mentorReply(input: string, profile: LearnerProfile): string {
  const text = input.trim().toLowerCase();
  remember("profile", "interaction", input.slice(0, 240));

  if (/^(hi|hey|hello|yo|sup)\b/.test(text)) return greeting(profile);
  if (text.includes("hint") || text.includes("stuck") || text.includes("help")) return hint(profile);
  if (text.includes("review") || text.includes("feedback") || text.includes("critique") || text.includes("check"))
    return review(input, profile);
  if (text.includes("day") && /progress|streak|percent|complete/.test(text)) return progress(profile);
  if (text.includes("thank")) return `Anytime, ${profile.name}. One task left — you've got this.`;
  if (text.includes("v1.0.0") || text.includes("ship") || text.includes("graduate"))
    return `Tag v1.0.0, push it, drop the URL in the submission page, and update PROMPTS.md with today's prompts. Then it's done. Want me to review your PROMPTS.md first?`;

  return pick([
    `Good question. For today, the thing that wins is a tight review pass — I can walk through your submission checklist if you paste it and say "review".`,
    `I remember you learn best by doing, so: try the task first, then ask me for a hint only if you're stuck. What's blocking you?`,
    `Quick reality check — is your PROMPTS.md in the repo? It's the easiest stage to fail on. Paste it and say "review".`,
  ]);
}
