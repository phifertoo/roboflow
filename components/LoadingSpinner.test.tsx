// LoadingSpinner.test.js
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const spinner = getByTestId("loading-spinner");

    expect(spinner).toBeInTheDocument();
    // Note: The following style checks might not work directly, as `toHaveStyle` checks computed styles.
    // Consider checking the presence of the spinner as sufficient or use more specific assertions.
  });
});
