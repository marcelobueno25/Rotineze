import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
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
    borderRadius: 30,
    border: "none",
  };

  const tabScreenConfig = {
    headerShown: true,
    tabBarStyle: customTabStyle,
    tabBarShowLabel: false,
    headerRight: ({ color, size }) => (
      <Ionicons
        name="add-circle-outline"
        size={30}
        color={color}
        style={{ padding: 10 }}
        onPress={() => navigation.navigate("CreateHabits")}
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
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          title: "Detalhes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
