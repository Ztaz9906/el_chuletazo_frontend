import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

const MotionModalContent = motion(ModalContent);

const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay bg="rgba(0, 0, 0, 0.5)" backdropFilter="blur(8px)" />
          <MotionModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            bg="rgba(255, 255, 255, 0.6)"
            borderRadius="xl"
            maxW="md"
          >
            {children}
          </MotionModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
