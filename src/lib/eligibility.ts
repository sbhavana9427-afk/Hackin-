import type { Evaluation, Profile, Reason, Scholarship } from "./types";

// Deterministic rules only. No AI is involved in deciding eligibility.
export function evaluate(p: Profile, s: Scholarship): Evaluation {
  const c = s.criteria;
  const reasons: Reason[] = [];
  const add = (known: boolean, ok: boolean, en: string, ta: string, missEn: string, missTa: string) =>
    reasons.push(known ? { result: ok ? "pass" : "fail", en, ta } : { result: "missing", en: missEn, ta: missTa });

  if (c.maxIncome !== undefined)
    add(p.income !== undefined, (p.income ?? 0) <= c.maxIncome, `Family income up to ₹${c.maxIncome.toLocaleString("en-IN")} required`,
      `குடும்ப வருமானம் ₹${c.maxIncome.toLocaleString("en-IN")} வரை இருக்க வேண்டும்`, "Add your family income", "குடும்ப வருமானத்தைச் சேர்க்கவும்");
  if (c.categories)
    add(!!p.category, c.categories.includes(p.category ?? ""), `Open to: ${c.categories.join(", ")}`, `தகுதி: ${c.categories.join(", ")}`, "Add your community category", "சமூகப் பிரிவைச் சேர்க்கவும்");
  if (c.levels)
    add(!!p.level, c.levels.includes(p.level!), `Study level: ${c.levels.join(", ")}`, `படிப்பு நிலை: ${c.levels.join(", ")}`, "Add your study level", "படிப்பு நிலையைச் சேர்க்கவும்");
  if (c.genders)
    add(!!p.gender, c.genders.includes(p.gender ?? ""), `Open to: ${c.genders.join(", ")}`, `தகுதி: ${c.genders.join(", ")}`, "Add your gender", "பாலினத்தைச் சேர்க்கவும்");
  if (c.minPercent !== undefined)
    add(p.percent !== undefined, (p.percent ?? 0) >= c.minPercent, `Minimum ${c.minPercent}% marks`, `குறைந்தபட்சம் ${c.minPercent}% மதிப்பெண்`, "Add your latest marks %", "சமீபத்திய மதிப்பெண் %-ஐச் சேர்க்கவும்");
  if (c.courses)
    add(!!p.course, c.courses.includes(p.course ?? ""), `Courses: ${c.courses.join(", ")}`, `பாடப்பிரிவுகள்: ${c.courses.join(", ")}`, "Add your course", "உங்கள் பாடப்பிரிவைச் சேர்க்கவும்");

  const status = reasons.some(r => r.result === "fail") ? "not" : reasons.some(r => r.result === "missing") ? "more" : "likely";
  return { status, reasons };
}
