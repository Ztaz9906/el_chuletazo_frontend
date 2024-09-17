import {extendTheme} from "@chakra-ui/react";


const colors = {
	main: {
		10: "#28b463",
		50: "#e6fae4",
		100: "#c2f2be",
		200: "#9dea97",
		300: "#77e26f",
		400: "#51da47",
		500: "#25D606",
		600: "#25D606",
		700: "#168204",
		800: "#0f5803",
		900: "#072e01",
	},

};

const shadows = {
	innerCustom: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.8)',
};


const theme = extendTheme({
	colors,
	shadows,
});


export default theme