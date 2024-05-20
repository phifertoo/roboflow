import React, { useEffect, useRef, useState } from "react";
import { Container, VStack, Heading, Divider, Spinner } from "@chakra-ui/react";
import ImageUploader from "../../components/ImageUploader";
import ResultsDisplay from "../../components/ResultsDisplay";
import SampleImagesDisplay from "../../components/SampleImagesDisplay";
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
const Home = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (imageUrl && result && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, img.width, img.height);
          drawBoxes(
            result,
            ctx,
            img.width,
            img.height,
            canvas.width,
            canvas.height
          );
        };
        img.src = imageUrl;
      }
    }
  }, [imageUrl, result]);

  const drawBoxes = (
    detections,
    ctx,
    imgWidth,
    imgHeight,
    canvasWidth,
    canvasHeight
  ) => {
    const xFactor = canvasWidth / imgWidth;
    const yFactor = canvasHeight / imgHeight;
    detections.forEach((det) => {
      const { x, y, width, height, confidence, class: className } = det;
      const scaledX = (x - width / 2) * xFactor;
      const scaledY = (y - height / 2) * yFactor;
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
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid black",
            marginTop: "20px",
            width: "100%",
          }}
        />
        <Divider my={6} />
        <SampleImagesDisplay images={sampleImages} />
      </VStack>
    </Container>
  );
};

export default Home;
