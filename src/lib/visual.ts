import type { DayNode } from "@/data/journey";
import { SKILLS } from "@/data/journey";
import type { ComponentType, SVGProps } from "react";
import { Bolt, CheckCircle, Message, Rocket, Sparkles } from "@/components/icons";

export interface VisualStep {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
}

function skillLabel(day: DayNode): string {
  return SKILLS.find((s) => s.id === day.skill)?.label ?? day.skill;
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
