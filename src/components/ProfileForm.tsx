"use client";
import { useState } from "react";
import { useApp } from "./Provider";
import type { Level, Profile } from "../lib/types";

const field = "mt-1 w-full rounded border border-line bg-white px-3 py-2";
export default function ProfileForm() {
  const { t, profile, setProfile } = useApp();
  const [p, setP] = useState<Profile>(profile);
  const [done, setDone] = useState(false);
  const num = (v: string) => (v === "" ? undefined : Number(v));
  return (
    <form className="mx-auto grid max-w-xl gap-4" onSubmit={e => { e.preventDefault(); setProfile(p); setDone(true); }}>
      <label>{t("course")}<select className={field} value={p.course ?? ""} onChange={e => setP({ ...p, course: e.target.value || undefined })}><option value="">—</option>{["Engineering", "Technology", "Arts", "Science", "Medicine", "Law", "Other"].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>{t("level")}<select className={field} value={p.level ?? ""} onChange={e => setP({ ...p, level: (e.target.value || undefined) as Level | undefined })}><option value="">—</option>{["Diploma", "UG", "PG"].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>{t("category")}<select className={field} value={p.category ?? ""} onChange={e => setP({ ...p, category: e.target.value || undefined })}><option value="">—</option>{["OC", "BC", "MBC", "SC", "ST"].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>{t("gender")}<select className={field} value={p.gender ?? ""} onChange={e => setP({ ...p, gender: e.target.value || undefined })}><option value="">—</option>{["Female", "Male", "Other"].map(x => <option key={x}>{x}</option>)}</select></label>
      <label>{t("income")}<input type="number" min={0} className={field} value={p.income ?? ""} onChange={e => setP({ ...p, income: num(e.target.value) })} /></label>
      <label>{t("percent")}<input type="number" min={0} max={100} className={field} value={p.percent ?? ""} onChange={e => setP({ ...p, percent: num(e.target.value) })} /></label>
      <button className="rounded bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark">{t("save")}</button>
      {done && <p role="status" className="text-brand">{t("saved_ok")}</p>}
    </form>
  );
}
