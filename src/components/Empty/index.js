import React from "react";
import { View } from "react-native";
import { Text, IconButton, useTheme } from "react-native-paper";

export const EmptyState = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        opacity: 0.5,
      }}
    >
      <IconButton
        icon="clipboard-text-off-outline"
        size={70}
        iconColor={theme.colors.outline}
        style={{ marginBottom: 10, marginTop: 60 }}
      />
      <Text style={{ color: "#999", textAlign: "center" }}>
        Nenhum hábito cadastrado ainda.
      </Text>
    </View>
  );
};
