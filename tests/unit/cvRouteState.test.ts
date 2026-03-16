import {
  defaultCvPrintRouteState,
  defaultCvShowcaseRouteState,
  resolveCvPrintRouteState,
  resolveCvShowcaseRouteState,
} from "@/features/cv/domain/cvRouteState";

describe("cvRouteState", () => {
  it("keeps English defaults for showcase and print routes", () => {
    expect(defaultCvShowcaseRouteState).toMatchObject({
      locale: "en",
      paper: "a4",
      template: "single-column-with-photo",
      version: "ai-adoption-manager",
    });
    expect(defaultCvPrintRouteState).toMatchObject({
      locale: "en",
      template: "single-column-with-photo",
      version: "ai-adoption-manager",
    });
  });

  it("resolves the combined showcase route state including Polish locale", () => {
    const state = resolveCvShowcaseRouteState(
      new URLSearchParams(
        "lang=pl&paper=letter&version=operations-transformation&template=two-column-without-photo",
      ),
    );

    expect(state).toEqual({
      locale: "pl",
      paper: "letter",
      template: "two-column-without-photo",
      version: "operations-transformation",
    });
  });

  it("falls back safely for invalid route state values", () => {
    expect(
      resolveCvShowcaseRouteState(
        new URLSearchParams("lang=de&paper=ledger&version=unknown&template=broken"),
      ),
    ).toEqual(defaultCvShowcaseRouteState);
    expect(
      resolveCvPrintRouteState(
        new URLSearchParams("lang=pl&version=leadership-stakeholder"),
      ),
    ).toEqual({
      locale: "pl",
      template: "two-column-with-photo",
      version: "leadership-stakeholder",
    });
  });
});
