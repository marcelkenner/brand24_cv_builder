import {
  defaultCvLocale,
  isCvLocale,
  parseCvLocale,
  resolveCvLocale,
} from "@/features/cv/domain/cvLocale";

describe("cvLocale", () => {
  it("recognizes only supported locales", () => {
    expect(isCvLocale("en")).toBe(true);
    expect(isCvLocale("pl")).toBe(true);
    expect(isCvLocale("de")).toBe(false);
    expect(parseCvLocale("pl")).toBe("pl");
    expect(parseCvLocale("de")).toBeNull();
  });

  it("falls back to English for unsupported or repeated locale values", () => {
    expect(resolveCvLocale("pl")).toBe("pl");
    expect(resolveCvLocale("de")).toBe(defaultCvLocale);
    expect(resolveCvLocale(["pl", "en"])).toBe(defaultCvLocale);
    expect(resolveCvLocale(undefined)).toBe(defaultCvLocale);
  });
});
