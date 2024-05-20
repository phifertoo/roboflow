import { useState, useRef, useEffect } from "react";
import {
  Grid,
  GridItem,
  Image,
  Input,
  VStack,
  Text,
  Link,
  Heading,
  Container,
} from "@chakra-ui/react";

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

const renderResults = (detections) => {
  return detections.map((det, index) => {
    if (det.confidence > 0.7) {
      // Only display high confidence detections
      return (
        <Text key={index} fontSize="md" p={2} bg="gray.100" rounded="md" mb={2}>
          Detected a <strong>{det.class}</strong> with a confidence of{" "}
          <strong>{(det.confidence * 100).toFixed(1)}%</strong>. This may
          indicate a fracture. Please consult a healthcare provider for a
          thorough examination.
        </Text>
      );
    }
    return null;
  });
};

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (imageUrl && result && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new window.Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
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

      // Assuming the x, y are the center of the box, adjust to top-left corner
      const centerX = x - width / 2;
      const centerY = y - height / 2;

      // Scale the box dimensions
      const scaledX = centerX * xFactor;
      const scaledY = centerY * yFactor;
      const scaledWidth = width * xFactor;
      const scaledHeight = height * yFactor;

      // Prepare the label text
      const text = `${className} (${(confidence * 100).toFixed(1)}%)`;

      // Draw the box
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

      // Draw the label background
      ctx.fillStyle = "red";
      ctx.font = "16px Arial";
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(scaledX, scaledY - 18, textWidth, 18);

      // Draw the label text
      ctx.fillStyle = "white";
      ctx.fillText(text, scaledX, scaledY - 4);
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.length) {
      const file = event.target.files[0]; // Get the uploaded file
      setImage(file); // Update the state to hold the selected file
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        if (e.target?.result) {
          const formData = new FormData();
          formData.append("file", file); // Append the file object directly

          const response = await fetch("/api/detect", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          setResult(data.predictions); // Set the detection results in state
          setImageUrl(e.target.result as string); // Update the imageUrl to display the uploaded image
        }
      };

      fileReader.readAsDataURL(file); // Read the file as DataURL for preview
    }
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} my={5}>
        <Heading>Did I Fracture a Bone?</Heading>
        <Text>Upload an x-ray to get your diagnosis.</Text>
        <Input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          p={2}
          mb={4}
        />
        {result && renderResults(result)}
        <canvas
          ref={canvasRef}
          style={{ border: "1px solid black", marginTop: "20px" }}
        ></canvas>
        <Heading>Download Sample Images</Heading>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {sampleImages.map((image, index) => (
            <GridItem
              key={index}
              boxShadow="sm"
              p="4"
              rounded="md"
              textAlign="center"
            >
              <Link href={image} isExternal>
                <Image
                  src={image}
                  alt={`Sample ${index + 1}`}
                  boxSize="100%"
                  objectFit="cover"
                />
                Download
              </Link>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default Home;
