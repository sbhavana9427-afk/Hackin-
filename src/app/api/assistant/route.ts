import { NextResponse } from "next/server";
import { z } from "zod";
import { getScholarships } from "../../../lib/neo4j";
import { askSarvam } from "../../../lib/sarvam";

const Body = z.object({ message: z.string().min(1).max(500), lang: z.enum(["ta", "en"]) });

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  try {
    const { items } = await getScholarships();
    const reply = await askSarvam(parsed.data.message, parsed.data.lang, items);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Assistant unavailable. Please try again." }, { status: 502 });
  }
}
