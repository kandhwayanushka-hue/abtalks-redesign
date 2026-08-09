import type { Skill } from "@/data/journey";
import { JOURNEY } from "@/data/journey";

export interface ChallengeResource {
  type: "video" | "repo" | "docs" | "community";
  label: string;
  url: string;
  description: string;
}

export interface ChallengeContent {
  instructions: string[];
  resources: ChallengeResource[];
  acceptance: string[];
}

const INSTRUCTIONS: Record<Skill, string[]> = {
  prompting: [
    "Rewrite today’s prompt from scratch: a clear role, explicit constraints, and one goal.",
    "Capture the output, then make a single targeted change — keep a prompt diff, not a rewrite.",
    "Test it against three rough inputs (empty, vague, hostile) and tighten the instructions.",
    "Log your best prompt and output to today’s note so the mentor can reference it later.",
  ],
  tools: [
    "Set up the workspace: open the project, run it, and break it on purpose once.",
    "Use an AI assistant in the editor or CLI to do the task — tab, compose, refactor, ask.",
    "Resolve every error the tool flags. Never dismiss one silently.",
    "Commit the result and note which tools saved you the most time.",
  ],
  agents: [
    "Sketch today’s agent loop on paper first: goal → tools → memory → stop.",
    "Wire at least one real tool call and verify the agent actually uses it.",
    "Add a guardrail: a max step count or a human-approval gate.",
    "Log what the agent did wrong — that’s tomorrow’s improvement.",
  ],
  systems: [
    "Sketch the system: frontend, backend, data. Where does each piece live?",
    "Define the data model and one API you can hit end to end.",
    "Handle failure: what happens when the API errors or the data is empty?",
    "Document the architecture in three lines for the README.",
  ],
  deployment: [
    "Push your code public today — a branch is not shipped.",
    "Deploy to a live URL and open it in a fresh (incognito) browser.",
    "Add at least one environment variable and keep it out of the repo.",
    "Screenshot the live app and share it with the URL.",
  ],
  portfolio: [
    "Update your README so someone new understands it in 60 seconds.",
    "Write one case study: the problem, your build, the numbers.",
    "Polish the details — screenshots, docs, links that actually work.",
    "Share it: one post, one thread, or one video walkthrough.",
  ],
};

const ACCEPTANCE: Record<Skill, string[]> = {
  prompting: ["Prompt with role + constraints saved", "Prompt diff captured", "Edge cases tested", "Best prompt logged to memory"],
  tools: ["Workspace runs clean", "Task done via AI tools", "No silent errors left", "Commit pushed"],
  agents: ["Loop sketched", "At least one tool wired", "Guardrail in place", "Failure logged"],
  systems: ["Architecture sketched", "API works end to end", "Failure path handled", "README section written"],
  deployment: ["Repo public", "Live URL returns 200", "No secrets in the repo", "Live screenshot shared"],
  portfolio: ["README rewritten", "One case study written", "Details polished", "Shared publicly"],
};

const RESOURCES: Record<Skill, ChallengeResource[]> = {
  prompting: [
    { type: "video", label: "ABTalks on YouTube", url: "https://www.youtube.com/@ABTalksOnAI", description: "Mentors breaking down real prompt work." },
    { type: "docs", label: "Anthropic · Prompt engineering", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", description: "System prompts, few-shot, and structured output." },
    { type: "community", label: "ABTalks Discord", url: "https://discord.gg/j4Q8tvDj6", description: "Someone in the cohort already shipped this day." },
  ],
  tools: [
    { type: "video", label: "ABTalks on YouTube", url: "https://www.youtube.com/@ABTalksOnAI", description: "Agentic editor and CLI workflows, in practice." },
    { type: "docs", label: "VS Code docs", url: "https://code.visualstudio.com/docs", description: "Editor shortcuts and extension patterns." },
    { type: "community", label: "ABTalks Discord", url: "https://discord.gg/j4Q8tvDj6", description: "Swap tooling tips with the cohort." },
  ],
  agents: [
    { type: "docs", label: "Model Context Protocol", url: "https://modelcontextprotocol.io", description: "Give your agent real tools with MCP." },
    { type: "video", label: "ABTalks on YouTube", url: "https://www.youtube.com/@ABTalksOnAI", description: "Agent loops, tool calling, and guardrails." },
    { type: "community", label: "ABTalks Discord", url: "https://discord.gg/j4Q8tvDj6", description: "Debug agent loops with people who ran them." },
  ],
  systems: [
    { type: "docs", label: "MDN · Web architecture", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", description: "The classic intro to full-stack structure." },
    { type: "video", label: "ABTalks on YouTube", url: "https://www.youtube.com/@ABTalksOnAI", description: "Designing data models for AI apps." },
    { type: "community", label: "ABTalks Discord", url: "https://discord.gg/j4Q8tvDj6", description: "Get your architecture reviewed before you build." },
  ],
  deployment: [
    { type: "docs", label: "Vercel docs", url: "https://vercel.com/docs", description: "Deploy in one click; add env vars safely." },
    { type: "video", label: "ABTalks on YouTube", url: "https://www.youtube.com/@ABTalksOnAI", description: "Shipping public, secrets handled." },
    { type: "community", label: "ABTalks Discord", url: "https://discord.gg/j4Q8tvDj6", description: "Get your live URL eyeballed by the cohort." },
  ],
  portfolio: [
    { type: "video", label: "ABTalks on YouTube", url: "https://www.youtube.com/@ABTalksOnAI", description: "Turns your repo into a resume." },
    { type: "repo", label: "GitHub", url: "https://github.com", description: "Your README and stars are your portfolio." },
    { type: "community", label: "ABTalks Discord", url: "https://discord.gg/j4Q8tvDj6", description: "Share drafts and get honest feedback." },
  ],
};

const DAY_60: ChallengeContent = {
  instructions: [
    "Run the final review checklist: repo public & cloneable, README tells the story, PROMPTS.md present, live URL reachable.",
    "Tag the release: v1.0.0. A real tag separates a build from a project.",
    "Record a 30-second walkthrough video — judges skim, then deep-dive winners.",
    "Write your graduation post: what you built, what you learned, and the links.",
  ],
  resources: [
    { type: "docs", label: "GitHub · Managing releases", url: "https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository", description: "Tag and publish v1.0.0 properly." },
    { type: "video", label: "ABTalks on YouTube", url: "https://www.youtube.com/@ABTalksOnAI", description: "Graduation day — what a winning ship looks like." },
    { type: "community", label: "ABTalks Discord", url: "https://discord.gg/j4Q8tvDj6", description: "Post your demo and collect congrats (and feedback)." },
  ],
  acceptance: ["Repo public & returns 200", "Live demo reachable in another browser", "PROMPTS.md included", "Release tagged v1.0.0", "Day 60 submitted with GitHub + LinkedIn links"],
};

export function getChallengeContent(day: number): ChallengeContent {
  if (day === 60) return DAY_60;
  const node = JOURNEY.find((d) => d.day === day);
  if (!node) return DAY_60;
  return {
    instructions: INSTRUCTIONS[node.skill],
    resources: RESOURCES[node.skill],
    acceptance: ACCEPTANCE[node.skill],
  };
}
