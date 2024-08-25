import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";
import { Details } from "../screens/Details";
import { CreateHabits } from "../screens/CreateHabits";
import { Home } from "../screens/Home";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function Navigator() {
  const stackScreenConfig = {};

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={stackScreenConfig}>
      <Stack.Screen
        name="Home"
        component={HomeTab}
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="CreateHabits"
        component={CreateHabits}
        options={{ title: "Novo Hábito", headerShown: true }}
      />
    </Stack.Navigator>
  );
}

function HomeTab({ navigation }) {
  const customTabStyle = {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    height: 60,
    //elevation: 0,
    borderRadius: 10,
    border: "none",
  };

  const tabScreenConfig = {
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
  };

  return (
    <Tab.Navigator
      initialRouteName="Habitos"
      screenOptions={tabScreenConfig}
      shifting={false}
    >
      <Tab.Screen
        name="Habitos"
        component={Home}
        options={{
          title: "Hábitos",
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="home" size={30} iconColor={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          title: "Detalhes",
          tabBarIcon: ({ color, size }) => (
            <IconButton icon="chart-line" size={25} iconColor={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
