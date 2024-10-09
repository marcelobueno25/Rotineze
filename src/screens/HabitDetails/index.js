import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Vibration } from "react-native";
import {
  Text,
  Card,
  Button,
  Icon,
  IconButton,
  ProgressBar,
  useTheme,
} from "react-native-paper";
import moment from "moment";
import { useSelector } from "react-redux";
import { getHabitStatsForMonth } from "@utils/habits";
import MonthlyHeatmap from "./components/MonthlyHeatmap";
import { capitalizeFirstLetter } from "@utils/string";

const InfoRow = ({ label, value, last = false }) => {
  const theme = useTheme();
  return (
    <View style={[styles.infoRow, { marginBottom: last ? 0 : 12 }]}>
      <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
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
        <Icon source={icon} size={25} color={color} />
        <Text
          variant="titleMedium"
          style={{ fontWeight: "bold", marginLeft: 5 }}
        >
          {value}
        </Text>
      </View>
      <View>
        <Text variant="bodyMedium" style={{ color: theme.colors.onBackground }}>
          {label}
        </Text>
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

  if (!habit) {
    return (
      <View
        style={{
          padding: 16,
        }}
      >
        <Text style={{ color: theme.colors.error }}>
          Hábito não encontrado.
        </Text>
      </View>
    );
  }

  const [selectedMonth, setSelectedMonth] = useState(moment());

  const initialDate = moment(habit.initialDate, "DD/MM/YYYY");
  const endDate = habit.endDate ? moment(habit.endDate, "DD/MM/YYYY") : null;

  const formattedInitialDate = initialDate.format("DD/MM/YYYY");
  const formattedEndDate = endDate
    ? endDate.format("DD/MM/YYYY")
    : "Indeterminado";

  moment.locale("pt-br");
  const weekDays = moment.weekdaysShort(true);
  const formattedFrequency = habit.frequency
    .map((day) => weekDays[day])
    .join(", ");

  const notificationTime = habit.frequencyTime
    ? moment(habit.frequencyTime, "HH:mm").format("HH:mm")
    : null;

  const currentDate = selectedMonth.format("YYYY-MM-DD");
  const monthlyStats = useMemo(
    () => getHabitStatsForMonth(currentDate, habit),
    [habit, currentDate]
  );

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
    if (newMonth.isSameOrAfter(initialDate.clone().startOf("month"))) {
      Vibration.vibrate(50);
      setSelectedMonth(newMonth);
    } else {
      Vibration.vibrate(100);
    }
  };

  const handleNextMonth = () => {
    const newMonth = selectedMonth.clone().add(1, "month");
    if (!endDate || newMonth.isSameOrBefore(endDate.clone().endOf("month"))) {
      Vibration.vibrate(50);
      setSelectedMonth(newMonth);
    } else {
      Vibration.vibrate(100);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <Card
        style={{
          marginBottom: 16,
          padding: 16,
          alignItems: "center",
          borderRadius: 15,
          marginTop: 30,
        }}
      >
        <View
          style={{
            alignItems: "center",
            paddingTop: 25,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.background,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              borderWidth: 5,
              borderStyle: "solid",
              borderRadius: 50,
              top: -55,
              height: 75,
              width: 75,
            }}
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

      <Card style={styles.summaryCard}>
        <Card.Title
          title="Estatística do mês"
          titleStyle={{ fontWeight: "bold" }}
        />
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ color: theme.colors.onBackground }}>
              Porcentagem de Conclusão
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                fontWeight: "bold",
                color: theme.colors.primary,
              }}
            >
              {monthlyStats.completionPercentage}%
            </Text>
          </View>
          <ProgressBar
            progress={monthlyStats.completionPercentage / 100}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text
                variant="titleLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.onBackground,
                }}
              >
                {capitalizeFirstLetter(selectedMonth.format("MMMM"))}{" "}
              </Text>
              <Text
                variant="bodyLarge"
                style={{
                  fontWeight: "bold",
                  color: theme.colors.primary,
                }}
              >
                {selectedMonth.format("YYYY")}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <IconButton
                icon="chevron-right"
                size={24}
                onPress={handleNextMonth}
                disabled={
                  endDate
                    ? selectedMonth.isSameOrAfter(
                        endDate.clone().endOf("month")
                      )
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
          </View>

          <MonthlyHeatmap
            habit={habit}
            currentDate={currentDate}
            completionDates={completionDates}
            initialDate={initialDate}
            endDate={endDate}
          />
        </Card.Content>
      </Card>

      <Card style={styles.summaryCard}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 5,
            }}
          >
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
        </Card.Content>
      </Card>

      <Card
        style={{
          marginBottom: 16,
          borderRadius: 15,
        }}
      >
        <Card.Title
          title="Informações do hábito"
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

      <Button
        mode="contained"
        onPress={() => {
          Vibration.vibrate(100);
          navigation.navigate("EditHabit", { habitId: habit.id });
        }}
        style={{
          borderRadius: 15,
          marginBottom: 16,
        }}
        contentStyle={{ padding: 8 }}
      >
        Editar Hábito
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryCard: {
    marginBottom: 16,
    borderRadius: 15,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default HabitDetails;
