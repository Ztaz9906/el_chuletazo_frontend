import { addProduct } from "@/servicios/redux/slices/productSliece.js";
import { Box, useBreakpointValue, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderMobileProductCard } from "./renders/renderMobileProductCard";
import { renderProductCard } from "./renders/renderProductCard";

const ProductCard = ({ producto }) => {
  const [quantity, setQuantity] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => {
    setShowAnimation(true);
  }, []);

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: "Debe Iniciar Sesión para realizar la compra",
        status: "error",
      });
    }
    const productCard = {
      ...producto,
      quantity: quantity,
    };
    console.log("Product added to cart:", productCard);
    if (quantity === 0) return;
    dispatch(addProduct(productCard));
    setQuantity(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={showAnimation ? { opacity: 1, x: 0 } : false}
      transition={{ duration: 0.5 }}
    >
      <Box
        w={{ base: "auto", md: "250px" }}
        h={{ base: "auto", md: "300px" }}
        bg="white"
        shadow="md"
        overflow="hidden"
        borderRadius="md"
        display="flex"
        flexDirection="column"
      >
        {isMobile
          ? renderMobileProductCard(
              producto,
              setQuantity,
              quantity,
              handleAddToCart
            )
          : renderProductCard(producto, setQuantity, quantity, handleAddToCart)}
      </Box>
    </motion.div>
  );
};

export default ProductCard;
