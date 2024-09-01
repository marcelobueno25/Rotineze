import React, { memo } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { StyleSheet } from "react-native";

export const DiasDaSemanaForm = memo(
  ({ selectedDays, setSelectedDays, selectedColor }) => {
    const daysOfWeek = [
      { label: "Seg", value: 1 },
      { label: "Ter", value: 2 },
      { label: "Qua", value: 3 },
      { label: "Qui", value: 4 },
      { label: "Sex", value: 5 },
      { label: "Sáb", value: 6 },
      { label: "Dom", value: 0 },
    ];

    const toggleDay = (day) => {
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
                ? [styles.selectedDay, { backgroundColor: selectedColor }]
                : { backgroundColor: "#e0e0e0" },
            ]}
            onPress={() => toggleDay(day.value)}
          >
            <Text style={styles.dayLabel}>{day.label}</Text>
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
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: "#4a90e2",
  },
  dayLabel: {
    color: "#fff",
  },
});
