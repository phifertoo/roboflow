import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageUploader from "./ImageUploader";
import "@testing-library/jest-dom";

describe("ImageUploader", () => {
  it("renders correctly", () => {
    const mockSetLoading = jest.fn();
    const mockSetResult = jest.fn();
    const mockSetImageUrl = jest.fn();

    render(
      <ImageUploader
        setLoading={mockSetLoading}
        setResult={mockSetResult}
        setImageUrl={mockSetImageUrl}
      />
    );
    expect(screen.getByText(/upload an x-ray/i)).toBeInTheDocument();
  });
});
