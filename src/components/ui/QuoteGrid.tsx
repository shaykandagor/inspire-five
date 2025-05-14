import { Box, Card, Input, SimpleGrid, Text, Image } from "@chakra-ui/react";
import useQuotes from "../../hooks/useQuotes";
import React, { useState } from "react";

const QuoteGrid = () => {
  const { quotes, error, loading } = useQuotes();
  const [authorSearch, setAuthorSearch] = useState("");
  const filteredQuotes = quotes.filter((quote) =>
    quote.a.toLowerCase().includes(authorSearch.toLowerCase())
  );
  return (
    <>
      <Input
        placeholder="Search author..."
        onChange={(e) => {
          setAuthorSearch(e.target.value);
        }}
        value={authorSearch}
      />
      <SimpleGrid
        captionSide={"top"}
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
      >
        {loading && <Text>Loading...</Text>}
        {quotes.length === 0 && !error && <Text>No quotes found</Text>}
        {error && <Text>{error}</Text>}
        {filteredQuotes.map((quote, index) => (
          <Card.Root
            key={index}
            flexDirection={"row"}
            overflow="hidden"
            maxWidth="xl"
            borderRadius={8}
            padding={5}
            margin={5}
          >
            <Image
              objectFit="cover"
              maxWidth="200px"
              alt="Author Avatar"
              src={quote.i}
            />
            <Box>
              <Card.Header fontSize={"2xl"} fontWeight="bold">
                <Card.Title>{quote.a}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Header>{quote.q}</Card.Header>
              </Card.Body>
            </Box>
          </Card.Root>
        ))}
      </SimpleGrid>
    </>
  );
};

export default React.memo(QuoteGrid);
