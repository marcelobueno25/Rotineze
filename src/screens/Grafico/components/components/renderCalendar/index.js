import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import MoodImage from "./components/MoodImage";

export const renderCalendar = (
  dayProps,
  selectedDate,
  setSelectedDate,
  dailyRecordsMap,
  theme
) => {
  const { date, state } = dayProps;
  const dateString = date.dateString;

  const record = dailyRecordsMap[dateString];
  const isSelected = dateString === selectedDate;

  if (!record) {
    return (
      <TouchableOpacity
        onPress={() => setSelectedDate(dateString)}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            color: isSelected
              ? theme.colors.onBackground
              : state === "disabled"
              ? "#D3D3D3"
              : theme.colors.onSurface,
            backgroundColor: isSelected
              ? theme.colors.primaryContainer
              : "transparent",
            borderRadius: 16,
            width: 32,
            height: 32,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  }

  const completionPercentage = record.completionPercentage;
  const backgroundColor = isSelected
    ? theme.colors.primaryContainer
    : theme.colors.background;

  return (
    <TouchableOpacity
      onPress={() => setSelectedDate(dateString)}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Svg height="40" width="40" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="50"
            strokeWidth="20"
            fill={backgroundColor}
          />
        </Svg>
        <MoodImage completionPercentage={completionPercentage} />
      </View>
    </TouchableOpacity>
  );
};
