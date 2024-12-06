import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
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
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>{clonedMenu}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
