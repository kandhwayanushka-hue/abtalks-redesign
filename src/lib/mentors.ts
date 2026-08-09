export interface Mentor {
  id: string;
  name: string;
  specialty: string;
  color: string;
  online: boolean;
  prompt: string;
}

export const LIVE_MENTORS: Mentor[] = [
  {
    id: "general",
    name: "Aura",
    specialty: "Your journey mentor",
    color: "#a78bfa",
    online: true,
    prompt: "Hey — I have a doubt about today's task.",
  },
  {
    id: "prompting",
    name: "Rhea",
    specialty: "Prompting & structured output",
    color: "#60a5fa",
    online: true,
    prompt: "Help me with prompting / structured output.",
  },
  {
    id: "deploy",
    name: "Viraj",
    specialty: "Deployment & shipping",
    color: "#34d399",
    online: false,
    prompt: "Doubt about deployment / shipping my project.",
  },
  {
    id: "portfolio",
    name: "Meera",
    specialty: "Portfolio & graduation",
    color: "#f472b6",
    online: true,
    prompt: "Doubt about my portfolio / final review.",
  },
];
