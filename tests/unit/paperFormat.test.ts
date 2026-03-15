import {
  cvPaperFormats,
  getCvPaperFormat,
} from "@/features/cv/server/paperFormat";

describe("paperFormat", () => {
  it("maps each supported paper variant to an explicit Playwright format", () => {
    expect(cvPaperFormats).toEqual({
      a4: "A4",
      letter: "Letter",
    });
    expect(getCvPaperFormat("a4")).toBe("A4");
    expect(getCvPaperFormat("letter")).toBe("Letter");
  });
});
