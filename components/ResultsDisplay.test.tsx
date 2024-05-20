import React from "react";
import { render, screen } from "@testing-library/react";
import ResultsDisplay from "./ResultsDisplay"; // Adjust the import path according to your file structure
import "@testing-library/jest-dom";

describe("ResultsDisplay", () => {
  it("renders nothing when there are no results", () => {
    render(<ResultsDisplay results={[]} />);
    const messages = screen.queryByText(/Detected a/);
    expect(messages).toBeNull();
  });

  it("does not display detections with confidence below 70%", () => {
    const results = [
      {
        class: "radius",
        confidence: 0.65,
        index: 1,
      },
    ];
    render(<ResultsDisplay results={results} />);
    const message = screen.queryByText(/Detected a/);
    expect(message).toBeNull();
  });
});
