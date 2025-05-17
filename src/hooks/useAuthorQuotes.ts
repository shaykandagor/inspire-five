import { useEffect, useState } from "react";
import apiClient, { API_KEY } from "../services/api-client";

interface AuthorRandomQuote {
  q: string;
  a: string;
  i: string;
  c: string;
  h: string;
}

const useAuthorQuotes = (authorName?: string) => {
  const [randomQuote, setRandomQuote] = useState<AuthorRandomQuote[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authorName) return;
    setLoading(true);
    
    const formattedName = authorName.toLowerCase().replace(/\s+/g, "-");
    apiClient
      .get<AuthorRandomQuote[]>(`/random/author/${formattedName}/${API_KEY}`)
      .then((response) => {
        setRandomQuote(response.data);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authorName]);
  return { randomQuote, error, loading };
};

export default useAuthorQuotes;
