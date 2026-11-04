export type Lang = "ta" | "en";
export type Level = "Diploma" | "UG" | "PG";
export type Profile = { course?: string; level?: Level; category?: string; gender?: string; income?: number; percent?: number };
export type Criteria = { maxIncome?: number; categories?: string[]; levels?: Level[]; genders?: string[]; minPercent?: number; courses?: string[] };
export type Scholarship = {
  id: string; name: { en: string; ta: string }; provider: string; summary: { en: string; ta: string };
  criteria: Criteria; sourceUrl: string; verifiedOn: string | null; deadline: string | null; amount: string | null; isDemo: boolean;
};
export type Status = "likely" | "more" | "not";
export type Reason = { result: "pass" | "fail" | "missing"; en: string; ta: string };
export type Evaluation = { status: Status; reasons: Reason[] };
