import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const CustomAlertDialog = ({
  children,
  onConfirm,
  title = "¿Estás seguro?",
  description = "Esta acción no se puede deshacer.",
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  confirmColor = "main",
  cancelColor = "cart",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleConfirm = () => {
    onConfirm && onConfirm();
    onClose();
  };
  // Find the first clickable child, even if nested
  const findClickableChild = (child) => {
    // If child is a Tooltip, find its first child
    if (child.type.displayName === "Tooltip") {
      return React.Children.toArray(child.props.children)[0];
    }
    return child;
  };

  // Modify children to add onClick
  const childWithOnClick = React.Children.map(children, (child) => {
    const clickableChild = findClickableChild(child);

    return React.cloneElement(child, {
      children: React.cloneElement(clickableChild, {
        onClick: (e) => {
          // Prevent event propagation to avoid conflicts
          e.stopPropagation();

          // Call original onClick if exists
          if (clickableChild.props.onClick) {
            clickableChild.props.onClick(e);
          }

          // Open dialog
          onOpen();
        },
      }),
    });
  });

  return (
    <>
      {childWithOnClick}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{description}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme={cancelColor}>
              {cancelText}
            </Button>
            <Button colorScheme={confirmColor} ml={3} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomAlertDialog;
