import { describe, expect, it } from "vitest";
import { evaluate } from "../src/lib/eligibility";
import { seed } from "../src/lib/data";

const merit = seed.find(s => s.id === "demo-merit-ug")!;
describe("eligibility engine", () => {
  it("likely match when all criteria pass", () => expect(evaluate({ level: "UG", percent: 80, income: 100000 }, merit).status).toBe("likely"));
  it("needs more information when a field is missing", () => expect(evaluate({ level: "UG", percent: 80 }, merit).status).toBe("more"));
  it("not eligible when a criterion fails", () => expect(evaluate({ level: "PG", percent: 80, income: 100000 }, merit).status).toBe("not"));
  it("fail beats missing", () => expect(evaluate({ level: "PG" }, merit).status).toBe("not"));
});
