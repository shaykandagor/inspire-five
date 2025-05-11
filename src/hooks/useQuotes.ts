import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Quote {
  q: string;
  a: string;
  c: string;
  h: string;
}

const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");

  // Send the fetch request to the API
  // Fetch quotes from the API
  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<Quote[]>("/quotes", {
        signal: controller.signal,
      })
      .then((response) => {
        setQuotes(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return { quotes, error };
};

export default useQuotes;
