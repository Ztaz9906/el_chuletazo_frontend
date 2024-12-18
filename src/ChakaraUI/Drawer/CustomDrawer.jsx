import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { X } from "lucide-react";
import { cloneElement } from "react";

const CustomDrawer = ({
  menu,
  title,
  trigger,
  placement = "right",
  drawerBgColor = "rgba(0, 0, 0, 0.5)",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clonedMenu = cloneElement(menu, { onClose });

  return (
    <>
      {cloneElement(trigger, { onClick: onOpen })}
      <Drawer isOpen={isOpen} placement={placement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bg={drawerBgColor}
          backdropFilter="blur(10px)"
          color="white"
        >
          <DrawerHeader>
            <HStack justify={"space-between"} w={"full"}>
              <Text>{title}</Text>
              <IconButton
                icon={<X />}
                onClick={onClose}
                color={"white"}
                variant="ghost"
                aria-label="Close"
                zIndex={1000}
              />
            </HStack>
          </DrawerHeader>
          <DrawerBody>{clonedMenu}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
