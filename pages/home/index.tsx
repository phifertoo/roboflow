import { useState, useRef } from "react";
import { Container, VStack, Heading, Divider } from "@chakra-ui/react";
import ImageUploader from "../../components/ImageUploader";
import ResultsDisplay from "../../components/ResultsDisplay";
import LoadingSpinner from "../../components/LoadingSpinner";
import SampleImagesDisplay from "../../components/SampleImageDisplay";

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

  const handleImageLoad = (url: string) => {
    setImageUrl(url);
    if (canvasRef.current && imageUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new window.Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = url;
      }
    }
  };

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} my={5}>
        <Heading>Did I Fracture a Bone?</Heading>
        <ImageUploader
          onImageLoad={handleImageLoad}
          setLoading={setLoading}
          setResult={setResult}
        />
        {loading ? (
          <LoadingSpinner />
        ) : (
          result && <ResultsDisplay results={result} />
        )}
        {imageUrl && (
          <canvas
            ref={canvasRef}
            style={{
              border: "1px solid black",
              marginTop: "20px",
              width: "100%",
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
