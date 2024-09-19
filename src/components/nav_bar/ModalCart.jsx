import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";

export default function ModalCart() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg="transparent"
        onClick={onOpen}
        color="white"
        borderBottom="2px solid transparent"
        borderRadius="0"
        _hover={{
          borderBottom: "2px solid",
          borderColor: "main.10",
          color: "white",
        }}
        h="10"
        leftIcon={<Icon as={ShoppingCart} />}
      >
        Mi Carrito
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>blabla bal</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
