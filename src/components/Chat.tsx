"use client";
import { useState } from "react";
import { useApp } from "./Provider";

type Msg = { role: "me" | "bot"; text: string };
export default function Chat() {
  const { t, lang } = useApp();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  async function send(e: React.FormEvent) {
    e.preventDefault();
    const message = input.trim();
    if (!message || busy) return;
    setMsgs(m => [...m, { role: "me", text: message }]); setInput(""); setBusy(true);
    try {
      const r = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message, lang }) });
      const d = await r.json();
      setMsgs(m => [...m, { role: "bot", text: d.reply ?? d.error }]);
    } catch { setMsgs(m => [...m, { role: "bot", text: "Network error. Please try again." }]); }
    setBusy(false);
  }
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div aria-live="polite" className="min-h-[280px] space-y-3 rounded-lg border border-line bg-white p-4">
        {msgs.map((m, i) => <p key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-2 text-sm ${m.role === "me" ? "ml-auto bg-brand text-white" : "bg-brand-soft"}`}>{m.text}</p>)}
        {busy && <p className="text-sm text-ink/60">{t("thinking")}</p>}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder={t("askPh")} aria-label={t("askPh")} maxLength={500} className="flex-1 rounded border border-line bg-white px-3 py-2" />
        <button disabled={busy} className="rounded bg-brand px-5 py-2 text-white disabled:opacity-50">{t("ask")}</button>
      </form>
    </div>
  );
}
