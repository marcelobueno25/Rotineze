import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import habitReducer from "./habitSlice";
import configurationReducer from "./configurationSlice"; // Importe o novo reducer de configuração

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["habits", "configuration"],
};

const configPersistConfig = {
  key: "configuration",
  storage: AsyncStorage,
  whitelist: ["theme", "notificationsEnabled", "language"], // Defina quais partes do estado deseja persistir
};

const rootReducer = combineReducers({
  habits: persistReducer(persistConfig, habitReducer),
  configuration: persistReducer(configPersistConfig, configurationReducer), // Persistência para configurações
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
