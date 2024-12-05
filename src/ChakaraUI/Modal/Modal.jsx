import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

const MotionModalContent = motion(ModalContent);

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={"sm"}>
          <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(8px)" />
          <MotionModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            bg="rgba(255, 255, 255, 0.6)"
            mx={4} // Add horizontal margin
            borderRadius="lg" // Rounded corners
            maxWidth="calc(100% - 32px)" // Ensure it doesn't touch screen edges
            width="auto"
          >
            {children}
          </MotionModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
