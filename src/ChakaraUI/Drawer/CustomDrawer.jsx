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

const CustomDrawer = ({ menu, title, trigger, placement = "right" }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Clonar el componente del menú y pasarle la propiedad onClose
  const clonedMenu = cloneElement(menu, { onClose });

  return (
    <>
      {cloneElement(trigger, { onClick: onOpen })}
      <Drawer isOpen={isOpen} placement={placement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>{clonedMenu}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
