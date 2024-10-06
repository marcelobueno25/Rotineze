import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Vibration } from "react-native";
import {
  Text,
  Card,
  Button,
  IconButton,
  ProgressBar,
  useTheme,
} from "react-native-paper";
import moment from "moment";
import { useSelector } from "react-redux";
import { getHabitStatsForMonth } from "@utils/habits";
import MonthlyHeatmap from "./components/MonthlyHeatmap";

const InfoRow = ({ label, value, last = false }) => {
  const theme = useTheme();
  return (
    <View style={[styles.infoRow, { marginBottom: last ? 0 : 12 }]}>
      <Text style={[styles.infoLabel, { color: theme.colors.primary }]}>
        {label}
      </Text>
      <Text style={{ color: theme.colors.onBackground }}>{value}</Text>
    </View>
  );
};

const StatCard = ({ label, value, icon, color }) => {
  const theme = useTheme();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          icon={icon}
          size={25}
          iconColor={color}
          style={{ margin: 0, padding: 0 }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{value}</Text>
      </View>
      <View>
        <Text style={{ color: theme.colors.onBackground }}>{label}</Text>
      </View>
    </View>
  );
};

const HabitDetails = ({ route, navigation }) => {
  const theme = useTheme();
  const { habitId } = route.params;

  const habit = useSelector((state) =>
    state.habits.habits.find((h) => h.id === habitId)
  );

  // Verifica se o hábito existe
  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={{ color: theme.colors.error }}>
          Hábito não encontrado.
        </Text>
      </View>
    );
  }

  const [selectedMonth, setSelectedMonth] = useState(moment());

  // Formatação de datas
  const initialDate = moment(habit.initialDate, "DD/MM/YYYY");
  const endDate = habit.endDate ? moment(habit.endDate, "DD/MM/YYYY") : null;

  const formattedInitialDate = initialDate.format("DD/MM/YYYY");
  const formattedEndDate = endDate
    ? endDate.format("DD/MM/YYYY")
    : "Indeterminado";

  // Nomes dos dias da semana em português
  moment.locale("pt-br");
  const weekDays = moment.weekdaysShort(true);
  const formattedFrequency = habit.frequency
    .map((day) => weekDays[day])
    .join(", ");

  // Horário da notificação formatado
  const notificationTime = habit.frequencyTime
    ? moment(habit.frequencyTime, "HH:mm").format("HH:mm")
    : null;

  // Dados estatísticos mensais
  const currentDate = selectedMonth.format("YYYY-MM-DD");
  const monthlyStats = useMemo(
    () => getHabitStatsForMonth(currentDate, habit),
    [habit, currentDate]
  );

  // Datas de conclusão do hábito no mês selecionado
  const completionDates = useMemo(() => {
    if (!habit.checks) return [];

    return Object.keys(habit.checks)
      .filter((date) => {
        const isCompleted = habit.checks[date];
        const isSameMonth = moment(date, "DD/MM/YYYY").isSame(
          moment(currentDate),
          "month"
        );
        return isCompleted && isSameMonth;
      })
      .map((date) => moment(date, "DD/MM/YYYY").format("YYYY-MM-DD"));
  }, [habit.checks, currentDate]);

  const handlePreviousMonth = () => {
    const newMonth = selectedMonth.clone().subtract(1, "month");
    // Verifica se o novo mês não é anterior ao mês da data inicial
    if (newMonth.isSameOrAfter(initialDate.clone().startOf("month"))) {
      Vibration.vibrate(50);
      setSelectedMonth(newMonth);
    } else {
      // Opcional: Feedback para o usuário
      Vibration.vibrate(100);
    }
  };

  const handleNextMonth = () => {
    const newMonth = selectedMonth.clone().add(1, "month");
    // Verifica se o novo mês não é posterior ao mês da data final, se existir
    if (!endDate || newMonth.isSameOrBefore(endDate.clone().endOf("month"))) {
      Vibration.vibrate(50);
      setSelectedMonth(newMonth);
    } else {
      // Opcional: Feedback para o usuário
      Vibration.vibrate(100);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Cabeçalho com Nome e Ícone */}
      <Card style={styles.headerCard}>
        <View style={styles.headerContent}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.background,
              },
            ]}
          >
            <IconButton
              icon={habit.icon}
              size={40}
              iconColor={theme.colors.background}
            />
          </View>
          <Text
            variant="titleLarge"
            style={{ fontWeight: "bold", color: theme.colors.onBackground }}
          >
            {habit.name}
          </Text>
        </View>
      </Card>

      {/* Informações Básicas */}
      <Card style={styles.infoCard}>
        <Card.Title
          title="Informações do Hábito"
          titleStyle={{ fontWeight: "bold" }}
        />
        <Card.Content>
          <InfoRow label="Data Inicial" value={formattedInitialDate} />
          <InfoRow label="Data Final" value={formattedEndDate} />
          <InfoRow
            label="Notificações"
            value={habit.notificationsEnabled ? "Sim" : "Não"}
            last={!habit.notificationsEnabled}
          />
          {habit.notificationsEnabled && (
            <>
              <InfoRow
                label="Frequência"
                value={formattedFrequency || "Sem frequência definida"}
              />
              <InfoRow
                label="Horário"
                value={notificationTime || "Sem horário definido"}
                last
              />
            </>
          )}
        </Card.Content>
      </Card>

      {/* Resumo Mensal */}
      <Card style={styles.summaryCard}>
        <Card.Title title="Resumo do Mês" titleStyle={{ fontWeight: "bold" }} />
        <Card.Content>
          {/* Estatísticas */}
          <View style={styles.statsContainer}>
            <StatCard
              label="Pendentes"
              value={monthlyStats.notCompletedHabitsCount}
              icon="alert-circle"
              color={theme.colors.warning}
            />
            <StatCard
              label="Concluídos"
              value={monthlyStats.completedHabitsCount}
              icon="check-circle"
              color={theme.colors.success}
            />
            <StatCard
              label="Maior Série"
              value={`${monthlyStats.maxSequence}`}
              icon="fire-circle"
              color={theme.colors.orange}
            />
          </View>

          <View style={styles.percentageContainer}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: theme.colors.primary,
              }}
            >
              {monthlyStats.completionPercentage}%
            </Text>
            <Text style={{ color: theme.colors.onBackground }}>
              Porcentagem de Conclusão
            </Text>
          </View>
          <ProgressBar
            progress={monthlyStats.completionPercentage / 100}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          {/* Botões de Navegação de Mês */}
          <View style={styles.monthNav}>
            <IconButton
              icon="chevron-left"
              size={24}
              onPress={handlePreviousMonth}
              disabled={selectedMonth.isSameOrBefore(
                initialDate.clone().startOf("month")
              )}
              style={{
                opacity: selectedMonth.isSameOrBefore(
                  initialDate.clone().startOf("month")
                )
                  ? 0.3
                  : 1,
              }}
            />
            <Text
              variant="titleMedium"
              style={{
                fontWeight: "bold",
                color: theme.colors.onBackground,
              }}
            >
              {selectedMonth.format("MMMM [de] YYYY")}
            </Text>
            <IconButton
              icon="chevron-right"
              size={24}
              onPress={handleNextMonth}
              disabled={
                endDate
                  ? selectedMonth.isSameOrAfter(endDate.clone().endOf("month"))
                  : false
              }
              style={{
                opacity:
                  endDate &&
                  selectedMonth.isSameOrAfter(endDate.clone().endOf("month"))
                    ? 0.3
                    : 1,
              }}
            />
          </View>

          {/* Heatmap Mensal */}
          <MonthlyHeatmap
            habit={habit}
            currentDate={currentDate}
            completionDates={completionDates}
            initialDate={initialDate}
            endDate={endDate}
          />
        </Card.Content>
      </Card>

      {/* Botão de Edição */}
      <Button
        mode="contained"
        onPress={() => {
          Vibration.vibrate(100);
          navigation.navigate("EditHabit", { habitId: habit.id });
        }}
        style={styles.editButton}
        contentStyle={{ padding: 8 }}
      >
        Editar Hábito
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
    borderRadius: 15,
    marginTop: 40,
  },
  headerContent: {
    alignItems: "center",
    paddingTop: 30,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderWidth: 5,
    borderStyle: "solid",
    borderRadius: 50,
    top: -60,
    height: 85,
    width: 85,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 15,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontWeight: "bold",
  },
  summaryCard: {
    marginBottom: 16,
    borderRadius: 15,
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  percentageContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  editButton: {
    borderRadius: 15,
    marginBottom: 16,
  },
  container: {
    padding: 16,
  },
});

export default HabitDetails;
