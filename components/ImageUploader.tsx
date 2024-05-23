// Import necessary Chakra UI components
import { Input, VStack, Text } from "@chakra-ui/react";
import React from "react"; // Import React (redundant due to new JSX Transform)

// Define the ImageUploader component, accepting props to manage loading state and results
const ImageUploader = ({ setLoading, setResult, setImageUrl }) => {
  // Handler for file input changes
  const handleImageChange = async (event) => {
    // Check if files were uploaded
    if (event.target.files?.length) {
      const file = event.target.files[0]; // Get the first file
      const fileReader = new FileReader(); // Create a FileReader to read file data

      // Define what happens when the FileReader loads the file
      fileReader.onload = async (e) => {
        // Check if the file was read successfully
        if (e.target?.result) {
          setLoading(true); // Set loading state to true
          const formData = new FormData(); // Create a FormData object to send the file to the server
          formData.append("file", file); // Append the file to the form data

          try {
            // Make an API request to a server endpoint
            const response = await fetch("/api/detect", {
              method: "POST",
              body: formData,
            });
            const data = await response.json(); // Parse the JSON response
            setResult(data.predictions); // Set the result state with the response data
            setImageUrl(e.target.result as string); // Set the image URL to display the uploaded image
          } catch (error) {
            console.error("Error processing image:", error); // Log errors if any
          } finally {
            setLoading(false); // Reset loading state
          }
        }
      };

      fileReader.readAsDataURL(file); // Start reading the file as Data URL
    }
  };

  // Render the component
  return (
    <VStack align="center" spacing={4}>
      {" "}
      // Vertical stack for layout
      <Text fontSize="xl">
        Instructions: Upload an x-ray to get your diagnosis. If you like what
        you see, feel free to email me at lancekwatanabe58@gmail.com
      </Text>
      <Input
        type="file" // Input for file type
        onChange={handleImageChange} // Handle changes to input
        accept="image/*" // Accept only image files
        p={2} // Padding
        mb={4} // Margin bottom
        height="50px" // Height of the input field
      />
    </VStack>
  );
};

export default ImageUploader;
