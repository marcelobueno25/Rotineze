import "react-native-gesture-handler";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { lightTheme, darkTheme } from "@theme/themePaper";
import {
  lightNavigationTheme,
  darkNavigationTheme,
} from "@theme/themeNavigation";
import { Routes } from "@routes";
import { store, persistor } from "@redux/store";
import { ptBR } from "@utils/localecalendarConfig";
import "moment/locale/pt-br";
import auth from "@react-native-firebase/auth";

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

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch({ type: "auth/setUser", payload: user });
      } else {
        store.dispatch({ type: "auth/clearUser" });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <PaperProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <NavigationContainer
        theme={isDarkTheme ? darkNavigationTheme : lightNavigationTheme}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Routes />
        </GestureHandlerRootView>
      </NavigationContainer>
    </PaperProvider>
  );
}
