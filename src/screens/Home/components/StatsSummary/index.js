import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "react-native-paper";

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
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.onBackground,
          }}
        >
          Concluídos:{" "}
        </Text>
        {completionPercentage}%
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: theme.colors.onBackground,
        }}
      >
        {completedHabits}/{totalHabits}
      </Text>
    </View>
  );
};
