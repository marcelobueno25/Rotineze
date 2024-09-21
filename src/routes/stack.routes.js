import React, { useCallback } from "react";
import { Vibration } from "react-native";
import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { TabRoutes } from "./tab.routes";
import { EditHabit } from "@screens/EditHabit";
import { Onboarding } from "@screens/Onboarding";
import { CreateHabits } from "@screens/CreateHabits";
import { Settings } from "@screens/Settings";
import { Aparencia } from "@screens/Settings/components/Aparencia";
import LoginModal from "@screens/Login";
import Register from "@screens/Register";
import { Avancado } from "@screens/Settings/components/Avançado/indes";

const Stack = createNativeStackNavigator();

const HeaderIcon = ({ name, onPress, size = 26, style }) => {
  const { colors } = useTheme();
  return (
    <MaterialCommunityIcons
      name={name}
      color={colors.text}
      size={size}
      onPress={() => {
        Vibration.vibrate(50);
        onPress();
      }}
      style={style}
    />
  );
};

const stackScreenOptions = ({ navigation }) => ({
  title: "Rotinize",
  headerShown: true,
  animation: "fade_from_bottom",
  headerRight: () => (
    <HeaderIcon
      name="plus-circle-outline"
      onPress={() => navigation.navigate("CreateHabits")}
    />
  ),
  headerLeft: () => (
    <HeaderIcon
      name="format-list-bulleted"
      onPress={() => navigation.navigate("Settings")}
      size={24}
      style={{ marginRight: 10 }}
    />
  ),
});

export function StackRoutes() {
  const hasSeenOnboarding = useSelector(
    (state) => state.auth.hasSeenOnboarding
  );

  const AuthenticatedStack = useCallback(
    () => (
      <>
        {!hasSeenOnboarding && (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="Home"
          component={TabRoutes}
          options={stackScreenOptions}
        />
        <Stack.Screen
          name="Login"
          component={LoginModal}
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            presentation: "modal",
            headerShown: false,
          }}
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
          name="Aparencia"
          component={Aparencia}
          options={{ title: "Aparência" }}
        />
        <Stack.Screen
          name="Avançado"
          component={Avancado}
          options={{ title: "Avançado" }}
        />
        <Stack.Screen
          name="EditHabit"
          component={EditHabit}
          options={{ title: "Editar" }}
        />
      </>
    ),
    [hasSeenOnboarding]
  );

  return <Stack.Navigator>{AuthenticatedStack()}</Stack.Navigator>;
}
