import { Vibration } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";
import { Grafico } from "@screens/Grafico";
import { Home } from "@screens/Home";
// import { Explorar } from "@screens/Explorar";

const Tab = createBottomTabNavigator();

const customTabStyle = {
  position: "absolute",
  bottom: 20,
  left: 16,
  right: 16,
  height: 60,
  borderRadius: 10,
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

const handleTabPress = (navigation, routeName) => {
  Vibration.vibrate(50);
  navigation.navigate(routeName);
};

const tabScreenOptions = ({ navigation }) => ({
  headerShown: false,
  tabBarStyle: customTabStyle,
  tabBarShowLabel: false,
  headerRight: ({ color }) => (
    <IconButton
      icon="plus-circle-outline"
      size={27}
      iconColor={color}
      onPress={() => {
        Vibration.vibrate(50);
        navigation.navigate("CreateHabits");
      }}
    />
  ),
  headerLeft: ({ color }) => (
    <IconButton
      icon="format-list-bulleted"
      mode="outline"
      size={27}
      iconColor={color}
      onPress={() => {
        Vibration.vibrate(50);
      }}
    />
  ),
});

export function TabRoutes({ navigation }) {
  return (
    <Tab.Navigator initialRouteName="Habitos" screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="Habitos"
        component={Home}
        options={{
          title: "Hábitos",
          tabBarIcon: ({ color }) => (
            <IconButton
              icon="home-outline"
              size={30}
              iconColor={color}
              onPress={() => handleTabPress(navigation, "Habitos")}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Explorar"
        component={Explorar}
        options={{
          title: "Explorar",
          tabBarIcon: ({ color }) => (
            <IconButton
              icon="compass-outline"
              size={25}
              iconColor={color}
              onPress={() => handleTabPress(navigation, "Explorar")}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Grafico"
        component={Grafico}
        options={{
          title: "Grafico",
          tabBarIcon: ({ color }) => (
            <IconButton
              icon="chart-timeline-variant"
              size={25}
              iconColor={color}
              onPress={() => handleTabPress(navigation, "Grafico")}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
