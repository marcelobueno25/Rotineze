import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { lightTheme, darkTheme } from "./src/Theme/themePaper";
import {
  lightNavigationTheme,
  darkNavigationTheme,
} from "./src/Theme/themeNavigation";
import { Routes } from "./src/routes";
import { store, persistor } from "./src/redux/store";
import { ptBR } from "./src/utils/localecalendarConfig";
import "moment/locale/pt-br"; // Importa o locale em português

moment.locale("pt-br");
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}

// Componente para gerenciar o tema
function MainApp() {
  const isDarkTheme = useSelector((state) => state.configuration.theme);

  return (
    <PaperProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <NavigationContainer
        theme={isDarkTheme ? darkNavigationTheme : lightNavigationTheme}
      >
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
}
