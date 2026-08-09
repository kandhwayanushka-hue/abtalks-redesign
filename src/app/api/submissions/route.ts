import { NextResponse } from "next/server";
import { JOURNEY } from "@/data/journey";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { day, github, linkedin, note } = body;
  const n = Number(day);
  const node = JOURNEY.find((d) => d.day === n);
  if (!node) {
    return NextResponse.json({ ok: false, error: "Invalid challenge day" }, { status: 400 });
  }
  const githubUrl = typeof github === "string" ? github.trim() : "";
  const linkedinUrl = typeof linkedin === "string" ? linkedin.trim() : "";
  if (!githubUrl && !linkedinUrl) {
    return NextResponse.json(
      { ok: false, error: "Add at least a GitHub commit link or a LinkedIn post link" },
      { status: 400 }
    );
  }
  return NextResponse.json({
    ok: true,
    id: `sub-${Date.now()}`,
    day: n,
    github: githubUrl,
    linkedin: linkedinUrl,
    note: typeof note === "string" ? note.trim() : "",
    ts: Date.now(),
  });
}
