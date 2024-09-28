import { extendTheme } from "@chakra-ui/react";

const colors = {
  main: {
    5: "#bce6d7",
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
  wine: {
    50: "#f3e6e6",
    100: "#e1bcbc",
    200: "#cf9292",
    300: "#bc6969",
    400: "#aa3f3f",
    500: "#980515", // Se basará en un tono más claro cercano a bg
    600: "#4A0E0E", // Color base (bg)
    700: "#3D0C0C", // Color hover
    800: "#2f0a0a",
    900: "#200606",
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
