import { Text } from "@chakra-ui/react";
import useQuotes from "../../hooks/useQuotes";

const QuoteGrid = () => {
  const { quotes, error } = useQuotes();
  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {quotes.map((quote, index) => (
          <li key={index}>
            <Text fontSize="xl" fontWeight="bold">
              {quote.q}
            </Text>
            <Text fontSize="lg" color="gray.500">
              - {quote.a}
            </Text>
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuoteGrid;
