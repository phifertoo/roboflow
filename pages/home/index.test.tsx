import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Home from "./";
import "@testing-library/jest-dom";

// Mock the child components
jest.mock("../../components/ImageUploader", () => (props) => (
  <button onClick={() => props.onImageLoad("test-url")}>Upload Image</button>
));
jest.mock("../../components/ResultsDisplay", () => () => (
  <div>Results Display</div>
));
jest.mock("../../components/SampleImagesDisplay", () => () => (
  <div>Sample Images</div>
));

describe("Home", () => {
  it("renders correctly with initial state", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Did I Fracture a Bone?")).toBeInTheDocument();
    expect(getByText("Sample Images")).toBeInTheDocument();
  });
});
