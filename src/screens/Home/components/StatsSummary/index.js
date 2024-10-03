import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export const StatsSummary = ({
  completionPercentage,
  completedHabits,
  totalHabits,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        marginBottom: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text
        variant="titleMedium"
        style={{
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            fontWeight: "bold",
            color: theme.colors.onBackground,
          }}
        >
          Concluídos:{" "}
        </Text>
        {completionPercentage}%
      </Text>
      <Text
        variant="titleMedium"
        style={{
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        {completedHabits}/{totalHabits}
      </Text>
    </View>
  );
};
