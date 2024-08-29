import { Vibration } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CreateHabits } from "../screens/CreateHabits";
import { Settings } from "../screens/Settings";
import { TabRoutes } from "./tab.routes";

const Stack = createNativeStackNavigator();

const stackScreenOptions = ({ navigation }) => ({
  headerShown: true,
  animation: "fade_from_bottom",
  headerRight: ({ color }) => (
    <MaterialCommunityIcons
      name="plus-circle-outline"
      color={color}
      size={26}
      onPress={() => {
        Vibration.vibrate(50);
        navigation.navigate("CreateHabits");
      }}
    />
  ),
  headerLeft: ({ color }) => (
    <MaterialCommunityIcons
      name="format-list-bulleted"
      color={color}
      size={24}
      style={{ marginRight: 10 }}
      onPress={() => {
        Vibration.vibrate(50);
        navigation.navigate("Settings");
      }}
    />
  ),
});

export function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={TabRoutes}
        options={stackScreenOptions}
      />
      <Stack.Screen
        name="CreateHabits"
        component={CreateHabits}
        options={{ title: "Novo Hábito" }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Configuração" }}
      />
    </Stack.Navigator>
  );
}
