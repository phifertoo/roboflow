import { Input, VStack, Text } from "@chakra-ui/react";
import React from "react"; // This import is necessary

const ImageUploader = ({ setLoading, setResult, setImageUrl }) => {
  const handleImageChange = async (event) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        if (e.target?.result) {
          setLoading(true);
          const formData = new FormData();
          formData.append("file", file);

          try {
            const response = await fetch("/api/detect", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            setResult(data.predictions);
            setImageUrl(e.target.result as string);
          } catch (error) {
            console.error("Error processing image:", error);
          } finally {
            setLoading(false);
          }
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <VStack>
      <Text>Instructions: Upload an x-ray to get your diagnosis.</Text>
      <Input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        p={2}
        mb={4}
      />
    </VStack>
  );
};

export default ImageUploader;
