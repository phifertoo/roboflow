import { Text, VStack } from "@chakra-ui/react";

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

  return results ? <VStack>{renderResults(results)}</VStack> : null;
};

export default ResultsDisplay;
