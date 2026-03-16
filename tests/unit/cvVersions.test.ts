import { getCvDocument } from "@/features/cv/data/cvVersions";

describe("cvVersions", () => {
  it("provides a simpler ATS-friendly Marcel version with reordered sections", () => {
    const document = getCvDocument("ats-friendly-general");

    expect(document.id).toBe("cv_marcel_kenner_ats_friendly_general");
    expect(document.header.professionalHeadline).toBe(
      "Business & Systems Analyst | Process Improvement | Enterprise Platforms",
    );
    expect(document.sectionOrder).toEqual([
      "summary",
      "experience",
      "competencies",
      "technicalSkills",
      "languages",
    ]);
  });

  it("provides leadership and operations versions with distinct emphasis", () => {
    const leadershipDocument = getCvDocument("leadership-stakeholder");
    const operationsDocument = getCvDocument("operations-transformation");

    expect(leadershipDocument.summary.sentences[1]).toContain(
      "business stakeholders, architects, developers, UX and QA",
    );
    expect(leadershipDocument.technicalSkills[0].label).toBe(
      "Leadership and enablement",
    );
    expect(operationsDocument.competencies[0]).toBe("Operations improvement");
    expect(operationsDocument.technicalSkills[1].label).toBe(
      "Delivery and support",
    );
  });

  it("provides natural Polish CV content for the localized variant set", () => {
    const polishDocument = getCvDocument("operations-transformation", "pl");
    const polishLeadershipDocument = getCvDocument("leadership-stakeholder", "pl");

    expect(polishDocument.header.location).toBe("Poznań, woj. wielkopolskie, Polska");
    expect(polishDocument.summary.sentences[0]).toContain(
      "Analityk biznesowo-systemowy z ponad 5-letnim doświadczeniem",
    );
    expect(polishDocument.technicalSkills[1].label).toBe("Delivery i wsparcie");
    expect(polishLeadershipDocument.summary.sentences[1]).toContain(
      "biznesu, architektów, developerów, UX i QA",
    );
  });
});
