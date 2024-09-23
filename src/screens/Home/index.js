import React, { useState, useMemo } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Text, useTheme, IconButton } from "react-native-paper";
import moment from "moment";
import "moment/locale/pt-br";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";

import CardDiario from "./components/CardDiario";

moment.locale("pt-br"); // Define o locale para português

export function Home() {
  const theme = useTheme();
  const habits = useSelector((state) => state.habits.habits) || [];

  // Estado para gerenciar a data selecionada
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  // Estado para controlar a visibilidade do calendário
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);

  // Formata a data selecionada para exibição
  const formattedDate = useMemo(
    () => moment(selectedDate, "YYYY-MM-DD").format("DD/MM/YYYY"),
    [selectedDate]
  );

  // Data selecionada para exibição ao lado do mês
  const displayDate = useMemo(
    () => moment(selectedDate, "YYYY-MM-DD").format("DD [de] MMMM"),
    [selectedDate]
  );

  // Obtém o mês atual baseado na data selecionada
  const currentMonth = useMemo(
    () => moment(selectedDate, "YYYY-MM-DD").format("MMMM [de] YYYY"),
    [selectedDate]
  );

  // Filtra os hábitos com base na data de criação (se necessário)
  const filteredHabits = useMemo(() => {
    // Adicione lógica para filtrar hábitos com base na data de criação, se necessário
    return habits;
  }, [habits]);

  // Obtém o registro diário para a data selecionada
  const dailyRecord = useSelector((state) =>
    state.habits.dailyRecords.find((record) => record.date === formattedDate)
  );

  // Calcula métricas de conclusão
  const totalHabits = filteredHabits.length;
  const completedHabits = dailyRecord?.completedHabits.length || 0;
  const completionPercentage =
    totalHabits > 0 ? Math.floor((completedHabits / totalHabits) * 100) : 0;

  // Prepara as datas marcadas para o WeekCalendar
  const markedDates = useMemo(
    () => ({
      [selectedDate]: {
        selected: true,
        selectedColor: theme.colors.primary,
      },
    }),
    [selectedDate, theme.colors.primary]
  );

  // Função para alternar a visibilidade do calendário
  const toggleCalendarVisibility = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  return (
    <CalendarProvider
      date={selectedDate}
      onDateChanged={(date) => setSelectedDate(date)}
    >
      {/* Cabeçalho do mês com data selecionada e seta para ocultar/exibir o calendário */}
      <View style={styles.monthContainer}>
        <Text style={styles.monthText}>{currentMonth}</Text>
        <View style={styles.rightHeader}>
          <Text style={styles.selectedDateText}>{displayDate}</Text>
          <IconButton
            icon={isCalendarVisible ? "chevron-up" : "chevron-down"}
            size={24}
            onPress={toggleCalendarVisibility}
          />
        </View>
      </View>

      {/* Renderiza o calendário semanal condicionalmente */}
      {isCalendarVisible && (
        <WeekCalendar
          firstDay={1} // Inicia a semana na segunda-feira
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.background,
            todayTextColor: theme.colors.primary,
            dayTextColor: theme.colors.onBackground,
            textDisabledColor: theme.colors.disabled,
            arrowColor: theme.colors.primary,
            textDayFontWeight: "bold",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "bold",
          }}
        />
      )}

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent:
              filteredHabits.length === 0 ? "center" : "flex-start",
          }}
          refreshControl={<RefreshControl refreshing={false} />}
        >
          {filteredHabits.length === 0 ? (
            <View style={styles.emptyContainer}>
              <IconButton
                icon="clipboard-text-off-outline"
                size={70}
                iconColor={theme.colors.outline}
                style={styles.emptyIcon}
              />
              <Text variant="titleMedium" style={styles.emptyText}>
                Nenhum hábito cadastrado ainda.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.statsContainer}>
                <Text
                  style={[styles.statsText, { color: theme.colors.primary }]}
                >
                  <Text
                    style={[
                      styles.statsLabel,
                      { color: theme.colors.onBackground },
                    ]}
                  >
                    Concluídos:{" "}
                  </Text>
                  {completionPercentage}%
                </Text>
                <Text
                  style={[
                    styles.statsCount,
                    { color: theme.colors.onBackground },
                  ]}
                >
                  {completedHabits}/{totalHabits}
                </Text>
              </View>
              <CardDiario
                habits={filteredHabits}
                selectedDate={formattedDate}
              />
            </>
          )}
        </ScrollView>
      </View>
    </CalendarProvider>
  );
}

const styles = StyleSheet.create({
  monthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedDateText: {
    fontSize: 16,
    color: "#000",
    marginRight: 5,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    opacity: 0.5,
  },
  emptyIcon: {
    marginBottom: 10,
    marginTop: 60,
  },
  emptyText: {
    color: "#999",
    textAlign: "center",
  },
  statsContainer: {
    marginBottom: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
