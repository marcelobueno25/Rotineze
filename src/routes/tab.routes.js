import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";
import { Details } from "../screens/Details";
import { Home } from "../screens/Home";

const Tab = createBottomTabNavigator();

const customTabStyle = {
  position: "absolute",
  bottom: 20,
  left: 16,
  right: 16,
  height: 60,
  borderRadius: 10,
  elevation: 0, // Melhor que border: "none" para evitar warnings no React Native
};

const tabScreenOptions = ({ navigation }) => ({
  headerShown: true,
  tabBarStyle: customTabStyle,
  tabBarShowLabel: false,
  headerRight: ({ color }) => (
    <IconButton
      icon="plus-circle-outline"
      size={27}
      iconColor={color}
      onPress={() => navigation.navigate("CreateHabits")}
    />
  ),
  headerLeft: ({ color }) => (
    <IconButton
      icon="format-list-bulleted"
      mode="outline"
      size={27}
      iconColor={color}
    />
  ),
});

export function TabRoutes() {
  return (
    <Tab.Navigator initialRouteName="Habitos" screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="Habitos"
        component={Home}
        options={{
          title: "Hábitos",
          tabBarIcon: ({ color }) => (
            <IconButton icon="home" size={30} iconColor={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          title: "Detalhes",
          tabBarIcon: ({ color }) => (
            <IconButton icon="chart-line" size={25} iconColor={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
