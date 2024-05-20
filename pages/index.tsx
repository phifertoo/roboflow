import { ChakraProvider } from "@chakra-ui/react";
import Home from "./home";
import React from "react"; // This import is necessary

function IndexPage() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default IndexPage;
