import type { DayNode } from "@/data/journey";
import { SKILLS } from "@/data/journey";
import type { ComponentType, SVGProps } from "react";
import { Bolt, CheckCircle, Message, Rocket, Sparkles } from "@/components/icons";

export interface VisualStep {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}

export interface BuildPlan {
  deliverable: string;
  checklist: string[];
  example: string;
}

function skillLabel(day: DayNode): string {
  return SKILLS.find((s) => s.id === day.skill)?.label ?? day.skill;
}

export function dayBuild(day: DayNode): BuildPlan {
  const label = skillLabel(day);
  const deliverables: Record<string, string> = {
    prompting: "A prompt you wrote, iterated on, and saved — with the before/after.",
    tools: "A working tool-assisted build you ran yourself, end to end.",
    agents: "A small agent (or agent flow) that did one real task without you.",
    systems: "A running app or system with data flowing in and out.",
    deployment: "Something deployed and publicly reachable — a URL you can share.",
    portfolio: "Proof of learning you can show a recruiter: project, post, or case study.",
  };
  const checklist = [
    `Spend ~${day.minutes} focused minutes on this ${label.toLowerCase()} task`,
    "Build the thing by hand — or steer AI to build it, and understand every line",
    "Push a GitHub commit (repo URL, today)",
    "Publish a LinkedIn post (today) — proof of work + visibility",
    "Get one piece of feedback and note it for tomorrow",
  ];
  return {
    deliverable: deliverables[day.skill] ?? "A finished, shippable piece of work you can show.",
    checklist,
    example:
      day.day === 12
        ? "Example: add an MCP server to a Claude Code session so your agent can read a file or hit an API it couldn't before. Screenshot it, commit it, post it."
        : `Example day: read today's objective, try it for ${day.minutes} minutes, commit the output to GitHub, and post a 3-line LinkedIn update with a screenshot. That's the whole habit — today's is "${day.title}".`,
  };
}

export function visualSteps(day: DayNode): VisualStep[] {
  if (day.day === 60) {
    return [
      {
        icon: CheckCircle,
        title: "Final review checklist",
        body: "Repo public + cloneable, live demo reachable, PROMPTS.md present, README honest.",
      },
      {
        icon: Rocket,
        title: "Tag v1.0.0",
        body: "A real release tag tells judges it's a finished build, not a work in progress.",
      },
      {
        icon: Sparkles,
        title: "Record a 30s walkthrough",
        body: "Show the app in motion. Judges skim videos first, then deep-dive winners.",
      },
      {
        icon: Message,
        title: "Submit & log to memory",
        body: "Drop the URL, update PROMPTS.md, and the mentor logs your graduation.",
      },
    ];
  }

  const level = day.level === "advanced" ? "advanced" : "core";
  return [
    {
      icon: Sparkles,
      title: "Read the objective",
      body: `"${day.title}" — ${day.blurb}`,
    },
    {
      icon: Bolt,
      title: `Train your ${skillLabel(day).toLowerCase()} skill`,
      body: `${level === "advanced" ? "Push yourself" : "Start simple"} — the day is a ~${day.minutes} minute focused session.`,
    },
    {
      icon: Rocket,
      title: "Build something small",
      body: "Do the task by hand. The mentor gives hints only when you ask.",
    },
    {
      icon: Message,
      title: "Submit, get feedback, polish",
      body: "Paste your work and get a review. Fix it. Ship it. All logged to memory.",
    },
  ];
}
