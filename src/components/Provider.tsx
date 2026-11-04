"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dict } from "../lib/i18n";
import type { Lang, Profile } from "../lib/types";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; profile: Profile; setProfile: (p: Profile) => void; saved: string[]; toggleSaved: (id: string) => void; t: (k: string) => string };
const C = createContext<Ctx>(null as unknown as Ctx);
export const useApp = () => useContext(C);

function load<T>(k: string, d: T): T { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } }
function store(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

export default function Provider({ children }: { children: ReactNode }) {
  const [lang, setL] = useState<Lang>("ta");
  const [profile, setP] = useState<Profile>({});
  const [saved, setS] = useState<string[]>([]);
  useEffect(() => { setL(load("ns.lang", "ta")); setP(load("ns.profile", {})); setS(load("ns.saved", [])); }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const value: Ctx = {
    lang, setLang: l => { setL(l); store("ns.lang", l); },
    profile, setProfile: p => { setP(p); store("ns.profile", p); },
    saved, toggleSaved: id => { const n = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id]; setS(n); store("ns.saved", n); },
    t: k => dict[lang][k] ?? k
  };
  return <C.Provider value={value}>{children}</C.Provider>;
}
