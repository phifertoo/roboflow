// LoadingSpinner.js
import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => (
  <Spinner
    data-testid="loading-spinner"
    size="xl"
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
  />
);

export default LoadingSpinner;
