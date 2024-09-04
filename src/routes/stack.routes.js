import { Vibration } from "react-native";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CreateHabits } from "../screens/CreateHabits";
import { Settings } from "../screens/Settings";
import { EditHabit } from "../screens/EditHabit";
import { Onboarding } from "../screens/Onboarding";
import { TabRoutes } from "./tab.routes";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const stackScreenOptions = ({ navigation }) => ({
  title: "Rotinize",
  headerShown: true,
  animation: "fade_from_bottom",
  headerRight: () => {
    const { colors } = useTheme();
    return (
      <MaterialCommunityIcons
        name="plus-circle-outline"
        color={colors.text}
        size={26}
        onPress={() => {
          Vibration.vibrate(50);
          navigation.navigate("CreateHabits");
        }}
      />
    );
  },
  headerLeft: () => {
    const { colors } = useTheme();
    return (
      <MaterialCommunityIcons
        name="format-list-bulleted"
        color={colors.text}
        size={24}
        style={{ marginRight: 10 }}
        onPress={() => {
          Vibration.vibrate(50);
          navigation.navigate("Settings");
        }}
      />
    );
  },
});

export function StackRoutes() {
  const onboarding = useSelector((state) => state.configuration.onboarding);
  const isOnboarding = onboarding ? "Onboarding" : "Home";
  return (
    <Stack.Navigator initialRouteName={isOnboarding}>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ title: "Novo Hábito", headerShown: false }}
      />
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
      <Stack.Screen
        name="EditHabit"
        component={EditHabit}
        options={{ title: "Editar" }}
      />
    </Stack.Navigator>
  );
}
