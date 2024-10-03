// src/theme/index.js
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

// Temas do React Native Paper
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    //primary: "#6200ee",
    secondary: "#b5a4e0",
    accent: "#c2e9f3",
    success: "#81C784",
    warning: "#eead2d",
    error: "#ff6961",
    orange: "#FF8A65",
    white: "#ffffff",
    purple: "#4F378B",

    blueSky: "#B3E5FC",
    onBlueSky: "#4FC3F7",

    coral: "#FFCDD2",
    onCoral: "#E57373",

    pink: "#FFE0B2",
    onPick: "#F06292",
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    //primary: "#bb86fc",
    secondary: "#b392ef",
    accent: "#03dac4",
    success: "#81C784",
    warning: "#eead2d",
    error: "#ff7474",
    orange: "#FF8A65",
    white: "#ffffff",
    purple: "#4F378B",

    blueSky: "#4FC3F7",
    onBlueSky: "#B3E5FC",

    coral: "#E57373",
    onCoral: "#FFCDD2",

    pink: "#F06292",
    onPick: "#F8BBD0",
  },
};
