// src/theme/navigationTheme.js
import {
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

// Temas do React Navigation
export const lightNavigationTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    background: "#ffffff",
    text: "#000000",
    // Outras personalizações de cor para o tema claro de navegação
  },
};

export const darkNavigationTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: "#000000",
    text: "#ffffff",
    // Outras personalizações de cor para o tema escuro de navegação
  },
};
