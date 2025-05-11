import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

interface Quote {
  q: string;
  a: string;
  c: string;
  h: string;
}

const QuoteGrid = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");

  // Send the fetch request to the API
  // Fetch quotes from the API
  useEffect(() => {
    apiClient
      .get<Quote[]>("/quotes")
      .then((response) => {
        setQuotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
        setError(error.message);
      });
  }, []);

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
