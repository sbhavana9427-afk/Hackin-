const links = [
  ["National Scholarship Portal (Government of India)", "https://scholarships.gov.in"],
  ["Tamil Nadu Government portal", "https://www.tn.gov.in"]
];
const docs = ["Aadhaar card", "Income certificate", "Community certificate", "Bonafide / study certificate", "Latest mark sheet", "Bank passbook (Aadhaar-linked)", "Passport-size photo"];
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="font-serif text-3xl font-bold">Resources · வளங்கள்</h1>
      <section><h2 className="mb-2 font-serif text-xl font-semibold">Official portals</h2>
        <ul className="space-y-1">{links.map(([n, u]) => <li key={u}><a className="text-brand underline" href={u} target="_blank" rel="noreferrer">{n}</a></li>)}</ul></section>
      <section><h2 className="mb-2 font-serif text-xl font-semibold">Documents to keep ready · தயாராக வைக்க வேண்டிய ஆவணங்கள்</h2>
        <ul className="list-disc space-y-1 pl-5">{docs.map(d => <li key={d}>{d}</li>)}</ul></section>
    </div>
  );
}
