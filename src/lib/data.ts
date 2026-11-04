import type { Scholarship } from "./types";

// DEMO / SEED DATA ONLY. These are illustrative records for testing the product.
// They are NOT real scholarships: no verified deadlines, amounts or application status.
const portal = "https://scholarships.gov.in";
export const seed: Scholarship[] = [
  { id: "demo-merit-ug", name: { en: "Demo: Merit Scholarship for UG", ta: "டெமோ: இளநிலை தகுதி உதவித்தொகை" }, provider: "Demo provider",
    summary: { en: "Illustrative record for students with strong marks and moderate family income.", ta: "நல்ல மதிப்பெண்ணும் மிதமான குடும்ப வருமானமும் உள்ள மாணவர்களுக்கான மாதிரி பதிவு." },
    criteria: { levels: ["UG"], minPercent: 75, maxIncome: 800000 }, sourceUrl: portal, verifiedOn: null, deadline: null, amount: null, isDemo: true },
  { id: "demo-community-support", name: { en: "Demo: Community Education Support", ta: "டெமோ: சமூகக் கல்வி ஆதரவு" }, provider: "Demo provider",
    summary: { en: "Illustrative record for BC, MBC, SC and ST students with low family income.", ta: "குறைந்த வருமானமுள்ள BC, MBC, SC, ST மாணவர்களுக்கான மாதிரி பதிவு." },
    criteria: { categories: ["BC", "MBC", "SC", "ST"], maxIncome: 250000 }, sourceUrl: portal, verifiedOn: null, deadline: null, amount: null, isDemo: true },
  { id: "demo-girls-stem", name: { en: "Demo: Women in Engineering Support", ta: "டெமோ: பொறியியலில் பெண்கள் ஆதரவு" }, provider: "Demo provider",
    summary: { en: "Illustrative record for women studying engineering or technology.", ta: "பொறியியல் அல்லது தொழில்நுட்பம் படிக்கும் மாணவிகளுக்கான மாதிரி பதிவு." },
    criteria: { genders: ["Female"], courses: ["Engineering", "Technology"], levels: ["UG", "PG"] }, sourceUrl: portal, verifiedOn: null, deadline: null, amount: null, isDemo: true },
  { id: "demo-pg-research", name: { en: "Demo: PG Study Grant", ta: "டெமோ: முதுநிலை படிப்பு மானியம்" }, provider: "Demo provider",
    summary: { en: "Illustrative record for postgraduate students with 60%+ marks.", ta: "60%+ மதிப்பெண் பெற்ற முதுநிலை மாணவர்களுக்கான மாதிரி பதிவு." },
    criteria: { levels: ["PG"], minPercent: 60 }, sourceUrl: portal, verifiedOn: null, deadline: null, amount: null, isDemo: true },
  { id: "demo-diploma", name: { en: "Demo: Diploma Student Aid", ta: "டெமோ: டிப்ளோமா மாணவர் உதவி" }, provider: "Demo provider",
    summary: { en: "Illustrative record for diploma students with family income up to ₹3 lakh.", ta: "₹3 லட்சம் வரை வருமானமுள்ள டிப்ளோமா மாணவர்களுக்கான மாதிரி பதிவு." },
    criteria: { levels: ["Diploma"], maxIncome: 300000 }, sourceUrl: portal, verifiedOn: null, deadline: null, amount: null, isDemo: true },
];
