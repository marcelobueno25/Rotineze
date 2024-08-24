import { Text } from "react-native-paper";
import { View } from "react-native";

export function Details() {
  return (
    <View
      rowGap={15}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text variant="headlineLarge">Detalhamento</Text>
    </View>
  );
}
