// src/theme/index.js
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

// Temas do React Native Paper
export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200ee",
    accent: "#03dac4",
    // Outras personalizações de cor para o tema claro
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#bb86fc",
    accent: "#03dac4",
    // Outras personalizações de cor para o tema escuro
  },
};
