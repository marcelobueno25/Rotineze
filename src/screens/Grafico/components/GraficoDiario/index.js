// GraficoDiario.js
import React, { useState, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import moment from "moment";
import { useSelector } from "react-redux";
import { CardGrafico } from "../components/CardGrafico";
import { HabitCard } from "../components/HabitCard";
import { CustomCalendar } from "../components/CustomCalendar"; // Importar o novo componente
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

  // Obtém os hábitos completos, não completos, porcentagem e total de hábitos para a data selecionada
  const result = useMemo(
    () => getHabitsForDate(selectedDate, habits),
    [selectedDate, habits]
  );

  return (
    <ScrollView>
      <Card
        style={[styles.mainCard, { backgroundColor: theme.colors.primary }]}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            variant="headlineLarge"
            style={{ color: theme.colors.background, fontWeight: "bold" }}
          >
            {result.completionPercentage}%
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.background, fontWeight: "bold" }}
          >
            Porcentagem de Conclusão
          </Text>
        </View>
      </Card>

      <CustomCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dailyRecordsMap={dailyRecordsMap}
      />

      <View style={styles.cardRow}>
        <CardGrafico
          icon="checkbox-multiple-blank-circle"
          label="Total de Hábitos"
          number={result.totalHabits}
          color={theme.colors.primary}
        />
        <CardGrafico
          icon="check-circle"
          label="Concluídos"
          number={result.completedHabits.length}
          color={theme.colors.success}
        />
      </View>

      {result.completedHabits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} isCompleted={true} />
      ))}

      {result.notCompletedHabits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} isCompleted={false} />
      ))}
    </ScrollView>
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
    marginVertical: 20,
  },
});
