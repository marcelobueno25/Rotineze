import React from "react";
import { SegmentedButtons, Card, IconButton } from "react-native-paper";
import { View, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import WeeklyHeatmap from "../../components/CalendarHeatmap/WeeklyHeatmap";
import AnnualHeatmap from "../../components/CalendarHeatmap/AnnualHeatmap";
import MonthlyHeatmap from "../../components/CalendarHeatmap/MonthlyHeatmap";
import HeatMap from "../../components/CalendarHeatmap";
import moment from "moment";

export function Home() {
  const habits = useSelector((state) => state.habits.habits);
  const [selectedView, setSelectedView] = React.useState("Diário");
  const dispatch = useDispatch();

  const handleRemoveHabit = (id) => {
    dispatch({ type: "REMOVE_HABIT", payload: id });
  };

  const handleCompletedDates = (id) => {
    // dispatch({
    //   type: "ADD_CONCLUIDO_DATA",
    //   payload: id,
    // });
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
        value={selectedView}
        onValueChange={setSelectedView}
        buttons={[
          { label: "Diário", value: "Diário" },
          { label: "Semanal", value: "Semanal" },
          { label: "Mensal", value: "Mensal" },
          { label: "Anual", value: "Anual" },
        ]}
      />
      <ScrollView>
        {habits.map((habit) => (
          <Card key={habit.id} style={{ margin: 8 }}>
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
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <IconButton
                    {...props}
                    icon="check-circle-outline"
                    size={24}
                    onPress={() => handleCompletedDates(habit.id)}
                  />
                  <IconButton
                    {...props}
                    icon="delete"
                    size={24}
                    onPress={() => handleRemoveHabit(habit.id)}
                  />
                </View>
              )}
            />
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
                <AnnualHeatmap
                  completedDates={habit.completedDates}
                  color={habit.color}
                />
              )}
              {selectedView === "Mensal" && (
                <MonthlyHeatmap
                  completedDates={habit.completedDates}
                  color={habit.color}
                />
              )}
              {selectedView === "Semanal" && (
                <WeeklyHeatmap
                  completedDates={habit.completedDates}
                  color={habit.color}
                />
              )}
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
