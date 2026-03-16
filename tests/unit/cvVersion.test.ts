import {
  cvVersionMetadata,
  defaultCvVersion,
  isCvVersion,
  parseCvVersion,
  resolveCvVersion,
} from "@/features/cv/domain/cvVersion";
import { getCvVersionContent } from "@/features/cv/data/cvVersionContent";

describe("cvVersion", () => {
  it("keeps the supported version metadata aligned with template defaults", () => {
    expect(getCvVersionContent("en", "ats-friendly-general").recruiterTitle).toBe(
      "ATS-Friendly General",
    );
    expect(getCvVersionContent("pl", "ats-friendly-general").recruiterTitle).toBe(
      "Wersja ogólna pod ATS",
    );
    expect(cvVersionMetadata["operations-transformation"].defaultTemplate).toBe(
      "two-column-with-photo",
    );
  });

  it("recognizes only supported recruiter-facing CV versions", () => {
    expect(isCvVersion("leadership-stakeholder")).toBe(true);
    expect(isCvVersion("leadership")).toBe(false);
    expect(parseCvVersion("operations-transformation")).toBe(
      "operations-transformation",
    );
    expect(parseCvVersion("operations")).toBeNull();
  });

  it("falls back to the default version for unsupported or repeated query values", () => {
    expect(resolveCvVersion("ats-friendly-general")).toBe(
      "ats-friendly-general",
    );
    expect(resolveCvVersion("unknown")).toBe(defaultCvVersion);
    expect(resolveCvVersion(["ats-friendly-general", "letter"])).toBe(
      defaultCvVersion,
    );
    expect(resolveCvVersion(undefined)).toBe(defaultCvVersion);
  });
});
