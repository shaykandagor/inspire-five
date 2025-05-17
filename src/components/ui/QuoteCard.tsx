import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Quote } from "../../hooks/useQuotes";
import { Link as RouterLink } from "react-router-dom";

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard = ({ quote }: QuoteCardProps) => {
  return (
    <Card.Root
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
            <Heading fontWeight="bold" letterSpacing="tight">
              <RouterLink to={`/author/${encodeURIComponent(quote.a)}`}>
                {quote.a}
              </RouterLink>
            </Heading>
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
      </Stack>
    </Card.Root>
  );
};

export default QuoteCard;
