import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/ui/NavBar";
import QuoteGrid from "./components/ui/QuoteGrid";
import { Routes, Route } from "react-router-dom";
import AuthorQuoteCard from "./components/AuthorQuoteCard";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      <GridItem area="aside" display={{ base: "none", lg: "block" }}>
      </GridItem>
      <GridItem area="main">
        <Routes>
          <Route path="/" element={<QuoteGrid />} />
          <Route path="/author/:name" element={<AuthorQuoteCard />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
