import ProductCard from "@/components/home/Productos/ProductCard.jsx";
import { useGetProductoQuery } from "@/servicios/api/productos/index.js";
import { useEffect, useState } from "react";
import { Grid } from "@chakra-ui/react";

export default function Index() {
  const { isLoading, data, error } = useGetProductoQuery();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      console.log("Products data:", data); 
    }

    if (error) {
      console.error("Error fetching products:", error); 
    }

    const animationShown = localStorage.getItem("animationShown");
    if (!animationShown) {
      setShowAnimation(true);
      localStorage.setItem("animationShown", "true");
    }
  }, [isLoading, data, error]);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4} p={8}>
      {!isLoading &&
        data &&
        data.map((producto, index) => (
          <ProductCard
            key={index}
            producto={producto}
            showAnimation={showAnimation}
          />
        ))}
    </Grid>
  );
}