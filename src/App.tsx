import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" bg="coral" height="100px">
        Nav
      </GridItem>
      <GridItem
        area="aside"
        bg="gold"
        height="100px"
        display={{ base: "none", lg: "block" }}
      >
        Aside
      </GridItem>
      <GridItem area="main" bg="dodgerblue" height="100px">
        Main
      </GridItem>
    </Grid>
  );
}

export default App;
