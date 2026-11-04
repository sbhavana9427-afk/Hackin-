import { getScholarships } from "../../lib/neo4j";
export default async function Page() {
  const { items, source } = await getScholarships();
  return (
    <div className="space-y-4">
      <h1 className="font-serif text-3xl font-bold">Admin</h1>
      <p className="text-sm">Data source: <strong>{source === "neo4j" ? "Neo4j" : "Demo seed data (Neo4j not configured)"}</strong></p>
      <div className="overflow-x-auto"><table className="w-full border border-line bg-white text-left text-sm">
        <thead className="bg-brand-soft"><tr><th className="p-2">ID</th><th className="p-2">Name</th><th className="p-2">Demo</th><th className="p-2">Verified on</th><th className="p-2">Source</th></tr></thead>
        <tbody>{items.map(s => <tr key={s.id} className="border-t border-line"><td className="p-2">{s.id}</td><td className="p-2">{s.name.en}</td><td className="p-2">{s.isDemo ? "Yes" : "No"}</td><td className="p-2">{s.verifiedOn ?? "Not verified"}</td><td className="p-2 break-all">{s.sourceUrl}</td></tr>)}</tbody>
      </table></div>
    </div>
  );
}
