export interface InterviewQuestion {
  q: string;
  hints: string[];
}

export interface InterviewTrack {
  id: string;
  name: string;
  color: string;
  intro: string;
  questions: InterviewQuestion[];
}

export const TRACKS: InterviewTrack[] = [
  {
    id: "prompting",
    name: "Prompting & Agents",
    color: "#a78bfa",
    intro: "Great — this is an AI-engineering role. Let's see how you actually reason about prompts.",
    questions: [
      {
        q: "Explain what a system prompt is, and when you'd choose to use one.",
        hints: ["role", "constraints", "context", "tone", "instructions"],
      },
      {
        q: "Your prompt keeps returning malformed JSON. Walk me through how you'd debug it.",
        hints: ["schema", "example", "validate", "json", "few-shot", "error"],
      },
      {
        q: "How do you keep a prompt reliable when the code around it changes often?",
        hints: ["version", "test", "diff", "template", "record"],
      },
      {
        q: "Why might you reach for an AI agent instead of a single well-tuned prompt?",
        hints: ["tool", "loop", "memory", "steps", "autonomy", "guardrail"],
      },
    ],
  },
  {
    id: "deployment",
    name: "Deployment & Shipping",
    color: "#34d399",
    intro: "Ship-focused role. Let's see how you take code from a folder to a live URL.",
    questions: [
      {
        q: "Walk me through how you'd deploy a web app and make it public.",
        hints: ["host", "vercel", "domain", "build", "env", "https"],
      },
      {
        q: "How do you keep secrets like API keys out of your repository?",
        hints: ["env", "gitignore", "secret", "variable", "commit"],
      },
      {
        q: "The deployed app is returning 500s. What's your first ten minutes?",
        hints: ["log", "error", "uptime", "rollback", "health"],
      },
      {
        q: "Explain continuous integration like I'm a junior who's never heard of it.",
        hints: ["test", "automate", "pull", "check", "build"],
      },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio & Career",
    color: "#f472b6",
    intro: "Career-focused. Sell me on what you built — not your resume.",
    questions: [
      {
        q: "Tell me about a project you shipped in the last 60 days.",
        hints: ["problem", "build", "users", "live", "numbers"],
      },
      {
        q: "How do you turn your GitHub repositories into proof of skill?",
        hints: ["readme", "demo", "screenshot", "case", "stars"],
      },
      {
        q: "What's the hardest bug or failure you've fixed, and what did it teach you?",
        hints: ["log", "reproduce", "fix", "learn", "test"],
      },
      {
        q: "Why should I trust you can keep shipping after the challenge ends?",
        hints: ["streak", "habit", "public", "consistency", "commit"],
      },
    ],
  },
  {
    id: "general",
    name: "General Round",
    color: "#60a5fa",
    intro: "Let's get a feel for you as an engineer. No right answers — just show your thinking.",
    questions: [
      {
        q: "Introduce yourself and what you learned in your 60-day challenge.",
        hints: ["build", "learn", "ship", "track"],
      },
      {
        q: "How do you learn a new tool or library quickly?",
        hints: ["docs", "build", "small", "example", "break"],
      },
      {
        q: "Tell me about a time you were stuck for days. What got you unstuck?",
        hints: ["log", "ask", "mentor", "simplify", "rest"],
      },
      {
        q: "Where do you want to be a year from now?",
        hints: ["career", "portfolio", "skills", "role"],
      },
    ],
  },
];

export interface AnswerResult {
  score: number;
  feedback: string;
}

export function evaluateAnswer(answer: string, question: InterviewQuestion): AnswerResult {
  const text = answer.toLowerCase();
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  let score = 1;
  if (words >= 12) score = 2;
  if (words >= 30) score = 3;
  const hits = question.hints.filter((h) => text.includes(h.toLowerCase())).length;
  score = Math.min(5, score + hits);

  if (score >= 4) {
    return {
      score,
      feedback:
        "Strong answer — you hit the concepts an interviewer is listening for and explained them clearly. In a real room, follow up with a short concrete example from your own work.",
    };
  }
  if (score === 3) {
    return {
      score,
      feedback:
        "Solid foundation, but a little thin. A strong answer names the key concept first, then grounds it with a specific example from something you actually built.",
    };
  }
  return {
    score,
    feedback: `Thin answer — you gestured at it but didn't land the substance. A strong response covers: ${question.hints.join(", ")}. Try answering again with one concrete example.`,
  };
}

export interface InterviewSummary {
  verdict: string;
  score: number;
  strong: string[];
  weak: string[];
}

export function buildSummary(results: AnswerResult[]): InterviewSummary {
  const avg = results.reduce((a, r) => a + r.score, 0) / results.length;
  const score = Math.round(avg * 10) / 10;
  const strong = results.map((r, i) => ({ r, i })).filter((x) => x.r.score >= 4).map((x) => `Q${x.i + 1}`);
  const weak = results.map((r, i) => ({ r, i })).filter((x) => x.r.score <= 2).map((x) => `Q${x.i + 1}`);
  let verdict: string;
  if (avg >= 4) {
    verdict = "Hire-ready. You explained your work with specifics and confidence. Go record your intro video and send it to real recruiters.";
  } else if (avg >= 3) {
    verdict = "Close. Your instincts are right but answers need examples. Practice the STAR format — Situation, Task, Action, Result — and re-run this.";
  } else {
    verdict = "Not there yet — and that's fine, that's what the challenge is for. Re-read your own submissions, write one-paragraph answers to each question, then try again.";
  }
  return { verdict, score, strong: strong.map((_, i) => `Q${i + 1}`), weak: weak.map((_, i) => `Q${i + 1}`) };
}
