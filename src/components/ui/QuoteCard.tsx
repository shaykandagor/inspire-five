import { Box, Card, Image, Link } from "@chakra-ui/react";
import type { Quote } from "../../hooks/useQuotes";

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  return (
    <Card.Root
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
          <Card.Title>
            <Link
              variant="plain"
              href={`/author/${encodeURIComponent(quote.a)}`} // Link to the author's page
            >
              {quote.a}
            </Link>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Header>{quote.q}</Card.Header>
        </Card.Body>
      </Box>
    </Card.Root>
  );
};

export default QuoteCard;
