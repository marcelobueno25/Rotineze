import React from "react";
import { Vibration } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";
import { Grafico } from "@screens/Grafico";
import { Home } from "@screens/Home";
import { useTheme as paperTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();

const handleTabPress = (navigation, routeName) => {
  Vibration.vibrate(50);
  navigation.navigate(routeName);
};

export function TabRoutes({ navigation }) {
  const theme = paperTheme();

  const screenOptions = React.useMemo(
    () => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 15,
        left: 10,
        right: 10,
        height: 55,
        borderRadius: 10,
        elevation: 3,
        shadowColor: theme.colors.onPrimaryContainer,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: theme.colors.primaryContainer,
      },
    }),
    [theme.colors]
  );

  return (
    <Tab.Navigator initialRouteName="Habitos" screenOptions={screenOptions}>
      <Tab.Screen
        name="Habitos"
        component={Home}
        options={{
          title: "Hábitos",
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="home-outline"
              size={focused ? 28 : 24}
              iconColor={
                focused
                  ? theme.colors.onPrimaryContainer
                  : theme.colors.secondary
              }
              onPress={() => handleTabPress(navigation, "Habitos")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Grafico"
        component={Grafico}
        options={{
          title: "Grafico",
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="chart-timeline-variant"
              size={focused ? 26 : 22}
              iconColor={
                focused
                  ? theme.colors.onPrimaryContainer
                  : theme.colors.secondary
              }
              onPress={() => handleTabPress(navigation, "Grafico")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
