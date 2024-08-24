import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import habitReducer from "./habitSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["habits"],
};

const rootReducer = combineReducers({
  habits: persistReducer(persistConfig, habitReducer),
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
