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
import * as Notifications from "expo-notifications";
// import auth from "@react-native-firebase/auth";
// import { clearLocalUser } from "@services/authService";

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

function MainApp() {
  const isDarkTheme = useSelector((state) => state.configuration.theme);

  // useEffect(() => {
  //   const checkAuthState = async () => {
  //     const unsubscribe = auth().onAuthStateChanged(async (user) => {
  //       if (!user) {
  //         await clearLocalUser();
  //       }
  //     });

  //     return () => unsubscribe();
  //   };

  //   checkAuthState();
  // }, []);

  // Função para verificar a permissão de notificações
  const verificarPermissaoNotificacao = async () => {
    // Verifica o status da permissão
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      // Se não estiver concedida, solicita permissão
      const { status: novoStatus } =
        await Notifications.requestPermissionsAsync();
      if (novoStatus !== "granted") {
        console.log(
          "Permissão Negada",
          "Permita as notificações para usar este recurso!"
        );
        return;
      }
    }
  };

  // Verifica a permissão assim que o componente é montado
  useEffect(() => {
    verificarPermissaoNotificacao();
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
