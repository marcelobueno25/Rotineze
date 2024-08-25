import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateHabits } from "../screens/CreateHabits";
import { TabRoutes } from "./tab.routes";

const Stack = createNativeStackNavigator();

const stackScreenOptions = {
  headerShown: true,
  animation: "fade_from_bottom",
};

export function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={stackScreenOptions}>
      <Stack.Screen
        name="Home"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateHabits"
        component={CreateHabits}
        options={{ title: "Novo Hábito" }}
      />
    </Stack.Navigator>
  );
}
