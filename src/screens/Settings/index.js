import { Text } from "react-native-paper";
import { View } from "react-native";

export function Settings() {
  return (
    <View
      rowGap={15}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text variant="headlineLarge">Configuração</Text>
    </View>
  );
}
