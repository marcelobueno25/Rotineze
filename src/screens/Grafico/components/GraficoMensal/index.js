import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { Card, Text, useTheme, IconButton } from "react-native-paper";
import moment from "moment";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CardGrafico } from "../components/CardGrafico";
import { getHabitsForMonth, getTopHabitSequencesForMonth } from "@utils/habits";

// Componente de Seleção de Mês
const MonthSelector = ({ selectedMonth, onChangeMonth }) => {
  const theme = useTheme();

  // Função para manipular a mudança de mês (anterior e próximo)
  const handleMonthChange = (direction) => {
    const newMonth = moment(selectedMonth)
      .add(direction, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    onChangeMonth(newMonth);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      {/* Botão de mês anterior */}
      <IconButton
        icon="chevron-left"
        size={24}
        onPress={() => handleMonthChange(-1)}
        color={theme.colors.primary}
      />

      {/* Nome do mês atual */}
      <Text
        variant="titleMedium"
        style={{
          color: theme.colors.primary,
          fontWeight: "bold",
        }}
      >
        {moment(selectedMonth).format("MMMM [de] YYYY")}
      </Text>

      {/* Botão de próximo mês */}
      <IconButton
        icon="chevron-right"
        size={24}
        onPress={() => handleMonthChange(1)}
        color={theme.colors.primary}
      />
    </View>
  );
};

export function GraficoMensal() {
  const theme = useTheme();
  const habits = useSelector((state) => state.habits.habits) || [];

  // Estado para controlar o mês selecionado
  const [selectedMonth, setSelectedMonth] = useState(
    moment().startOf("month").format("YYYY-MM-DD")
  );

  // Obtém as informações do mês usando `getHabitsForMonth`
  const monthStats = useMemo(
    () => getHabitsForMonth(selectedMonth, habits),
    [selectedMonth, habits]
  );

  // Obtém o Rank dos hábitos com maior sequência no mês
  const topHabits = useMemo(
    () => getTopHabitSequencesForMonth(selectedMonth, habits),
    [selectedMonth, habits]
  );

  return (
    <>
      {/* Cartão principal com a porcentagem de conclusão */}
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
            style={{ color: "white", fontWeight: "bold" }}
          >
            {monthStats.completionPercentage}%
          </Text>
          <Text
            variant="titleMedium"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Porcentagem de conclusão
          </Text>
        </View>
      </Card>

      {/* Componente de Seleção de Mês */}
      <MonthSelector
        selectedMonth={selectedMonth}
        onChangeMonth={setSelectedMonth}
      />

      {/* Cartões com estatísticas do mês */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <CardGrafico
          icon="calendar"
          label="Hábitos Pendentes"
          number={monthStats.totalHabitDays}
          color="#9C27B0"
        />
        <CardGrafico
          icon="check-circle"
          label="Hábitos Concluídos"
          number={monthStats.completedHabitsCount}
          color="#4CAF50"
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
          icon="chart-line"
          label="Taxa de Conclusão Mensal"
          number={`${monthStats.completionPercentage}%`}
          color="#FF5722"
        />
        <CardGrafico
          icon="checkbox-marked-circle-outline"
          label="Total de Hábitos"
          number={monthStats.totalHabitsInMonth}
          color="#3F51B5"
        />
      </View>

      {/* Rank dos Hábitos com maior sequência de check-ins */}
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
                    //fontSize: 18,
                    color: theme.colors.primary,
                    marginRight: 15,
                  }}
                >
                  #{index + 1}
                </Text>
                {/* Ícone de fogo para indicar sequência */}
                <Icon
                  name="fire"
                  size={24}
                  color="#FF5722"
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
