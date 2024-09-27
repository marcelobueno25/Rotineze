import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Componente para exibir um hábito específico
export const HabitCard = React.memo(({ habit, isCompleted }) => {
  const theme = useTheme();
  const iconColor = isCompleted ? habit.color : "#B0B0B0";
  const textColor = isCompleted ? theme.colors.onBackground : "#B0B0B0";

  return (
    <Card style={styles.habitCard}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name={habit.icon} size={24} color={iconColor} />
        <Text style={{ marginLeft: 10, color: textColor }}>{habit.name}</Text>
      </View>
    </Card>
  );
});

const styles = StyleSheet.create({
  habitCard: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
});
