import type { Metadata } from "next";
import { JOURNEY, CURRENT_DAY } from "@/data/journey";
import ChallengeDay from "@/components/day/ChallengeDay";

export const dynamicParams = false;

export function generateStaticParams() {
  return JOURNEY.map((d) => ({ day: String(d.day) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>;
}): Promise<Metadata> {
  const { day } = await params;
  const n = Number(day);
  const node = JOURNEY.find((d) => d.day === n);
  const title = node ? `Day ${n} · ${node.title} · ABTalks Redesigned` : `Day ${n} · ABTalks Redesigned`;
  return { title, description: node?.blurb ?? "A single day in the 60-day ABTalks challenge." };
}

export default async function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const n = Number(day);
  const node = JOURNEY.find((d) => d.day === n) ?? JOURNEY[Math.min(Math.max(n - 1, 0), JOURNEY.length - 1)];
  return <ChallengeDay day={node.day} totalDays={CURRENT_DAY} />;
}
