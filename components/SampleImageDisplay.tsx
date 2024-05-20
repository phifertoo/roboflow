import {
  Grid,
  GridItem,
  Image,
  Link,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";

const SampleImagesDisplay = ({ images }) => {
  return (
    <VStack spacing={4}>
      <Heading>Sample Images</Heading>
      <Text>
        If you have no x-rays and just want to test out the model, feel free to
        use the images below.
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
