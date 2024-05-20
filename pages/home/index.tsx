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
  Box,
  useColorModeValue,
  Button,
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
  const bg = useColorModeValue("gray.100", "gray.700");
  return detections.map((det, index) => {
    if (det.confidence > 0.7) {
      return (
        <Box key={index} p={4} bg={bg} rounded="lg" shadow="md" mb={4}>
          <Text fontSize="lg">
            Detected a <strong>{det.class}</strong> with a confidence of{" "}
            <strong>{(det.confidence * 100).toFixed(1)}%</strong>. This may
            indicate a fracture. Please consult a healthcare provider for a
            thorough examination.
          </Text>
        </Box>
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
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    // Existing useEffect logic
  }, [imageUrl, result]);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Existing image change handling logic
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} my={5}>
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Bone Fracture Detection
        </Heading>
        <Text textAlign="center" fontSize="lg" mb={4}>
          Upload an x-ray image, and let our AI help determine if there's a
          fracture.
        </Text>
        <Input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          p={2}
          mb={4}
          border="2px"
          borderColor={borderColor}
          _hover={{ borderColor: "blue.500" }}
        />
        {result && renderResults(result)}
        <canvas
          ref={canvasRef}
          style={{ border: `2px solid ${borderColor}`, marginTop: "20px" }}
        />
        <Heading as="h2" size="lg" textAlign="center" mt={10}>
          Sample Images
        </Heading>
        <Text textAlign="center" mb={4}>
          Test the model with these sample X-ray images.
        </Text>
        <Grid templateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6}>
          {sampleImages.map((image, index) => (
            <GridItem key={index} shadow="lg" p={4} rounded="lg">
              <Link href={image} isExternal>
                <Image
                  src={image}
                  alt={`Sample ${index + 1}`}
                  boxSize="100%"
                  objectFit="cover"
                  rounded="md"
                  _hover={{
                    transform: "scale(1.05)",
                    transition: "transform .2s ease-in-out",
                  }}
                />
              </Link>
            </GridItem>
          ))}
        </Grid>
      </VStack>
    </Container>
  );
};

export default Home;
