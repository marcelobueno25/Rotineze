import React, { memo } from "react";
import { ScrollView, View } from "react-native";
import AnnualHeatmap from "../../../../components/CalendarHeatmap/AnnualHeatmap";
import HabitCard from "../../../../components/CardHabit";

export default memo(function CardAnual({ habits }) {
  return (
    <ScrollView>
      {habits.map((habit, index) => (
        <View key={index}>
          <HabitCard habit={habit}>
            <View
              style={{
                flex: 1,
                alignItem: "center",
                paddingTop: 0,
                padding: 10,
              }}
            >
              <AnnualHeatmap habit={habit} color={habit.color} />
            </View>
          </HabitCard>
        </View>
      ))}
    </ScrollView>
  );
});
