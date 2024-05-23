// Import necessary React hooks and Chakra UI components
import { useEffect, useRef, useState } from "react";
import { Container, VStack, Heading, Divider, Spinner } from "@chakra-ui/react";

// Import custom components for image uploading and displaying results and sample images
import ImageUploader from "../../components/ImageUploader";
import ResultsDisplay from "../../components/ResultsDisplay";
import SampleImagesDisplay from "../../components/SampleImagesDisplay";

// Import React (redundant, as React is already imported for hooks)
import React from "react";

// Array of sample image URLs
const sampleImages = [
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00042.rf.9faad0f1666ce6185ceedad078af6b6e.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00054.rf.2bb037f2857270a135320ce195b1cad8.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00153.rf.9d120a6718faf1b10a2ac7cc68efc805.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00216.rf.d523b8e7a4381a0a169afbff03c2e798.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00215.rf.2a9e359cd3b1f4c88be3ef88fdddb2ee.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00214.rf.91ca187b8bdc7bf4068a1d7df53c0838.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00213.rf.a115dc2766fefe93f77af15b86143ce2.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00212.rf.e1e15d2127d26e08579cd7375d239604.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00211.rf.7194d80c31729d6fddf74cba5de7f7a6.jpg",
  "https://mustash01.s3.us-west-1.amazonaws.com/imageResized-00210.rf.e6633854d48b98cd93153adb018110d2.jpg",
];

// Define the main React functional component
const Home = () => {
  // State hooks for managing image URL, results, and loading state
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ref hook to reference the HTML canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Effect hook to handle image loading and drawing on canvas when image or results change
  useEffect(() => {
    // Check if imageUrl, result, and canvasRef.current are truthy, meaning they are not null or undefined
    if (imageUrl && result && canvasRef.current) {
      const canvas = canvasRef.current; // Access the current canvas reference
      const ctx = canvas.getContext("2d"); // Get the 2D rendering context for drawing on the canvas
      const img = new Image(); // Create a new HTMLImageElement instance

      // Set up the onload event handler for the image loading process
      img.onload = () => {
        canvas.width = img.width; // Set the canvas width to the image width
        canvas.height = img.height; // Set the canvas height to the image height
        ctx?.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas to prepare for new drawing
        ctx?.drawImage(img, 0, 0, img.width, img.height); // Draw the image onto the canvas at position (0,0)

        // Call drawBoxes to draw bounding boxes around detected objects
        drawBoxes(
          result,
          ctx,
          img.width,
          img.height,
          canvas.width,
          canvas.height
        );
      };

      img.src = imageUrl; // Set the source of the image element to the imageUrl, starting the loading process
    }
  }, [imageUrl, result]); // Depend on imageUrl and result for updates

  // Function to draw bounding boxes on the canvas
  const drawBoxes = (
    detections,
    ctx,
    imgWidth,
    imgHeight,
    canvasWidth,
    canvasHeight
  ) => {
    const xFactor = canvasWidth / imgWidth; // Calculate scaling factor for width
    const yFactor = canvasHeight / imgHeight; // Calculate scaling factor for height
    detections.forEach((det) => {
      const { x, y, width, height, confidence, class: className } = det;
      const centerX = x - width / 2;
      const centerY = y - height / 2;
      const scaledX = centerX * xFactor;
      const scaledY = centerY * yFactor;
      const scaledWidth = width * xFactor;
      const scaledHeight = height * yFactor;
      const text = `${className} (${(confidence * 100).toFixed(1)}%)`;

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
      ctx.fillStyle = "red";
      ctx.font = "16px Arial";
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(scaledX, scaledY - 18, textWidth, 18);
      ctx.fillStyle = "white";
      ctx.fillText(text, scaledX, scaledY - 4);
    });
  };

  // Render the UI components in a container with vertical stacking
  return (
    <Container maxW="container.xl">
      <VStack spacing={8} my={5}>
        <Heading>Did I Fracture a Bone?</Heading>
        <ImageUploader
          setLoading={setLoading}
          setResult={setResult}
          setImageUrl={setImageUrl}
        />
        {loading ? (
          <Spinner
            size="xl"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        ) : (
          result && <ResultsDisplay results={result} />
        )}
        {/* draw boxes */}
        {result && (
          <canvas
            ref={canvasRef}
            style={{
              border: "1px solid black",
              marginTop: "20px",
              width: "50%",
            }}
          />
        )}
        <Divider my={6} />
        <SampleImagesDisplay images={sampleImages} />
      </VStack>
    </Container>
  );
};

export default Home;
