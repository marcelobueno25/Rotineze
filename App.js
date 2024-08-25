import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { ThemePaper } from "./src/Theme/themePaper";
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
        <PaperProvider theme={ThemePaper}>
          <Routes />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
