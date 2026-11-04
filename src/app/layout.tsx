import type { Metadata } from "next";
import { Noto_Sans_Tamil, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";
import Provider from "../components/Provider";
import Nav from "../components/Nav";

const sans = Noto_Sans_Tamil({ subsets: ["tamil", "latin"], variable: "--font-sans" });
const serif = Noto_Serif_Tamil({ subsets: ["tamil", "latin"], variable: "--font-serif", weight: ["500", "700"] });
export const metadata: Metadata = { title: "NammaScholar", description: "Tamil-first AI scholarship discovery assistant for college students." };

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ta" className={`${sans.variable} ${serif.variable}`}>
      <body><Provider><Nav /><main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-ink/60">NammaScholar · Eligibility results are guidance only. Always confirm on the official source.</footer></Provider></body>
    </html>
  );
}
