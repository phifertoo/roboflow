import React from "react";
import { render, screen } from "@testing-library/react";
import SampleImagesDisplay from "./SampleImagesDisplay"; // Adjust the import path according to your project structure
import "@testing-library/jest-dom";

describe("SampleImagesDisplay", () => {
  it("renders the component with no images when the images array is empty", () => {
    render(<SampleImagesDisplay images={[]} />);
    const heading = screen.getByText("Sample Images");
    expect(heading).toBeInTheDocument();
    const images = screen.queryAllByRole("img");
    expect(images.length).toBe(0);
  });

  it("renders the correct number of images", () => {
    const testImages = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ];
    render(<SampleImagesDisplay images={testImages} />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(testImages.length);
  });

  it("each image has the correct source and alt text", () => {
    const testImages = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ];
    render(<SampleImagesDisplay images={testImages} />);
    testImages.forEach((src, index) => {
      const image = screen.getByAltText(`Sample ${index + 1}`);
      expect(image).toHaveAttribute("src", src);
    });
  });
});
