import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, college } = body ?? {};
    return NextResponse.json({
      ok: Boolean(name && email && college),
      code: "HET9HA",
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
