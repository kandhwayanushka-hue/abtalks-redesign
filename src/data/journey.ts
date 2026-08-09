export type Skill = "prompting" | "tools" | "deployment" | "agents" | "systems" | "portfolio";

export type DayStatus = "ontime" | "rejected" | "missed" | "catchup" | "future" | "current";

export interface DayNode {
  day: number;
  title: string;
  skill: Skill;
  level: "core" | "advanced";
  minutes: number;
  status: DayStatus;
  blurb: string;
}

export const STATUS_LEGEND: { status: DayStatus; label: string; color: string; bg: string }[] = [
  { status: "ontime", label: "On time", color: "#34d399", bg: "rgba(52,211,153,0.18)" },
  { status: "rejected", label: "Rejected", color: "#fb7185", bg: "rgba(251,113,133,0.18)" },
  { status: "missed", label: "Missed", color: "#a1a1aa", bg: "rgba(161,161,170,0.12)" },
  { status: "catchup", label: "Missed · catch up", color: "#fbbf24", bg: "rgba(251,191,36,0.18)" },
  { status: "future", label: "Future", color: "#71717a", bg: "rgba(113,113,122,0.10)" },
];

export interface SkillMeta {
  id: Skill;
  label: string;
  color: string;
}

export const SKILLS: SkillMeta[] = [
  { id: "prompting", label: "Prompting", color: "#a78bfa" },
  { id: "tools", label: "Tools", color: "#60a5fa" },
  { id: "agents", label: "Agents", color: "#34d399" },
  { id: "systems", label: "Systems", color: "#fbbf24" },
  { id: "deployment", label: "Deployment", color: "#f472b6" },
  { id: "portfolio", label: "Portfolio", color: "#2dd4bf" },
];

export const skillColor = (id: Skill) => SKILLS.find((s) => s.id === id)?.color ?? "#a78bfa";

export const CURRENT_DAY = 60;

