import { extendTheme } from "@chakra-ui/react";

const colors = {
  main: {
    50: "#e6fae4",
    100: "#c2f2be",
    200: "#9dea97",
    300: "#77e26f",
    400: "#51da47",
    500: "#28b463",
    600: "#1f8a4d", // Base color
    700: "#1f8a4d",
    800: "#166137",
    900: "#0d3921",
  },
  wine: {
    50: "#f3e6e6",
    100: "#e1bcbc",
    200: "#cf9292",
    300: "#bc6969",
    400: "#aa3f3f",
    500: "#4A0E0E", // Adjusted to be closer to base color
    600: "#3D0C0C", // Base color
    700: "#3D0C0C",
    800: "#2f0a0a",
    900: "#200606",
  },
  cart: {
    50: "#f9e0d1",
    100: "#f3c1a3",
    200: "#ec9f74",
    300: "#e57d45",
    400: "#df5b16",
    500: "#E35305", // Adjusted to be closer to base color
    600: "#b44204", // Base color
    700: "#b44204",
    800: "#853203",
    900: "#562102",
  },
};

const shadows = {
  innerCustom: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.8)",
};

const theme = extendTheme({
  colors,
  shadows,
});

export default theme;
