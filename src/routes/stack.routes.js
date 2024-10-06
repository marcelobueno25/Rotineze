import React from "react";
import { Vibration } from "react-native";
import { useTheme as navigationTheme } from "@react-navigation/native";
import { useTheme as paperTheme } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { TabRoutes } from "./tab.routes";
import { EditHabit } from "@screens/EditHabit";
import { Onboarding } from "@screens/Onboarding";
import { CreateHabits } from "@screens/CreateHabits";
import { Settings } from "@screens/Settings";
import { Aparencia } from "@screens/Settings/components/Aparencia";
import HabitDetails from "@screens/HabitDetails";

const Stack = createNativeStackNavigator();

const HeaderIcon = ({ name, onPress, size = 26, style }) => {
  const { colors } = navigationTheme();
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

export function StackRoutes() {
  const hasSeenOnboarding = useSelector(
    (state) => state.auth.hasSeenOnboarding
  );

  const paper = paperTheme();

  const stackScreenOptions = ({ navigation }) => ({
    title: "Rotinize",
    headerShown: true,
    animation: "fade_from_bottom",
    headerStyle: {
      backgroundColor: paper.colors.primaryContainer,
    },
    headerShadowVisible: false,
    headerTintColor: paper.colors.onBackground,
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

  return (
    <Stack.Navigator>
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
        name="CreateHabits"
        component={CreateHabits}
        options={{ title: "Novo Hábito" }}
      />
      <Stack.Screen
        name="HabitDetails"
        component={HabitDetails}
        options={{ title: "Detalhe do Hábito" }}
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
        name="EditHabit"
        component={EditHabit}
        options={{ title: "Editar" }}
      />
    </Stack.Navigator>
  );
}
