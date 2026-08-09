import { NextResponse } from "next/server";
import { JOURNEY } from "@/data/journey";
import { getChallengeContent } from "@/lib/challenge";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ day: string }> }) {
  const { day } = await params;
  const n = Number(day);
  const node = JOURNEY.find((d) => d.day === n);
  if (!node) {
    return NextResponse.json({ ok: false, error: "Challenge day not found" }, { status: 404 });
  }
  return NextResponse.json({
    ok: true,
    day: node.day,
    title: node.title,
    blurb: node.blurb,
    skill: node.skill,
    level: node.level,
    minutes: node.minutes,
    ...getChallengeContent(n),
  });
}
