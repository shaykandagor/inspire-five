import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import useAuthorQuotes from "../hooks/useAuthorQuotes";
import { useParams } from "react-router-dom";

const AuthorQuoteCard = () => {
  const { name } = useParams<{ name: string }>();
  const { randomQuote, error, loading } = useAuthorQuotes(name);

  return (
    <Container>
      <Flex>
        <Link href="/" display="flex" alignItems="center">
          <BsArrowLeft size={22} />
          <Text ml={2} fontWeight="medium" fontSize="lg">
            Back
          </Text>
        </Link>
      </Flex>

      {loading && (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      )}

      {error && (
        <Text color="red.500" textAlign="center" mb={4}>
          {error}
        </Text>
      )}

      <Stack padding={10}>
        {randomQuote.map((quote) => (
          <Card.Root
            key={quote.q}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            borderRadius="xl"
            boxShadow="md"
            borderWidth="1px"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-6px)",
              boxShadow: "xl",
              borderColor: "blue.300",
            }}
            padding={4}
            margin={2}
            maxW="md"
            w="100%"
          >
            <Box
              minWidth={{ base: "100%", sm: "120px" }}
              maxWidth={{ base: "100%", sm: "120px" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar.Root>
                <Avatar.Fallback name={quote.a} />
                <Avatar.Image src={quote.i} />
              </Avatar.Root>
            </Box>

            <Stack flex="1" p={5}>
              <CardHeader p={0} mb={3}>
                <Flex justify="space-between" align="center">
                  <Heading
                    fontWeight="bold"
                    letterSpacing="tight"
                    fontSize="xl"
                  >
                    {quote.a}
                  </Heading>
                </Flex>
              </CardHeader>

              <CardBody p={0}>
                <Text
                  py={2}
                  fontStyle="italic"
                  fontSize="lg"
                  color="gray.700"
                  lineHeight="taller"
                  letterSpacing="wide"
                  textAlign="center"
                >
                  "{quote.q}"
                </Text>
              </CardBody>
            </Stack>
          </Card.Root>
        ))}
      </Stack>
    </Container>
  );
};

export default AuthorQuoteCard;
