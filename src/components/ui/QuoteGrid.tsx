import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  SimpleGrid,
  Text,
  Container,
  Heading,
  Flex,
  HStack,
  VStack,
  Badge,
  SkeletonCircle,
  SkeletonText,
  Button,
  Stack,
  AvatarGroup,
  Avatar,
  InputGroup,
} from "@chakra-ui/react";
import useQuotes from "../../hooks/useQuotes";
import { LuSearch } from "react-icons/lu";

const QuoteGrid = () => {
  const { quotes, error, loading } = useQuotes();
  const [authorSearch, setAuthorSearch] = useState("");
  const [keywordSearch, setKeywordSearch] = useState("");

  const CATEGORIES = [
    "Anxiety",
    "Change",
    "Choice",
    "Confidence",
    "Courage",
    "Death",
    "Dreams",
    "Excellence",
    "Failure",
    "Fairness",
    "Fear",
    "Forgiveness",
    "Freedom",
    "Future",
    "Happiness",
    "Inspiration",
    "Kindness",
    "Leadership",
    "Life",
    "Living",
    "Love",
    "Pain",
    "Past",
    "Success",
    "Time",
    "Today",
    "Truth",
    "Work",
  ];

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesAuthor = quote.a
        .toLowerCase()
        .includes(authorSearch.toLowerCase());
      const matchesCategory = quote.q
        .toLowerCase()
        .includes(keywordSearch.toLowerCase());

      return matchesAuthor && matchesCategory;
    });
  }, [quotes, authorSearch, keywordSearch]);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack align="stretch">
        <Heading
          as="h1"
          size="xl"
          fontWeight="bold"
          letterSpacing="wide"
          mb={6}
          textAlign="center"
        >
          Inspirational Quotes
        </Heading>

        <HStack direction={{ base: "column", md: "row" }}>
          <InputGroup startElement={<LuSearch />}>
            <Input
              placeholder="Search by author..."
              onChange={(e) => setAuthorSearch(e.target.value)}
              value={authorSearch}
              size="md"
              borderRadius="md"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 2px blue.500",
              }}
              _hover={{
                borderColor: "blue.400",
              }}
            />
          </InputGroup>
          <InputGroup startElement={<LuSearch />}>
            <Input
              placeholder="Search by keyword..."
              onChange={(e) => setKeywordSearch(e.target.value)}
              value={keywordSearch}
              list="keywords"
              size="md"
              borderRadius="md"
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 2px blue.500",
              }}
              _hover={{
                borderColor: "blue.400",
              }}
            />
          </InputGroup>
        </HStack>

        <HStack mt={4} mb={6} justifyContent="center" flexWrap="wrap">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => setKeywordSearch(category)}
              colorScheme="blue"
              size="md"
              borderRadius="md"
              px={6}
              boxShadow="sm"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
            >
              {category}
            </Button>
          ))}
        </HStack>

        {loading && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} padding={6}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card.Root
                key={i}
                borderRadius="xl"
                overflow="hidden"
                boxShadow="md"
                borderWidth="1px"
              >
                <Flex direction={{ base: "column", sm: "row" }}>
                  <SkeletonCircle size="100px" m={6} />
                  <Box p={6} flex="1">
                    <SkeletonText mt="2" noOfLines={3} />
                  </Box>
                </Flex>
              </Card.Root>
            ))}
          </SimpleGrid>
        )}

        {error && (
          <Box
            p={8}
            borderRadius="xl"
            bg="red.50"
            color="red.500"
            borderWidth="1px"
            borderColor="red.200"
            textAlign="center"
            boxShadow="md"
          >
            <Text fontSize="lg" fontWeight="bold">
              {error}
            </Text>
            <Text mt={3} fontSize="md">
              Please try again later
            </Text>
          </Box>
        )}

        {quotes.length === 0 && !loading && !error && (
          <Box
            p={10}
            borderRadius="xl"
            textAlign="center"
            borderWidth="1px"
            boxShadow="sm"
          >
            <Text fontSize="lg" fontWeight="medium">
              No quotes found
            </Text>
          </Box>
        )}

        {filteredQuotes.length === 0 && quotes.length > 0 && !loading && (
          <Box
            p={10}
            borderRadius="xl"
            textAlign="center"
            borderWidth="1px"
            boxShadow="sm"
          >
            <Text fontSize="lg" mb={4} fontWeight="medium">
              No quotes match your search criteria
            </Text>
            <Button
              onClick={() => {
                setAuthorSearch("");
                setKeywordSearch("");
              }}
              colorScheme="blue"
              size="md"
              borderRadius="md"
              px={6}
              boxShadow="sm"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
            >
              Reset filters
            </Button>
          </Box>
        )}

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} padding={6}>
          {filteredQuotes.map((quote, index) => (
            <Card.Root
              key={index}
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
            >
              <Box
                minWidth={{ base: "100%", sm: "120px" }}
                maxWidth={{ base: "100%", sm: "120px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <AvatarGroup>
                  <Avatar.Root>
                    <Avatar.Fallback name={quote.a} />
                    <Avatar.Image src={quote.i} />
                  </Avatar.Root>
                </AvatarGroup>
              </Box>

              <Stack flex="1" p={5}>
                <CardHeader p={0} mb={3}>
                  <Flex justify="space-between" align="center">
                    <Heading size="md" fontWeight="bold" letterSpacing="tight">
                      {quote.a}
                    </Heading>
                    {quote.c && (
                      <Badge
                        borderRadius="full"
                        px={3}
                        py={1}
                        textTransform="capitalize"
                        fontWeight="medium"
                        fontSize="xs"
                        letterSpacing="wide"
                      >
                        {quote.c}
                      </Badge>
                    )}
                  </Flex>
                </CardHeader>

                <CardBody p={0}>
                  <Text
                    py={2}
                    fontStyle="italic"
                    fontSize="md"
                    lineHeight="taller"
                    letterSpacing="wide"
                  >
                    "{quote.q}"
                  </Text>
                </CardBody>

                <CardFooter p={0} pt={3}>
                  <HStack justify="space-between">
                    <Text fontSize="xs" fontStyle="italic">
                      Quote #{index + 1}
                    </Text>
                  </HStack>
                </CardFooter>
              </Stack>
            </Card.Root>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default React.memo(QuoteGrid);
