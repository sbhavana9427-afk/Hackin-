import Link from "next/link";
import { getScholarships } from "../lib/neo4j";
import { Summary } from "../components/Scholarships";
import { T } from "../components/T";

export default async function Home() {
  const { items } = await getScholarships();
  return (
    <div className="space-y-10">
      <section className="space-y-6 rounded-2xl bg-brand p-8 text-white md:p-14">
        <h1 className="max-w-3xl font-serif text-3xl font-bold leading-tight md:text-5xl"><T k="tagline" /></h1>
        <p className="max-w-2xl text-white/85"><T k="sub" /></p>
        <Summary items={items} />
        <Link href="/assistant" className="inline-block rounded border border-white/60 px-5 py-2 hover:bg-white/10"><T k="assistant" /></Link>
      </section>
    </div>
  );
}
