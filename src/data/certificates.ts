export interface CertificateDef {
  part: number;
  day: number;
  start: number;
  end: number;
  title: string;
  difficulty: string;
  stars: number;
  skills: string[];
  blurb: string;
}

export const CERTIFICATES: CertificateDef[] = [
  {
    part: 1,
    day: 20,
    start: 1,
    end: 20,
    title: "Foundations of AI Building",
    difficulty: "Beginner",
    stars: 2,
    skills: ["Prompting", "Tools", "Agents basics", "Systems basics"],
    blurb:
      "Prompting, agentic tools, and your first systems — 20 straight days of building the fundamentals that everything else sits on.",
  },
  {
    part: 2,
    day: 40,
    start: 21,
    end: 40,
    title: "Builder — Real Projects Shipping",
    difficulty: "Intermediate",
    stars: 3,
    skills: ["Systems", "Deployment", "Project 1", "Advanced agents"],
    blurb:
      "APIs, auth, deployment, and your first real project shipped live — the days between toy builds and things people can actually use.",
  },
  {
    part: 3,
    day: 60,
    start: 41,
    end: 60,
    title: "Launch & Graduate",
    difficulty: "Advanced",
    stars: 4,
    skills: ["Deployment", "Portfolio", "Case studies", "Graduation"],
    blurb:
      "Project 2, case studies, and a portfolio that reads like a resume — capped with the final review and your v1.0.0 release.",
  },
];

export const partForDay = (day: number): CertificateDef => {
  if (day <= 20) return CERTIFICATES[0];
  if (day <= 40) return CERTIFICATES[1];
  return CERTIFICATES[2];
};
