import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} alt="Logo" boxSize="100px" />
      <Text>Nav Bar</Text>
    </HStack>
  );
};

export default NavBar;
