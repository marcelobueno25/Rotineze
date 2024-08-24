import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeNavigation } from "./src/Theme/themeNavigation";
import { ThemePaper } from "./src/Theme/themePaper";
import { Navigator } from "./src/routes";
import { store, persistor } from "./src/redux/store";
import moment from "moment";
import { ptBR } from "./src/utils/localecalendarConfig";
import { LocaleConfig } from "react-native-calendars";
import "moment/locale/pt-br"; // Importa o locale em português

moment.locale("pt-br");
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={ThemePaper}>
          <NavigationContainer theme={ThemeNavigation}>
            <Navigator />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
