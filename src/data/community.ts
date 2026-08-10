export interface PostFeedback {
  name: string;
  text: string;
  rating: number;
  ts: number;
}

export interface CommunityPost {
  id: string;
  author: string;
  day: number;
  tag: string;
  title: string;
  votes: number;
  build: string;
  feedback: PostFeedback[];
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "repo-as-resume",
    author: "Priya R.",
    day: 57,
    tag: "refactor",
    title: "I made my repo my resume",
    votes: 84,
    build:
      "Turned the README into a portfolio — live demo gif, architecture diagram, PROMPTS.md, and a clear 'what I built vs what I learned' split. Recruiters now spend 2 minutes on the repo instead of 2 seconds.",
    feedback: [
      {
        name: "Arjun K.",
        text: "The architecture diagram idea is gold. Stealing it for my catch-up project.",
        rating: 5,
        ts: 1700000000000,
      },
      {
        name: "Sneha T.",
        text: "How long did the demo gif take? That's the one thing I keep skipping.",
        rating: 4,
        ts: 1700000060000,
      },
    ],
  },
  {
    id: "launch-numbers",
    author: "Arjun K.",
    day: 59,
    tag: "case-study",
    title: "Breaking down my launch numbers",
    votes: 71,
    build:
      "Shipped v0.9 to 12 friends, tracked signups, daily active use and churn for 6 days. Turned the numbers into a case study — what stuck, what died, what I'd redo. The 'skills learned' section writes itself after this.",
    feedback: [
      {
        name: "Priya R.",
        text: "The churn table is exactly the kind of evidence a reviewer wants to see.",
        rating: 5,
        ts: 1700000020000,
      },
    ],
  },
  {
    id: "teaching-day-2",
    author: "Sneha T.",
    day: 55,
    tag: "teach",
    title: "Teaching my friend Day 2 — it stuck",
    votes: 63,
    build:
      "Explained my Day 2 build to a friend who has never coded. The explanation forced me to fix three sloppy abstractions. Teaching is a code review nobody warns you about.",
    feedback: [],
  },
  {
    id: "polish-pass",
    author: "Dev M.",
    day: 58,
    tag: "polish",
    title: "The 90-minute polish pass that worked",
    votes: 58,
    build:
      "Spent 90 minutes on nothing but spacing, empty states, loading feedback and the 404 page. Same features, but it finally felt 'released'. Polish is a feature.",
    feedback: [
      {
        name: "Meera K.",
        text: "Empty states are so underrated. Great write-up.",
        rating: 4,
        ts: 1700000040000,
      },
    ],
  },
];

export function communityPost(id: string): CommunityPost | undefined {
  return COMMUNITY_POSTS.find((p) => p.id === id);
}
