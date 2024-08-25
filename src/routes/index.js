import { NavigationContainer } from "@react-navigation/native";
import { ThemeNavigation } from "../Theme/themeNavigation";
import { StackRoutes } from "./stack.routes";

export function Routes() {
  return (
    <NavigationContainer theme={ThemeNavigation}>
      <StackRoutes />
    </NavigationContainer>
  );
}
