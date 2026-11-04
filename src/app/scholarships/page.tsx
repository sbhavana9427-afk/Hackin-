import { getScholarships } from "../../lib/neo4j";
import { Directory } from "../../components/Scholarships";
import { H1 } from "../../components/T";
export default async function Page() { const { items } = await getScholarships(); return <><H1 k="scholarships" /><Directory items={items} /></>; }
