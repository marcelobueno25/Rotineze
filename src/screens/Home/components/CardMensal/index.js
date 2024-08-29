import React, { memo } from "react";
import { View } from "react-native";
import MonthlyHeatmap from "../../../../components/CalendarHeatmap/MonthlyHeatmap";
import HabitCard from "../../../../components/CardHabit";

export default memo(function CardMensal({ habit }) {
  return (
    <HabitCard habit={habit}>
      <View
        style={{
          flex: 1,
          alignItem: "center",
          paddingTop: 0,
          padding: 10,
        }}
      >
        <MonthlyHeatmap habit={habit} color={habit.color} />
      </View>
    </HabitCard>
  );
});
