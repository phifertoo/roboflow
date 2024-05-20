import { Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => (
  <Spinner
    size="xl"
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
  />
);

export default LoadingSpinner;