const raw: Omit<DayNode, "status">[] = [
  { day: 1, title: "First prompt, first win", skill: "prompting", level: "core", minutes: 30, blurb: "Write a prompt that beats a template." },
  { day: 2, title: "System prompts 101", skill: "prompting", level: "core", minutes: 45, blurb: "Roles, constraints, tone." },
  { day: 3, title: "Chain of thought", skill: "prompting", level: "core", minutes: 60, blurb: "Let the model reason before answering." },
  { day: 4, title: "Iterate like a dev", skill: "prompting", level: "core", minutes: 45, blurb: "Diffing prompt versions." },
  { day: 5, title: "Few-shot magic", skill: "prompting", level: "core", minutes: 60, blurb: "Examples beat adjectives." },
  { day: 6, title: "Structured output", skill: "prompting", level: "advanced", minutes: 75, blurb: "JSON, schemas, enforcement." },
  { day: 7, title: "First solo build", skill: "tools", level: "core", minutes: 90, blurb: "Ship something small, end to end." },
  { day: 8, title: "The IDE is a cockpit", skill: "tools", level: "core", minutes: 60, blurb: "Your editor, agentic." },
  { day: 9, title: "Cursor / Copilot patterns", skill: "tools", level: "core", minutes: 60, blurb: "Tab, compose, refactor, ask." },
  { day: 10, title: "CLI + agents", skill: "tools", level: "core", minutes: 45, blurb: "Terminal-native AI." },
  { day: 11, title: "Claude Code basics", skill: "tools", level: "advanced", minutes: 90, blurb: "Tasks, tools, planning." },
  { day: 12, title: "MCP the first time", skill: "tools", level: "advanced", minutes: 120, blurb: "Give your agent real tools." },
  { day: 13, title: "Agent fundamentals", skill: "agents", level: "core", minutes: 75, blurb: "Loop, tools, memory, stop." },
  { day: 14, title: "ReAct in practice", skill: "agents", level: "core", minutes: 90, blurb: "Reason then act." },
  { day: 15, title: "Tool calling by hand", skill: "agents", level: "advanced", minutes: 120, blurb: "Wire one tool into an agent." },
  { day: 16, title: "Multi-step autonomy", skill: "agents", level: "advanced", minutes: 120, blurb: "Let the agent run." },
  { day: 17, title: "Memory patterns", skill: "agents", level: "advanced", minutes: 90, blurb: "Short, long, and working memory." },
  { day: 18, title: "Guardrails", skill: "agents", level: "advanced", minutes: 75, blurb: "Stop it before it breaks things." },
  { day: 19, title: "App architecture", skill: "systems", level: "core", minutes: 90, blurb: "Frontend, backend, data." },
  { day: 20, title: "Data in, data out", skill: "systems", level: "core", minutes: 75, blurb: "Models and persistence." },
  { day: 21, title: "APIs you can hit", skill: "systems", level: "core", minutes: 90, blurb: "Design a clean endpoint." },
  { day: 22, title: "Auth without the pain", skill: "systems", level: "core", minutes: 60, blurb: "Sessions, keys, scope." },
  { day: 23, title: "State that survives", skill: "systems", level: "advanced", minutes: 90, blurb: "Caching, queues, jobs." },
  { day: 24, title: "Shipping day", skill: "deployment", level: "core", minutes: 90, blurb: "Push something public." },
  { day: 25, title: "Git as a time machine", skill: "deployment", level: "core", minutes: 60, blurb: "Branches, revert, PRs." },
  { day: 26, title: "CI, fast and cheap", skill: "deployment", level: "core", minutes: 75, blurb: "Tests run without you." },
  { day: 27, title: "Vercel / Netlify deploy", skill: "deployment", level: "core", minutes: 45, blurb: "One-click to live." },
  { day: 28, title: "Environments + secrets", skill: "deployment", level: "advanced", minutes: 60, blurb: "Prod vs dev, keys safe." },
  { day: 29, title: "Observability", skill: "deployment", level: "advanced", minutes: 75, blurb: "Logs, errors, uptime." },
  { day: 30, title: "Midpoint retro", skill: "portfolio", level: "core", minutes: 90, blurb: "Look back, re-plan." },
  { day: 31, title: "Project 1: start", skill: "portfolio", level: "core", minutes: 120, blurb: "Pick a real problem." },
  { day: 32, title: "Prompt-engineering the build", skill: "prompting", level: "advanced", minutes: 120, blurb: "Direct the AI, don't fight it." },
  { day: 33, title: "Split the work", skill: "tools", level: "advanced", minutes: 90, blurb: "Files, modules, agents." },
  { day: 34, title: "Agent crew", skill: "agents", level: "advanced", minutes: 120, blurb: "Multiple roles, one build." },
  { day: 35, title: "Failure drills", skill: "systems", level: "advanced", minutes: 90, blurb: "Break it on purpose, fix it." },
  { day: 36, title: "Perf pass", skill: "systems", level: "advanced", minutes: 90, blurb: "Make it feel fast." },
  { day: 37, title: "Ship project 1", skill: "deployment", level: "advanced", minutes: 120, blurb: "Public, live, shared." },
  { day: 38, title: "Share it", skill: "portfolio", level: "core", minutes: 60, blurb: "Demo video + one thread." },
  { day: 39, title: "Feedback loop", skill: "portfolio", level: "core", minutes: 60, blurb: "Read the comments, improve." },
  { day: 40, title: "Reading real code", skill: "systems", level: "core", minutes: 75, blurb: "Learn from OSS." },
  { day: 41, title: "Review like a senior", skill: "systems", level: "core", minutes: 60, blurb: "Critique code, kindly." },
  { day: 42, title: "Templates for everything", skill: "prompting", level: "advanced", minutes: 90, blurb: "Build a reusable prompt kit." },
  { day: 43, title: "Automate a chore", skill: "tools", level: "advanced", minutes: 90, blurb: "Script the boring part." },
  { day: 44, title: "Voice + multimodal", skill: "tools", level: "advanced", minutes: 75, blurb: "Images, audio, screens." },
  { day: 45, title: "Project 2: ambition", skill: "portfolio", level: "core", minutes: 120, blurb: "Bigger, riskier, yours." },
  { day: 46, title: "Plan with the AI", skill: "prompting", level: "advanced", minutes: 90, blurb: "Let it challenge your plan." },
  { day: 47, title: "Hard problems, broken down", skill: "agents", level: "advanced", minutes: 120, blurb: "Decompose and delegate." },
  { day: 48, title: "Security mindset", skill: "systems", level: "advanced", minutes: 90, blurb: "Prompt injection, leaks." },
  { day: 49, title: "Scale your stack", skill: "deployment", level: "advanced", minutes: 90, blurb: "Load, limits, cost." },
  { day: 50, title: "Launch day", skill: "deployment", level: "advanced", minutes: 120, blurb: "Ship it, tell people." },
  { day: 51, title: "Case study 1", skill: "portfolio", level: "core", minutes: 90, blurb: "Write what you built and why." },
  { day: 52, title: "Case study 2", skill: "portfolio", level: "core", minutes: 90, blurb: "Show the numbers." },
  { day: 53, title: "The talk track", skill: "portfolio", level: "core", minutes: 60, blurb: "Explain it in 2 minutes." },
  { day: 54, title: "Networking", skill: "portfolio", level: "core", minutes: 60, blurb: "Comments, DMs, showcases." },
  { day: 55, title: "Personal brand", skill: "portfolio", level: "core", minutes: 60, blurb: "One consistent presence." },
  { day: 56, title: "Teach someone", skill: "portfolio", level: "advanced", minutes: 90, blurb: "You learn it twice." },
  { day: 57, title: "Refactor the portfolio", skill: "portfolio", level: "advanced", minutes: 120, blurb: "Your repo is your resume." },
  { day: 58, title: "Polish pass", skill: "portfolio", level: "advanced", minutes: 90, blurb: "Details, docs, screenshots." },
  { day: 59, title: "Final review", skill: "portfolio", level: "advanced", minutes: 90, blurb: "Checklist against the rubric." },
  { day: 60, title: "Final Review, Portfolio & Graduation – Ship v1.0.0 and Graduate the Challenge", skill: "portfolio", level: "advanced", minutes: 120, blurb: "Final review, portfolio polish, release tag, graduation." },
];

const REAL_DATA_DAYS = new Set<number>([1]);

export const JOURNEY: DayNode[] = raw.map((d) => {
  let status: DayStatus;
  if (d.day === CURRENT_DAY) status = "current";
  else if (REAL_DATA_DAYS.has(d.day)) status = "ontime";
  else if (d.day <= 14) status = "catchup";
  else status = "missed";
  return { ...d, status };
});

export const completedCount = 1;
export const missedCount = JOURNEY.filter((d) => d.status === "missed").length;
export const catchUpCount = JOURNEY.filter((d) => d.status === "catchup").length;

export const XP_TOTAL = 5000;
export const STREAK = 0;
export const LONGEST_STREAK = 1;
export const REFERRALS = 0;
export const REFERRAL_CODE = "HET9HA";

export const RECENT_SUBMISSIONS = [
  { day: 1, title: "First prompt, first win", date: "5 Jun 2026", outcome: "on time" },
];

export interface ShowcasePost {
  author: string;
  day: number;
  title: string;
  excerpt: string;
  votes: number;
  tag: string;
}
