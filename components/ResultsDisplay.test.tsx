import React from "react";
import { render } from "@testing-library/react";
import ResultsDisplay from "./ResultsDisplay";
import "@testing-library/jest-dom";

describe("ResultsDisplay", () => {
  it("renders results only with confidence greater than 0.7", () => {
    const mockResults = [
      { class: "radius", confidence: 0.75 },
      { class: "ulna", confidence: 0.65 }, // Should not be displayed
    ];
    const { getByText, queryByText } = render(
      <ResultsDisplay results={mockResults} />
    );

    expect(getByText(/radius/)).toBeInTheDocument();
    expect(getByText(/75.0%/)).toBeInTheDocument();
    expect(queryByText(/ulna/)).not.toBeInTheDocument();
  });
});
