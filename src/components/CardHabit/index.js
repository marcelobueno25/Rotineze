// HabitCard.js
import React from "react";
import { Card, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { View, Vibration } from "react-native";
import moment from "moment";

const HabitCard = ({ habit, children }) => {
  const dispatch = useDispatch();
  const today = moment().format("DD/MM/YYYY");
  const isToday = habit.completedDates.some((date) => date === today);

  const handleRemoveHabit = (id) => {
    Vibration.vibrate(400);
    dispatch({ type: "REMOVE_HABIT", payload: id });
  };

  const handleCompletedDates = (id) => {
    Vibration.vibrate(100);
    dispatch({
      type: "TOGGLE_COMPLETE_HABIT",
      payload: { id },
    });
  };

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
              icon={`${isToday ? "check-circle" : "circle"}`}
              iconColor={`${isToday ? habit.color : "lightgrey"}`}
              size={24}
              onPress={() => handleCompletedDates(habit.id)}
              style={{ marginRight: 0 }}
            />
            <IconButton
              {...props}
              icon="delete"
              size={24}
              onPress={() => handleRemoveHabit(habit.id)}
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
