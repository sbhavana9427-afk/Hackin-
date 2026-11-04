import neo4j from "neo4j-driver";
import { seed } from "./data";
import type { Scholarship } from "./types";

// Reads Scholarship nodes (property `json` holds the record). Falls back to labelled demo data.
export async function getScholarships(): Promise<{ items: Scholarship[]; source: "neo4j" | "demo" }> {
  const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env;
  if (!NEO4J_URI || !NEO4J_USER || !NEO4J_PASSWORD) return { items: seed, source: "demo" };
  const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  try {
    const res = await driver.session().run("MATCH (s:Scholarship) RETURN s.json AS json");
    const items = res.records.map(r => JSON.parse(r.get("json")) as Scholarship);
    return items.length ? { items, source: "neo4j" } : { items: seed, source: "demo" };
  } catch {
    return { items: seed, source: "demo" };
  } finally {
    await driver.close();
  }
}
