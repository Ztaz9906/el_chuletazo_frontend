import ProductCard from "@/components/home/Productos/ProductCard.jsx";
import {useGetProductoQuery} from "@/servicios/api/productos/index.js";
import {useEffect} from "react";
import {Grid} from "@chakra-ui/react";

export default  function Index() {
// Directly call useGetProductoQuery to get data, isLoading, and error
	const {isLoading, data, error} = useGetProductoQuery();

	useEffect(() => {
		if (!isLoading && data) {
			console.log("Products data:", data); // Log products to the console
		}

		if (error) {
			console.error("Error fetching products:", error); // Log any errors
		}
	}, [isLoading, data, error]); // Only runs when these values change

	return (
		<Grid templateColumns={'repeat(3,1fr)'}>
			{!isLoading && data && data.map((producto, index) => (
				<ProductCard key={index} producto={producto}/>
			))}
		</Grid>
	)
}