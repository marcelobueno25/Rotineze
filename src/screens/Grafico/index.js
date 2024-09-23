import React, { useState, useMemo } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { CalendarProvider, Calendar } from "react-native-calendars";
import moment from "moment";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Svg, { Circle } from "react-native-svg";

function CardGrafico({ icon, color, number, label }) {
  const theme = useTheme();

  return (
    <Card
      style={[styles.smallCard, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ alignItems: "center" }}>
        <Icon name={icon} size={24} color={color} />
        <Text
          variant="titleMedium"
          style={{
            backgroundColor: theme.colors.background,
            fontWeight: "bold",
            marginVertical: 5,
          }}
        >
          {number}
        </Text>
        <Text
          variant="labelMedium"
          style={{
            backgroundColor: theme.colors.background,
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      </View>
    </Card>
  );
}

export function Grafico() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  const dailyRecords = useSelector((state) => state.habits.dailyRecords) || [];
  const habits = useSelector((state) => state.habits.habits) || [];

  // Mapeia os registros diários para fácil acesso
  const dailyRecordsMap = useMemo(() => {
    return dailyRecords.reduce((acc, record) => {
      const date = moment(record.date, "DD/MM/YYYY").format("YYYY-MM-DD");
      acc[date] = record;
      return acc;
    }, {});
  }, [dailyRecords]);

  // Objeto de marcações para o calendário
  const markedDates = useMemo(() => {
    const marks = {};

    // Marca as datas com registros diários
    Object.keys(dailyRecordsMap).forEach((date) => {
      marks[date] = {
        marked: true,
        // Customização adicional, se necessário
      };
    });

    // Garante que a data selecionada está incluída e marcada como selecionada
    marks[selectedDate] = {
      ...(marks[selectedDate] || {}),
      selected: true,
      selectedColor: theme.colors.primaryContainer,
    };

    return marks;
  }, [dailyRecordsMap, selectedDate]);

  // Função para renderizar cada dia
  const renderDay = (dayProps) => {
    const { date, state } = dayProps;
    const dateString = date.dateString;

    // Verifica se há hábitos neste dia
    const record = dailyRecordsMap[dateString];
    const isSelected = dateString === selectedDate;

    if (!record) {
      // Renderiza o dia padrão
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedDate(dateString);
          }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              color: isSelected
                ? theme.colors.onBackground
                : state === "disabled"
                ? "#D3D3D3"
                : theme.colors.onSurface,
              backgroundColor: isSelected
                ? theme.colors.primaryContainer
                : "transparent",
              borderRadius: 16,
              width: 32,
              height: 32,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            {date.day}
          </Text>
        </TouchableOpacity>
      );
    }

    const completionPercentage = record.completionPercentage;

    // Cores e estilos
    const textColor = theme.colors.onBackground;
    const backgroundColor = isSelected
      ? theme.colors.primaryContainer
      : theme.colors.background;

    // Cálculo do offset para o círculo de progresso
    const strokeDashoffset = 283 - (283 * completionPercentage) / 100;

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(dateString);
        }}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <View
          style={{
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Svg height="40" width="40" viewBox="0 0 100 100">
            {/* Círculo de fundo */}
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke={theme.colors.background}
              strokeWidth="10"
              fill={backgroundColor}
            />
            {/* Círculo de progresso */}
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="#4CAF50" // Cor na Borda
              strokeWidth="10"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              rotation="-90"
              origin="50,50"
            />
          </Svg>
          {/* Número do dia ou ícone */}
          {completionPercentage === 100 ? (
            <Icon
              name="check-outline"
              size={18}
              color={textColor}
              style={{ position: "absolute" }}
            />
          ) : (
            <Text
              style={{
                position: "absolute",
                color: textColor,
                fontSize: 14,
              }}
            >
              {date.day}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Obtém os dados do dia selecionado
  const selectedDayRecord = dailyRecordsMap[selectedDate];

  // Mapeia os IDs dos hábitos para os objetos completos
  const completedHabitsDetails = useMemo(() => {
    if (!selectedDayRecord || !selectedDayRecord.completedHabits) return [];
    return selectedDayRecord.completedHabits
      .map((habitId) => habits.find((habit) => habit.id === habitId))
      .filter(Boolean); // Remove quaisquer valores undefined
  }, [selectedDayRecord, habits]);

  const notCheckedHabitsDetails = useMemo(() => {
    if (!selectedDayRecord || !selectedDayRecord.notCheckedHabits) return [];
    return selectedDayRecord.notCheckedHabits
      .map((habitId) => habits.find((habit) => habit.id === habitId))
      .filter(Boolean);
  }, [selectedDayRecord, habits]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card
        style={[styles.mainCard, { backgroundColor: theme.colors.primary }]}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            variant="headlineLarge"
            style={{
              color: theme.colors.background,
              fontWeight: "bold",
            }}
          >
            {selectedDayRecord
              ? `${selectedDayRecord.completionPercentage}%`
              : "0%"}
          </Text>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.background,
              marginTop: 5,
            }}
          >
            Porcentagem de conclusão
          </Text>
        </View>
      </Card>

      <CalendarProvider
        date={selectedDate}
        onDateChanged={(date) => {
          setSelectedDate(date);
        }}
        theme={{
          todayButtonTextColor: theme.colors.primary,
        }}
        style={{ marginBottom: 20 }}
      >
        <Calendar
          dayComponent={renderDay}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
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
          icon="calendar"
          label="Total de dias perfeitos"
          number="1 dia"
          color="#9C27B0"
        />
        <CardGrafico
          icon="check-circle"
          label="Total de hábitos concluídos"
          number={selectedDayRecord ? completedHabitsDetails.length : 0}
          color="#4CAF50"
        />
      </View>

      <View style={styles.cardRow}>
        <CardGrafico
          icon="chart-line"
          label="Taxa total de conclusão"
          number={`${
            selectedDayRecord ? selectedDayRecord.completionPercentage : 0
          }%`}
          color="#FF5722"
        />
        <CardGrafico
          icon="chart-bar"
          label="Hábitos no dia"
          number={selectedDayRecord ? selectedDayRecord.totalHabits : 0}
          color="#E91E63"
        />
      </View>

      {/* Cartões com os detalhes dos hábitos do dia selecionado */}
      {completedHabitsDetails.map((habit) => (
        <Card key={habit.id} style={styles.habitCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={habit.icon} size={24} color={habit.color} />
            <Text style={{ marginLeft: 10 }}>{habit.name}</Text>
          </View>
        </Card>
      ))}

      {notCheckedHabitsDetails.map((habit) => (
        <Card key={habit.id} style={styles.habitCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name={habit.icon} size={24} color="#B0B0B0" />
            <Text style={{ marginLeft: 10, color: "#B0B0B0" }}>
              {habit.name}
            </Text>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
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
  smallCard: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
  },
  habitCard: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
  },
});
