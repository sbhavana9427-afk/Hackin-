"use client";
import Link from "next/link";
import { useState } from "react";
import { useApp } from "./Provider";
import { evaluate } from "../lib/eligibility";
import type { Scholarship, Status } from "../lib/types";

const tone: Record<Status, string> = { likely: "bg-brand text-white", more: "bg-saffron-soft text-ink border border-saffron", not: "bg-white text-ink/70 border border-line" };

export function StatusBadge({ s }: { s: Status }) {
  const { t } = useApp();
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${tone[s]}`}>{t(s)}</span>;
}

export function Card({ s }: { s: Scholarship }) {
  const { lang, t, profile, saved, toggleSaved } = useApp();
  const ev = evaluate(profile, s);
  const on = saved.includes(s.id);
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-lg font-semibold leading-snug">{s.name[lang]}</h3>
        <StatusBadge s={ev.status} />
      </div>
      <p className="text-sm leading-relaxed text-ink/80">{s.summary[lang]}</p>
      {s.isDemo && <p className="text-xs text-ink/60">{t("demoNote")}</p>}
      <div className="mt-auto flex gap-2">
        <Link href={`/scholarships/${s.id}`} className="rounded bg-brand px-4 py-2 text-sm text-white hover:bg-brand-dark">{t("open")}</Link>
        <button onClick={() => toggleSaved(s.id)} aria-pressed={on} className="rounded border border-brand px-4 py-2 text-sm text-brand hover:bg-brand-soft">{on ? t("unsave") : t("saveItem")}</button>
      </div>
    </article>
  );
}

export function Directory({ items, savedOnly = false }: { items: Scholarship[]; savedOnly?: boolean }) {
  const { lang, t, profile, saved } = useApp();
  const [q, setQ] = useState("");
  const [f, setF] = useState<Status | "all">("all");
  const shown = items.filter(s => (!savedOnly || saved.includes(s.id)) && s.name[lang].toLowerCase().includes(q.toLowerCase()) && (f === "all" || evaluate(profile, s).status === f));
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <input aria-label={t("search")} placeholder={t("search")} value={q} onChange={e => setQ(e.target.value)} className="min-w-[220px] flex-1 rounded border border-line bg-white px-3 py-2" />
        <select aria-label="Filter" value={f} onChange={e => setF(e.target.value as Status | "all")} className="rounded border border-line bg-white px-3 py-2">
          <option value="all">{t("all")}</option>
          {(["likely", "more", "not"] as const).map(k => <option key={k} value={k}>{t(k)}</option>)}
        </select>
      </div>
      {shown.length ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{shown.map(s => <Card key={s.id} s={s} />)}</div>
        : <p className="rounded border border-dashed border-line p-8 text-center text-ink/70">{savedOnly && !saved.length ? t("emptySaved") : t("empty")}</p>}
    </div>
  );
}

export function Detail({ s }: { s: Scholarship }) {
  const { lang, t, profile, saved, toggleSaved } = useApp();
  const ev = evaluate(profile, s);
  const mark = { pass: "✓", fail: "✕", missing: "?" };
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="space-y-2"><StatusBadge s={ev.status} /><h1 className="font-serif text-3xl font-bold">{s.name[lang]}</h1><p className="text-ink/80">{s.summary[lang]}</p></div>
      {s.isDemo && <p className="rounded border border-saffron bg-saffron-soft p-3 text-sm">{t("demoNote")}</p>}
      <section aria-labelledby="why" className="rounded-lg border border-line bg-white p-5">
        <h2 id="why" className="mb-3 font-serif text-xl font-semibold">{t("why")}</h2>
        <ul className="space-y-2">{ev.reasons.map((r, i) => (
          <li key={i} className="flex gap-3 text-sm"><span aria-hidden className={`font-bold ${r.result === "pass" ? "text-brand" : r.result === "fail" ? "text-red-700" : "text-saffron"}`}>{mark[r.result]}</span>{r[lang]}</li>
        ))}</ul>
        {ev.status === "more" && <Link href="/profile" className="mt-4 inline-block text-sm text-brand underline">{t("profile")}</Link>}
      </section>
      <dl className="grid gap-3 rounded-lg border border-line bg-white p-5 text-sm sm:grid-cols-2">
        <div><dt className="text-ink/60">{t("source")}</dt><dd><a className="break-all text-brand underline" href={s.sourceUrl} target="_blank" rel="noreferrer">{s.sourceUrl}</a></dd></div>
        <div><dt className="text-ink/60">{t("verified")}</dt><dd>{s.verifiedOn ?? t("notVerified")}</dd></div>
        <div><dt className="text-ink/60">{t("deadline")}</dt><dd>{s.deadline ?? t("unknown")}</dd></div>
      </dl>
      <button onClick={() => toggleSaved(s.id)} className="rounded border border-brand px-5 py-2 text-brand hover:bg-brand-soft">{saved.includes(s.id) ? t("unsave") : t("saveItem")}</button>
    </div>
  );
}

export function Summary({ items }: { items: Scholarship[] }) {
  const { t, profile } = useApp();
  const has = Object.keys(profile).length > 0;
  const c = { likely: 0, more: 0, not: 0 };
  items.forEach(s => c[evaluate(profile, s).status]++);
  if (!has) return <Link href="/profile" className="inline-block rounded bg-saffron px-6 py-3 font-semibold text-ink hover:brightness-95">{t("fillProfile")}</Link>;
  return (
    <div className="grid max-w-xl grid-cols-3 gap-3 text-center">
      {([["likely", "matches"], ["more", "needInfo"], ["not", "ok"]] as const).map(([k, l]) => (
        <Link key={k} href="/scholarships" className="rounded-lg bg-white/10 p-4 ring-1 ring-white/25 hover:bg-white/20"><div className="font-serif text-3xl font-bold">{c[k]}</div><div className="text-xs">{t(l)}</div></Link>
      ))}
    </div>
  );
}
