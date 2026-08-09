export type MemoryKind =
  | "profile"
  | "skill"
  | "submission"
  | "feedback"
  | "preference"
  | "milestone";

export interface MemoryEntry {
  id: string;
  kind: MemoryKind;
  key: string;
  value: string;
  ts: number;
}

export interface MentorMessage {
  role: "user" | "assistant";
  content: string;
  ts: number;
}

export interface LearnerProfile {
  name: string;
  streak: number;
  completed: number;
  currentDay: number;
  strengths: string[];
  struggleAreas: string[];
  caughtUp: boolean;
}

const PROFILE_KEY = "abtalks.profile.v1";
const HISTORY_KEY = "abtalks.history.v1";
const MEMORY_KEY = "abtalks.memory.v1";

const SEED_PROFILE: LearnerProfile = {
  name: "Anushka",
  streak: 54,
  completed: 50,
  currentDay: 60,
  strengths: ["deployment", "tooling", "agents"],
  struggleAreas: ["system prompts", "structured output"],
  caughtUp: false,
};

const SEED_HISTORY: MentorMessage[] = [
  {
    role: "assistant",
    content:
      "Hey Anushka — welcome to Day 60. I remember Day 8 (your IDE-day) was where tooling finally clicked for you. Two days to the deadline, one task left. Let's ship v1.0.0 properly.",
    ts: 0,
  },
  {
    role: "user",
    content: "still shaky on structured output, any quick trick for day 6?",
    ts: 1,
  },
  {
    role: "assistant",
    content:
      "Remembered. Since then I've been tightening structured-output prompts on your builds — it paid off. One rule that sticks: give the model a schema, not adjectives. I'll keep that in mind for today's review.",
    ts: 2,
  },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or blocked — memory degrades gracefully */
  }
}

export function getProfile(): LearnerProfile {
  return read<LearnerProfile>(PROFILE_KEY, SEED_PROFILE);
}

export function updateProfile(patch: Partial<LearnerProfile>) {
  const next = { ...getProfile(), ...patch };
  write(PROFILE_KEY, next);
  return next;
}

export function getHistory(): MentorMessage[] {
  return read<MentorMessage[]>(HISTORY_KEY, SEED_HISTORY);
}

export function pushMessage(msg: MentorMessage) {
  const next = [...getHistory(), msg].slice(-200);
  write(HISTORY_KEY, next);
}

export function getMemory(): MemoryEntry[] {
  return read<MemoryEntry[]>(MEMORY_KEY, []);
}

export function remember(kind: MemoryKind, key: string, value: string) {
  const entry: MemoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    key,
    value,
    ts: Date.now(),
  };
  write(MEMORY_KEY, [...getMemory(), entry]);
  return entry;
}

export function forgetMemory() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(MEMORY_KEY);
  window.localStorage.removeItem(HISTORY_KEY);
  window.localStorage.removeItem(PROFILE_KEY);
}

/**
 * Breeth-ready interface.
 *
 * Today the memory layer runs on localStorage so the demo is fully offline
 * and deployable with zero credentials. The shape below mirrors a persistent
 * memory server: swap these two functions for Breeth's HTTP/MCP calls and the
 * entire app inherits cloud-backed memory with no other changes.
 */
export interface MemoryProvider {
  read(key: string): Promise<string | null>;
  write(key: string, value: string): Promise<void>;
}

export const localMemoryProvider: MemoryProvider = {
  async read(key) {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  },
  async write(key, value) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  },
};

export const breethProvider: MemoryProvider | null =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BREETH_URL
    ? {
        async read(key) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BREETH_URL}/memories/${key}`);
          if (!res.ok) return null;
          const data = await res.json();
          return data.value ?? null;
        },
        async write(key, value) {
          await fetch(`${process.env.NEXT_PUBLIC_BREETH_URL}/memories/${key}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ value }),
          });
        },
      }
    : null;

export const activeProvider = breethProvider ?? localMemoryProvider;
