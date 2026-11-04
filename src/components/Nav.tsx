"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "./Provider";

const links = [["/", "home"], ["/scholarships", "scholarships"], ["/saved", "saved"], ["/assistant", "assistant"], ["/resources", "resources"], ["/profile", "profile"]];
export default function Nav() {
  const { t, lang, setLang } = useApp();
  const path = usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="font-serif text-xl font-bold text-brand">{t("app")}</Link>
        <nav aria-label="Main" className="flex flex-1 flex-wrap gap-1 text-sm">
          {links.map(([href, k]) => (
            <Link key={href} href={href} aria-current={path === href ? "page" : undefined}
              className={`rounded px-3 py-1.5 ${path === href ? "bg-brand text-white" : "text-ink hover:bg-brand-soft"}`}>{t(k)}</Link>
          ))}
        </nav>
        <div role="group" aria-label="Language" className="flex overflow-hidden rounded border border-brand text-sm">
          {(["ta", "en"] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`px-3 py-1 ${lang === l ? "bg-brand text-white" : "text-brand"}`}>{l === "ta" ? "தமிழ்" : "EN"}</button>
          ))}
        </div>
      </div>
    </header>
  );
}
