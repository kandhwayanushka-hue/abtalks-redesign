import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LIVE_MENTORS } from "@/lib/mentors";
import MentorView from "@/components/mentor/MentorView";

export const dynamicParams = false;

export function generateStaticParams() {
  return LIVE_MENTORS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const mentor = LIVE_MENTORS.find((m) => m.id === id);
  if (!mentor) return { title: "Mentor · ABTalks Redesigned" };
  return { title: `${mentor.name} · ${mentor.specialty} · ABTalks Redesigned`, description: `Chat live with ${mentor.name}, your ${mentor.specialty.toLowerCase()}.` };
}

export default async function MentorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mentor = LIVE_MENTORS.find((m) => m.id === id);
  if (!mentor) notFound();
  return <MentorView mentor={mentor} />;
}
