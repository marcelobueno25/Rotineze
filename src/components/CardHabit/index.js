import React, { useState } from "react";
import { Card, IconButton, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { View, Vibration } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native"; // Importa o hook

const HabitCard = ({ habit, children }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Usa o hook para obter o objeto de navegação
  const [expanded, setExpanded] = useState(false);
  const today = moment().format("DD/MM/YYYY");
  const isToday = habit.completedDates.some((date) => date === today);

  const handleRemoveHabit = (id) => {
    Vibration.vibrate(400);
    dispatch({ type: "REMOVE_HABIT", payload: id });
  };

  const handleEditHabit = (id) => {
    Vibration.vibrate(400);
    navigation.navigate("EditHabit", { habitId: id });
  };

  const handleCompletedDates = (id) => {
    Vibration.vibrate(100);
    dispatch({
      type: "TOGGLE_COMPLETE_HABIT",
      payload: { id },
    });
  };

  const toggleExpanded = () => {
    Vibration.vibrate(50);
    setExpanded(!expanded);
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
              margin: 0,
            }}
          />
        )}
        right={(props) => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 0 }}>
            <IconButton
              {...props}
              icon={`${
                isToday ? "check-circle" : "checkbox-blank-circle-outline"
              }`}
              iconColor={`${isToday ? habit.color : "lightgrey"}`}
              size={24}
              onPress={() => handleCompletedDates(habit.id)}
              style={{ margin: 0 }}
            />
            <IconButton
              icon="square-edit-outline"
              size={24}
              onPress={() => handleEditHabit(habit.id)}
              style={{ margin: 0 }}
            />
            <IconButton
              icon="delete"
              size={24}
              onPress={() => handleRemoveHabit(habit.id)}
              style={{ margin: 0 }}
            />
            <IconButton
              {...props}
              icon={expanded ? "chevron-up" : "chevron-down"}
              size={24}
              onPress={toggleExpanded}
              style={{ marginLeft: 0 }}
            />
          </View>
        )}
      />
      {expanded && (
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 0,
            paddingBottom: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            <Text style={{ fontWeight: "bold" }}>Concluídos:</Text>{" "}
            {habit.completedDates.length}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Criado:</Text> {habit.criado}
          </Text>
        </View>
      )}

      {!!children && (
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 0,
          }}
        >
          {children}
        </View>
      )}
    </Card>
  );
};

export default HabitCard;
