import React, { useState } from "react";
import { SegmentedButtons, Card, IconButton } from "react-native-paper";
import { View, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import WeeklyHeatmap from "../../components/CalendarHeatmap/WeeklyHeatmap";
import AnnualHeatmap from "../../components/CalendarHeatmap/AnnualHeatmap";
import MonthlyHeatmap from "../../components/CalendarHeatmap/MonthlyHeatmap";
import HabitCard from "../../components/CardHabit";

export function Home() {
  const habits = useSelector((state) => state.habits.habits);
  const [selectedView, setSelectedView] = useState("Diário");

  const dispatch = useDispatch();

  const handleRemoveHabit = (id) => {
    dispatch({ type: "REMOVE_HABIT", payload: id });
  };

  const handleCompletedDates = (id) => {
    dispatch({
      type: "TOGGLE_COMPLETE_HABIT",
      payload: { id },
    });
  };

  return (
    <View
      rowGap={15}
      style={{
        flex: 1,
        marginBottom: 70,
        padding: 10,
      }}
    >
      <SegmentedButtons
        density="small"
        value={selectedView}
        onValueChange={setSelectedView}
        buttons={[
          { label: "Diário", value: "Diário", accessibilityLabel: "Diário" },
          {
            label: "Semanal",
            value: "Semanal",
            accessibilityLabel: "Semanal",
          },
          { label: "Mensal", value: "Mensal", accessibilityLabel: "Mensal" },
          { label: "Anual", value: "Anual", accessibilityLabel: "Anual" },
        ]}
      />
      <ScrollView>
        {habits.map((habit, index) => (
          <HabitCard
            key={index}
            habit={habit}
            onRemoveHabit={handleRemoveHabit}
            onToggleComplete={handleCompletedDates}
          >
            {selectedView !== "Diário" && (
              <View
                style={{
                  flex: 1,
                  alignItem: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                }}
              >
                {selectedView === "Anual" && (
                  <AnnualHeatmap habit={habit} color={habit.color} />
                )}
                {selectedView === "Mensal" && (
                  <MonthlyHeatmap habit={habit} color={habit.color} />
                )}
                {selectedView === "Semanal" && (
                  <WeeklyHeatmap habit={habit} color={habit.color} />
                )}
              </View>
            )}
          </HabitCard>
        ))}
      </ScrollView>
    </View>
  );
}
