import { Vibration } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconButton } from "react-native-paper";
import { Grafico } from "@screens/Grafico";
import { Home } from "@screens/Home";
import { useTheme as paperTheme } from "react-native-paper";
// import { Explorar } from "@screens/Explorar";

const Tab = createBottomTabNavigator();

const handleTabPress = (navigation, routeName) => {
  Vibration.vibrate(50);
  navigation.navigate(routeName);
};

// const tabScreenOptions = ({ navigation }) => ({
//   headerShown: false,
//   tabBarStyle: customTabStyle,
//   tabBarShowLabel: false,
//   headerRight: ({ color }) => (
//     <IconButton
//       icon="plus-circle-outline"
//       size={27}
//       iconColor={color}
//       onPress={() => {
//         Vibration.vibrate(50);
//         navigation.navigate("CreateHabits");
//       }}
//     />
//   ),
//   headerLeft: ({ color }) => (
//     <IconButton
//       icon="format-list-bulleted"
//       mode="outline"
//       size={27}
//       iconColor={color}
//       onPress={() => {
//         Vibration.vibrate(50);
//       }}
//     />
//   ),
// });

export function TabRoutes({ navigation }) {
  const theme = paperTheme(); // Captura o tema do @react-navigation/native

  return (
    <Tab.Navigator
      initialRouteName="Habitos"
      screenOptions={{
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
      }}
    >
      <Tab.Screen
        name="Habitos"
        component={Home}
        options={{
          title: "Hábitos",
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="home-outline"
              //size={30}
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
          tabBarIcon: ({ focused }) => (
            <IconButton
              icon="chart-timeline-variant"
              //size={25}
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
