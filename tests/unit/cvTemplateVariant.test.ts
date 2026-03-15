import {
  cvTemplateMetadata,
  defaultCvTemplateVariant,
  isCvTemplateVariant,
  parseCvTemplateVariant,
  resolveCvTemplateVariant,
} from "@/features/cv/domain/cvTemplateVariant";

describe("cvTemplateVariant", () => {
  it("keeps the supported template metadata aligned with visible labels", () => {
    expect(cvTemplateMetadata["single-column-with-photo"].label).toBe(
      "Single column with photo",
    );
    expect(cvTemplateMetadata["two-column-without-photo"].label).toBe(
      "Two column without photo",
    );
  });

  it("recognizes only supported template variants", () => {
    expect(isCvTemplateVariant("single-column-with-photo")).toBe(true);
    expect(isCvTemplateVariant("two-column-without-photo")).toBe(true);
    expect(isCvTemplateVariant("three-column")).toBe(false);
    expect(parseCvTemplateVariant("two-column-with-photo")).toBe(
      "two-column-with-photo",
    );
    expect(parseCvTemplateVariant("three-column")).toBeNull();
  });

  it("falls back to the default template for unsupported or repeated query values", () => {
    expect(resolveCvTemplateVariant("two-column-with-photo")).toBe(
      "two-column-with-photo",
    );
    expect(resolveCvTemplateVariant("three-column")).toBe(
      defaultCvTemplateVariant,
    );
    expect(resolveCvTemplateVariant(["two-column-with-photo", "a4"])).toBe(
      defaultCvTemplateVariant,
    );
    expect(resolveCvTemplateVariant(undefined)).toBe(defaultCvTemplateVariant);
    expect(
      resolveCvTemplateVariant(
        "unsupported",
        "two-column-without-photo",
      ),
    ).toBe("two-column-without-photo");
  });
});
