import { ChakraProvider } from "@chakra-ui/react";
import Home from "./home";

function IndexPage() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default IndexPage;
