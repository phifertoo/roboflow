import { Text, VStack } from "@chakra-ui/react";
import React from "react"; // This import is necessary

const ResultsDisplay = ({ results }) => {
  const renderResults = (detections) => {
    return detections.map((det, index) => {
      if (det.confidence > 0.7) {
        return (
          <Text
            key={index}
            fontSize="md"
            p={2}
            bg="gray.100"
            rounded="md"
            mb={2}
          >
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

  return results.length > 0 ? (
    <VStack>{renderResults(results)}</VStack>
  ) : (
    <Text>No fractured detected</Text>
  );
};

export default ResultsDisplay;
