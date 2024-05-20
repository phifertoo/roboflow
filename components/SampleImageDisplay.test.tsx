import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SampleImagesDisplay from "./SampleImageDisplay";
import "@testing-library/jest-dom";

describe("SampleImageDisplay", () => {
  const sampleImages = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  it("renders the heading and text correctly", () => {
    const { getByText } = render(<SampleImagesDisplay images={sampleImages} />);

    expect(getByText("Sample Images")).toBeInTheDocument();
    expect(
      getByText(
        "If you have no x-rays and just want to test out the model, feel free to use the images below."
      )
    ).toBeInTheDocument();
  });

  it("renders all provided images", () => {
    const { getAllByRole } = render(
      <SampleImagesDisplay images={sampleImages} />
    );
    const images = getAllByRole("img");

    expect(images.length).toBe(sampleImages.length);
    images.forEach((img, index) => {
      expect(img).toHaveAttribute("src", sampleImages[index]);
      expect(img).toHaveAttribute("alt", `Sample ${index + 1}`);
    });
  });

  it("each image is wrapped in a link that points to the correct URL", () => {
    const { getAllByRole } = render(
      <SampleImagesDisplay images={sampleImages} />
    );
    const links = getAllByRole("link");

    expect(links.length).toBe(sampleImages.length);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", sampleImages[index]);
    });
  });
});
