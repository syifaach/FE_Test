import {
  BellIcon,
  CalendarIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { Box, Flex, IconButton, VStack, Text } from "@chakra-ui/react";
import Logo from "../../assets/images/logo.png";
import { sideBarMenu } from "../../constants/menu";
import { useNavigate } from "react-router";

export default function Sidebar({ children }) {
  const route = useNavigate();

  const onClickMenu = (router) => {
    route(router);
  };

  return (
    <Flex h="100vh" overflow="hidden">
      <Box className="sticky top-0" w="64" h="100vh" p="4" overflowY="auto">
        <div className="flex justify-center items-center mb-3">
          <img src={Logo} width="150px" height="100px"></img>
        </div>

        <VStack align="stretch" spacing="4">
          {sideBarMenu.map((menu) => {
            return (
              <>
                <Flex
                  className="hover:bg-gray-100 cursor-pointer p-2 rounded-lg items-center gap-2"
                  onClick={() => onClickMenu(menu.route)}
                >
                  {menu.icon}
                  <Text>{menu.name}</Text>
                </Flex>
              </>
            );
          })}
        </VStack>
      </Box>

      <Flex
        direction="column"
        flex="1"
        className="bg-gray-100"
        overflow="hidden"
      >
        <Box
          flex="1"
          p="6"
          className="bg-gray-100 static max-w-full"
          overflowY="auto"
        >
          <Box className="p-4 bg-white rounded-xl shadow">{children}</Box>
        </Box>
      </Flex>
    </Flex>
  );
}
