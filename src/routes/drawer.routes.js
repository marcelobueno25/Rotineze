import { createDrawerNavigator } from "@react-navigation/drawer";
import { Settings } from "../screens/Settings";

const Drawer = createDrawerNavigator();

export function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="configuracao" component={Settings} />
    </Drawer.Navigator>
  );
}
