import { vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual<typeof import("next/navigation")>(
    "next/navigation",
  );

  return {
    ...actual,
    useSearchParams: () => new URLSearchParams("version=operations-transformation"),
  };
});

import CvPrintPage, { generateStaticParams } from "@/app/cv/[paper]/page";
import { getCvDocument } from "@/features/cv/data/cvVersions";

describe("CvPrintPage", () => {
  it("declares static params for each supported paper route", () => {
    expect(generateStaticParams()).toEqual([
      { paper: "a4" },
      { paper: "letter" },
    ]);
  });

  it("renders the shared document without showcase chrome", async () => {
    const document = getCvDocument("operations-transformation");

    render(
      await CvPrintPage({
        params: Promise.resolve({ paper: "letter" }),
      }),
    );

    expect(
      screen.getByRole("article", {
        name: `${document.header.fullName} CV`,
      }),
    ).toHaveAttribute("data-paper", "letter");
    expect(
      screen.getByRole("article", {
        name: `${document.header.fullName} CV`,
      }),
    ).toHaveAttribute("data-template", "two-column-with-photo");
    expect(
      screen.getByText(document.header.professionalHeadline),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 1,
        name: /Browser preview and print routing/i,
      }),
    ).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByRole("main")).toHaveAttribute("data-cv-print-ready", "true");
    });
  });
});
