import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Quote {
  q: string;
  a: string;
  i: string;
  c: string;
  h: string;
}

interface QuotesStorage {
  quotes: Quote[];
  fetchDate: string;
}

const useQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const quotesStorageKey = "quotes";

  const getQuotesFromStorage = (): Quote[] => {
    try {
      const rawData = localStorage.getItem(quotesStorageKey);
      if (rawData) {
        const parsed = JSON.parse(rawData) as QuotesStorage;
        return parsed.quotes || [];
      }
    } catch (e) {
      console.error("Error parsing quotes from localStorage:", e);
    }
    return [];
  };

  useEffect(() => {
    setQuotes(getQuotesFromStorage());
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError("");

        const responsesAsync = Array.from({ length: 5 }).map(async () => {
          const response = await apiClient.get<Quote[]>("/random", {
            signal: controller.signal,
          });
          return response.data?.[0];
        });

        const responses = await Promise.allSettled(responsesAsync);

        const successfulResponses = responses
          .filter((response) => response.status === "fulfilled")
          .map((res) => (res as PromiseFulfilledResult<Quote>).value);

        const failedResponses = responses
          .filter((response) => response.status === "rejected")
          .map((res) => (res as PromiseRejectedResult).reason?.message);

        const today = new Date().toLocaleDateString("en-CA");

        if (successfulResponses.length > 0) {
          const newQuotesStorage = {
            quotes: successfulResponses,
            fetchDate: today,
          };

          setQuotes(successfulResponses);

          localStorage.setItem(
            quotesStorageKey,
            JSON.stringify(newQuotesStorage)
          );
        }

        if (failedResponses.length > 0) {
          setError(failedResponses.join(", "));
        }
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError("An error occurred while fetching quotes.");
      } finally {
        setLoading(false);
      }
    };

    const currentDate = new Date().toLocaleDateString("en-CA");

    const rawStoredData = localStorage.getItem(quotesStorageKey);
    const parsedStoredData: QuotesStorage | null = rawStoredData
      ? JSON.parse(rawStoredData)
      : null;

    if (
      !parsedStoredData ||
      !parsedStoredData.quotes ||
      !parsedStoredData.quotes.length ||
      parsedStoredData.fetchDate !== currentDate
    ) {
      fetchQuotes();
    }

    return () => {
      controller.abort();
    };
  }, []);

  return {
    quotes,
    error,
    loading,
  };
};

export default useQuotes;
