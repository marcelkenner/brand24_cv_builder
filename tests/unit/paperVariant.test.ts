import {
  cvPaperMetadata,
  isCvPaperVariant,
  parseCvPaperVariant,
  resolveCvPaperVariant,
} from "@/features/cv/domain/paperVariant";

describe("paperVariant", () => {
  it("keeps the supported paper metadata aligned with visible labels", () => {
    expect(cvPaperMetadata.a4.label).toBe("A4 Portrait");
    expect(cvPaperMetadata.letter.label).toBe("US Letter Portrait");
  });

  it("recognizes only supported paper variants", () => {
    expect(isCvPaperVariant("a4")).toBe(true);
    expect(isCvPaperVariant("letter")).toBe(true);
    expect(isCvPaperVariant("legal")).toBe(false);
    expect(parseCvPaperVariant("letter")).toBe("letter");
    expect(parseCvPaperVariant("legal")).toBeNull();
  });

  it("falls back to a4 for unsupported or repeated query values", () => {
    expect(resolveCvPaperVariant("letter")).toBe("letter");
    expect(resolveCvPaperVariant("a4")).toBe("a4");
    expect(resolveCvPaperVariant("legal")).toBe("a4");
    expect(resolveCvPaperVariant(["letter", "a4"])).toBe("a4");
    expect(resolveCvPaperVariant(undefined)).toBe("a4");
  });
});
