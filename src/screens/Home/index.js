import React, { useState, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setSelectedDate } from "@redux/habitSlice";
import { getHabitsForDate } from "@utils/habits";
import { WeekCalendarManual } from "./components/WeekCalendarManual";
import { StatsSummary } from "./components/StatsSummary";
import { EmptyState } from "@components/Empty";
import CardDiario from "./components/CardDiario";
import { Layout } from "../index";

export function Home() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const habits = useSelector((state) => state.habits.habits) || [];

  const [selectedDate, setSelectedDatee] = useState(
    moment().format("YYYY-MM-DD")
  );

  const formattedDate = useMemo(
    () => moment(selectedDate, "YYYY-MM-DD").format("DD/MM/YYYY"),
    [selectedDate]
  );

  const habitsForSelectedDate = useMemo(() => {
    return getHabitsForDate(selectedDate, habits);
  }, [selectedDate, habits]);

  const {
    completedHabits,
    notCompletedHabits,
    completionPercentage,
    totalHabits,
  } = habitsForSelectedDate;

  const handleDateChange = (date) => {
    dispatch(setSelectedDate(moment(date).format("DD/MM/YYYY")));
    setSelectedDatee(date);
  };

  return (
    <Layout>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, zIndex: 2 }}>
          <View
            style={{
              backgroundColor: theme.colors.primaryContainer,
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
            }}
          >
            <View
              style={{
                borderTopColor: theme.colors.primary,
                borderTopWidth: 3,
                width: "80%",
                borderRadius: 20,
                margin: "auto",
              }}
            />
            <WeekCalendarManual
              selectedDate={selectedDate}
              onDayPress={handleDateChange}
              theme={theme}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                padding: 10,
                justifyContent: totalHabits === 0 ? "center" : "flex-start",
              }}
            >
              {totalHabits === 0 ? (
                <EmptyState />
              ) : (
                <>
                  <StatsSummary
                    completionPercentage={completionPercentage}
                    completedHabits={completedHabits.length}
                    totalHabits={totalHabits}
                  />
                  <CardDiario
                    habits={completedHabits.concat(notCompletedHabits)}
                    selectedDate={formattedDate}
                  />
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Layout>
  );
}
