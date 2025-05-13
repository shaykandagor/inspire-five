import { SimpleGrid, Text } from "@chakra-ui/react";
import useQuotes from "../../hooks/useQuotes";
import QuoteCard from "./QuoteCard";
import React from "react";

const QuoteGrid = () => {
  const { quotes, error, loading } = useQuotes();
  return (
    <>
      <p>{quotes.length}</p>
      <SimpleGrid
        captionSide={"top"}
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
      >
        {loading && <Text>Loading...</Text>}
        {quotes.length === 0 && !error && <Text>No quotes found</Text>}
        {error && <Text>{error}</Text>}
        {quotes.map((quote, index) => (
          <QuoteCard key={index} quote={quote} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default React.memo(QuoteGrid);
