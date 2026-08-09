import { NextResponse } from "next/server";
import { CURRENT_DAY, JOURNEY } from "@/data/journey";

export const dynamic = "force-dynamic";

const started: Record<string, string> = {};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const day = Number(body?.day ?? CURRENT_DAY);
  const node = JOURNEY.find((d) => d.day === day);
  if (!node) {
    return NextResponse.json({ ok: false, error: "Invalid challenge day" }, { status: 400 });
  }
  const startedAt = started[String(day)] ?? new Date().toISOString();
  started[String(day)] = startedAt;
  return NextResponse.json({
    ok: true,
    startedAt,
    day: node.day,
    currentDay: CURRENT_DAY,
    next: `https://abtalks-redesign-fawn.vercel.app/day/${node.day}`,
  });
}
