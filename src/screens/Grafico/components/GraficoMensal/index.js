import React, { useMemo, useState } from "react";
import { View, Vibration } from "react-native";
import { useSelector } from "react-redux";
import { Card, Text, useTheme, IconButton } from "react-native-paper";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getHabitsForMonth, getTopHabitSequencesForMonth } from "@utils/habits";
import { capitalizeFirstLetter } from "@utils/string";
import { CardGrafico } from "../components/CardGrafico";

const MonthSelector = ({ selectedMonth, onChangeMonth }) => {
  const theme = useTheme();

  const handleMonthChange = (direction) => {
    const newMonth = moment(selectedMonth)
      .add(direction, "month")
      .startOf("month");
    onChangeMonth(newMonth);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
          {capitalizeFirstLetter(moment(selectedMonth).format("MMMM"))}{" "}
        </Text>
        <Text
          variant="bodyLarge"
          style={{
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          {moment(selectedMonth).format("YYYY")}
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          icon="chevron-left"
          size={24}
          onPress={() => {
            Vibration.vibrate(50);
            handleMonthChange(-1);
          }}
          color={theme.colors.primary}
        />
        <IconButton
          icon="chevron-right"
          size={24}
          onPress={() => {
            Vibration.vibrate(50);
            handleMonthChange(1);
          }}
          color={theme.colors.primary}
        />
      </View>
    </View>
  );
};

export function GraficoMensal() {
  const theme = useTheme();
  const habits = useSelector((state) => state.habits.habits) || [];

  const [selectedMonth, setSelectedMonth] = useState(moment().startOf("month"));

  const monthStats = useMemo(
    () => getHabitsForMonth(selectedMonth, habits),
    [selectedMonth, habits]
  );

  const topHabits = useMemo(
    () => getTopHabitSequencesForMonth(selectedMonth, habits),
    [selectedMonth, habits]
  );

  return (
    <>
      <Card
        style={{
          borderRadius: 10,
          marginVertical: 10,
          padding: 20,
          backgroundColor: theme.colors.primary,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            variant="headlineLarge"
            style={{ color: theme.colors.background, fontWeight: "bold" }}
          >
            {monthStats.completionPercentage}%
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.background, fontWeight: "bold" }}
          >
            Porcentagem de Conclusão
          </Text>
        </View>
      </Card>

      <MonthSelector
        selectedMonth={selectedMonth}
        onChangeMonth={setSelectedMonth}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <CardGrafico
          icon="alert-circle"
          label="Pendentes"
          number={monthStats.totalHabitDays}
          color={theme.colors.warning}
        />
        <CardGrafico
          icon="check-circle"
          label="Concluídos"
          number={monthStats.completedHabitsCount}
          color={theme.colors.success}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <CardGrafico
          icon="chart-pie"
          label="Taxa Conclusão Mensal"
          number={`${monthStats.completionPercentage}%`}
          color="#FF5722"
        />
        <CardGrafico
          icon="checkbox-multiple-blank-circle"
          label="Total de Hábitos"
          number={monthStats.totalHabitsInMonth}
          color={theme.colors.primary}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          variant="titleMedium"
          style={{
            marginBottom: 20,
            fontWeight: "bold",
            color: theme.colors.onBackground,
            textAlign: "center",
          }}
        >
          Top 3 Hábitos com Maior Sequência
        </Text>
        {topHabits.length > 0 ? (
          topHabits.map((rankItem, index) => (
            <Card
              key={rankItem.habit.id}
              style={{
                marginBottom: 10,
                padding: 15,
                backgroundColor: theme.colors.surface,
                borderRadius: 10,
                elevation: 3,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: "bold",
                    color: theme.colors.primary,
                    marginRight: 15,
                  }}
                >
                  #{index + 1}
                </Text>

                <Icon
                  name="fire"
                  size={24}
                  color={theme.colors.orange}
                  style={{ marginRight: 10 }}
                />
                <Text
                  variant="titleSmall"
                  style={{
                    fontWeight: "bold",
                    flex: 1,
                    color: theme.colors.onBackground,
                  }}
                >
                  {rankItem.habit.name}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{
                    fontWeight: "bold",
                    color: theme.colors.onBackground,
                  }}
                >
                  {rankItem.maxSequence} dias
                </Text>
              </View>
            </Card>
          ))
        ) : (
          <Text
            style={{ color: theme.colors.onBackground, textAlign: "center" }}
          >
            Nenhuma sequência significativa este mês.
          </Text>
        )}
      </View>
    </>
  );
}
