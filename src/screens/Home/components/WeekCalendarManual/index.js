import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme, Text } from "react-native-paper";
import moment from "moment";

export const WeekCalendarManual = ({ selectedDate, onDayPress }) => {
  const theme = useTheme();

  const startOfWeek = moment().startOf("week");
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    moment(startOfWeek).add(i, "days")
  );

  return (
    <View
      style={{
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 5,
        gap: 3,
        borderBottomEndRadius: 25,
        borderBottomLeftRadius: 25,
      }}
    >
      {daysOfWeek.map((day) => {
        const isSelected = day.isSame(selectedDate, "day");
        const isToday = day.isSame(moment(), "day");

        return (
          <TouchableOpacity
            key={day.format("YYYY-MM-DD")}
            onPress={() => onDayPress(day.format("YYYY-MM-DD"))}
            style={{
              flex: 1,
              alignItems: "center",
              borderRadius: 10,
              borderColor: isSelected ? theme.colors.primary : "transparent",
              borderWidth: isSelected ? 2 : 2,
              backgroundColor: isToday ? theme.colors.secondary : "transparent",
              marginVertical: 10,
              paddingVertical: 5,
            }}
          >
            <Text
              variant="labelMedium"
              style={{
                color: isSelected
                  ? theme.colors.onBackground
                  : theme.colors.onSurface,
                fontWeight: isSelected ? "bold" : "100",
              }}
            >
              {day.format("ddd")}
            </Text>
            <Text
              variant="labelMedium"
              style={{
                color: isSelected
                  ? theme.colors.onBackground
                  : theme.colors.onSurface,
                fontWeight: isSelected ? "bold" : "100",
              }}
            >
              {day.format("DD")}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
