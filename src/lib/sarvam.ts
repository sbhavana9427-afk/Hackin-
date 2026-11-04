import type { Lang, Scholarship } from "./types";

export async function askSarvam(message: string, lang: Lang, records: Scholarship[]): Promise<string> {
  const key = process.env.SARVAM_API_KEY;
  const context = records.map(r => ({ id: r.id, name: r.name.en, provider: r.provider, criteria: r.criteria, sourceUrl: r.sourceUrl, verifiedOn: r.verifiedOn, demo: r.isDemo }));
  if (!key) {
    const list = records.map(r => `• ${r.name[lang]} — ${r.sourceUrl}`).join("\n");
    return lang === "ta" ? `AI உதவியாளர் இன்னும் இணைக்கப்படவில்லை. கிடைக்கும் பதிவுகள்:\n${list}` : `The AI assistant is not configured yet. Available records:\n${list}`;
  }
  const system = `You are NammaScholar, a scholarship guide for college students in Tamil Nadu. Reply in ${lang === "ta" ? "Tamil" : "English"}, briefly and plainly.
Rules: use ONLY the records below. Always cite the sourceUrl and verifiedOn date (say "not verified" if null). Never invent deadlines, award amounts, eligibility or application status. If a record is demo, say so. If unsure, say you don't know and point to the official source.
Records: ${JSON.stringify(context)}`;
  const res = await fetch("https://api.sarvam.ai/v1/chat/completions", {
    method: "POST", headers: { "Content-Type": "application/json", "api-subscription-key": key },
    body: JSON.stringify({ model: "sarvam-m", temperature: 0.2, messages: [{ role: "system", content: system }, { role: "user", content: message }] })
  });
  if (!res.ok) throw new Error(`Sarvam ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}
