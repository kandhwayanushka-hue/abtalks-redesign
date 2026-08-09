import type { Metadata } from "next";
import { JOURNEY } from "@/data/journey";
import ChallengePage from "@/components/challenge/ChallengePage";

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
  const title = node ? `Start Day ${n} · ${node.title} · ABTalks Redesigned` : `Start Day ${n} · ABTalks Redesigned`;
  return { title, description: node?.blurb ?? "Start a day in the 60-day ABTalks challenge." };
}

export default async function ChallengePageRoute({ params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const n = Number(day);
  const node = JOURNEY.find((d) => d.day === n) ?? JOURNEY[Math.min(Math.max(n - 1, 0), JOURNEY.length - 1)];
  return <ChallengePage day={node.day} />;
}
