// HabitCard.js
import React from "react";
import { Card, IconButton } from "react-native-paper";
import { View } from "react-native";

const HabitCard = ({ habit, children, onRemoveHabit, onToggleComplete }) => {
  return (
    <Card style={{ margin: 8 }}>
      <Card.Title
        title={habit.name}
        left={(props) => (
          <IconButton
            {...props}
            icon={habit.icon}
            iconColor="#fff"
            size={26}
            style={{
              backgroundColor: habit.color,
              borderRadius: 10,
            }}
          />
        )}
        right={(props) => (
          <View style={{ flexDirection: "row" }}>
            <IconButton
              {...props}
              icon="check-circle-outline"
              size={24}
              onPress={() => onToggleComplete(habit.id)}
              style={{ marginRight: 0 }}
            />
            <IconButton
              {...props}
              icon="delete"
              size={24}
              onPress={() => onRemoveHabit(habit.id)}
              style={{ marginLeft: 0 }}
            />
          </View>
        )}
      />
      {children}
    </Card>
  );
};

export default HabitCard;
