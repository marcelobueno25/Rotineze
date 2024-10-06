import React, { memo } from "react";
import { TouchableOpacity, View, Vibration } from "react-native";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export const DiasDaSemanaForm = memo(
  ({ selectedDays, setSelectedDays, selectedColor }) => {
    const daysOfWeek = [
      { label: "Dom", value: 0 },
      { label: "Seg", value: 1 },
      { label: "Ter", value: 2 },
      { label: "Qua", value: 3 },
      { label: "Qui", value: 4 },
      { label: "Sex", value: 5 },
      { label: "Sáb", value: 6 },
    ];

    const toggleDay = (day) => {
      Vibration.vibrate(50);
      setSelectedDays((prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day)
          : [...prevDays, day]
      );
    };

    return (
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCircle,
              selectedDays.includes(day.value)
                ? [
                    styles.selectedDay,
                    {
                      borderColor: selectedColor,
                      backgroundColor: selectedColor + 33,
                    },
                  ]
                : { borderColor: "#e0e0e0" },
            ]}
            onPress={() => toggleDay(day.value)}
          >
            <Text>{day.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  selectedDay: {
    borderWidth: 1,
    borderColor: "#4a90e2",
    borderRadius: 50,
  },
});
