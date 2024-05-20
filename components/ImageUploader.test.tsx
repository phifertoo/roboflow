// import React from "react";
// import { render, fireEvent, waitFor } from "@testing-library/react";
// import ImageUploader from "./ImageUploader";
// import "@testing-library/jest-dom";

// // Mocking the global fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ predictions: "test data" }),
//   })
// ) as jest.Mock;

// describe("ImageUploader", () => {
//   beforeEach(() => {
//     (global.fetch as jest.Mock).mockClear();
//   });

//   it("renders the instruction text correctly", () => {
//     const { getByText } = render(
//       <ImageUploader
//         onImageLoad={jest.fn()}
//         setLoading={jest.fn()}
//         setResult={jest.fn()}
//       />
//     );
//     expect(
//       getByText("Instructions: Upload an x-ray to get your diagnosis.")
//     ).toBeInTheDocument();
//   });

//   it("calls the provided functions when an image is uploaded", async () => {
//     const mockOnImageLoad = jest.fn();
//     const mockSetLoading = jest.fn();
//     const mockSetResult = jest.fn();

//     const { getByTestId } = render(
//       <ImageUploader
//         onImageLoad={mockOnImageLoad}
//         setLoading={mockSetLoading}
//         setResult={mockSetResult}
//       />
//     );

//     // Mock the file input and event
//     const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
//     const input = getByTestId("file-input");
//     Object.defineProperty(input, "files", {
//       value: [file],
//     });

//     fireEvent.change(input);

//     await waitFor(() => expect(mockSetLoading).toHaveBeenCalledTimes(2)); // Called once for start and once for end
//     expect(mockSetLoading).toHaveBeenCalledWith(true); // First call with true
//     expect(mockSetLoading).toHaveBeenCalledWith(false); // Last call with false
//     expect(mockSetResult).toHaveBeenCalledWith("test data");
//     expect(mockOnImageLoad).toHaveBeenCalled();
//   });
// });
