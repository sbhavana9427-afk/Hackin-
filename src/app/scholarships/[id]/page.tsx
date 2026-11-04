import { notFound } from "next/navigation";
import { getScholarships } from "../../../lib/neo4j";
import { Detail } from "../../../components/Scholarships";
export default async function Page({ params }: { params: { id: string } }) {
  const { items } = await getScholarships();
  const s = items.find(x => x.id === params.id);
  if (!s) notFound();
  return <Detail s={s} />;
}
