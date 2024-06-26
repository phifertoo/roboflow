import {
  Grid,
  GridItem,
  Image,
  Link,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react"; // This import is necessary

const SampleImagesDisplay = ({ images }) => {
  return (
    <VStack spacing={4}>
      <Heading>Sample X-Rays</Heading>
      <Text>
        If you have no x-rays images and just want to test out the model, feel
        free to use the images below.
      </Text>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {images.map((image, index) => (
          <GridItem
            key={index}
            boxShadow="sm"
            p="4"
            rounded="md"
            textAlign="center"
          >
            <Link href={image} isExternal>
              <Image
                src={image}
                alt={`Sample ${index + 1}`}
                boxSize="100%"
                objectFit="cover"
              />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default SampleImagesDisplay;
