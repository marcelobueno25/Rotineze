import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { CalendarProvider, Calendar } from "react-native-calendars";
import moment from "moment";
import { useSelector } from "react-redux";
import { CardGrafico } from "../components/CardGrafico";
import { HabitCard } from "../components/HabitCard";
import { renderCalendar } from "../components/renderCalendar";
import { getHabitsForDate } from "@utils/habits"; // Importar a função criada

export function GraficoDiario() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const habits = useSelector((state) => state.habits.habits) || [];

  // Mapeia registros diários com base nos hábitos para o calendário
  const dailyRecordsMap = useMemo(() => {
    const records = {};

    habits.forEach((habit) => {
      habit.checkIns.forEach((date) => {
        const dateString = moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
        if (!records[dateString]) {
          const { completedHabits, totalHabits, completionPercentage } =
            getHabitsForDate(dateString, habits);
          records[dateString] = {
            completedHabits,
            totalHabits,
            completionPercentage,
          };
        }
      });
    });

    return records;
  }, [habits]);

  // Define as datas marcadas no calendário
  const markedDates = useMemo(() => {
    const marks = {};

    Object.keys(dailyRecordsMap).forEach((date) => {
      marks[date] = { marked: true };
    });

    marks[selectedDate] = {
      ...(marks[selectedDate] || {}),
      selected: true,
      selectedColor: theme.colors.primaryContainer,
    };

    return marks;
  }, [dailyRecordsMap, selectedDate, theme.colors.primaryContainer]);

  // Obtém os hábitos completos, não completos, porcentagem e total de hábitos para a data selecionada
  const result = useMemo(
    () => getHabitsForDate(selectedDate, habits),
    [selectedDate, habits]
  );

  return (
    <>
      <Card
        style={[styles.mainCard, { backgroundColor: theme.colors.primary }]}
      >
        <View style={{ alignItems: "center" }}>
          <Text variant="headlineLarge" style={styles.whiteText}>
            {result.completionPercentage}%
          </Text>
          <Text variant="titleMedium" style={styles.whiteText}>
            Porcentagem de conclusão
          </Text>
        </View>
      </Card>

      <CalendarProvider date={selectedDate} onDateChanged={setSelectedDate}>
        <Calendar
          dayComponent={(dayProps) =>
            renderCalendar(
              dayProps,
              selectedDate,
              setSelectedDate,
              dailyRecordsMap,
              theme
            )
          }
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            todayTextColor: theme.colors.primary,
            arrowColor: theme.colors.primary,
            textSectionTitleColor: theme.colors.primary,
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            selectedDayBackgroundColor: theme.colors.primaryContainer,
            selectedDayTextColor: theme.colors.onBackground,
          }}
        />
      </CalendarProvider>

      <View style={styles.cardRow}>
        <CardGrafico
          icon="chart-bar"
          label="Hábitos no dia"
          number={result.totalHabits}
          color="#E91E63"
        />
        <CardGrafico
          icon="check-circle"
          label="Hábitos concluídos"
          number={result.completedHabits.length}
          color="#4CAF50"
        />
      </View>

      {/* <View style={styles.cardRow}>
        <CardGrafico
          icon="chart-line"
          label="Taxa total de conclusão"
          number={`${result.completionPercentage}%`}
          color="#FF5722"
        />
        <CardGrafico
          icon="calendar"
          label="Total de dias perfeitos"
          number="1 dia"
          color="#9C27B0"
        />
      </View> */}

      {result.completedHabits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} isCompleted={true} />
      ))}

      {result.notCompletedHabits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} isCompleted={false} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  whiteText: {
    color: "white",
    fontWeight: "bold",
  },
});
