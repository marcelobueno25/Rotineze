import React from "react";
import { View, Text, TouchableOpacity, Vibration } from "react-native";
import moment from "moment";
import { useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { checkHabit } from "@redux/habitSlice";

const MonthlyHeatmap = ({ habit, currentDate }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  // Obter o início e o fim do mês atual
  const startOfMonth = moment(currentDate).startOf("month");
  const endOfMonth = moment(currentDate).endOf("month");

  // Obter o primeiro dia da semana (Segunda-feira)
  const startDayOfWeek = startOfMonth.clone().startOf("isoWeek");

  // Obter o último dia da semana (Domingo)
  const endDayOfWeek = endOfMonth.clone().endOf("isoWeek");

  // Gerar um array de dias de startDayOfWeek até endDayOfWeek
  const daysArray = [];
  const day = startDayOfWeek.clone();
  while (day.isBefore(endDayOfWeek) || day.isSame(endDayOfWeek, "day")) {
    daysArray.push(day.clone());
    day.add(1, "day");
  }

  // Obter as datas em que o hábito foi concluído
  // Supondo que habit.completionDates seja um array de datas no formato 'YYYY-MM-DD'
  const completionDates = habit.checkIns || [];

  // Construir as semanas para o calendário
  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  const handleCheckHabit = (date) => {
    Vibration.vibrate(100);
    dispatch(checkHabit({ id: habit.id, date }));
  };

  return (
    <View style={{ padding: 5 }}>
      {/* Cabeçalhos dos dias da semana */}
      <View style={{ flexDirection: "row" }}>
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((dayName) => (
          <View key={dayName} style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 12, color: theme.colors.onBackground }}>
              {dayName}
            </Text>
          </View>
        ))}
      </View>
      {/* Semanas */}
      {weeks.map((weekDays, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          {weekDays.map((day) => {
            const isCurrentMonth = day.month() === startOfMonth.month();
            const dateString = day.format("DD/MM/YYYY");
            const isCompleted = completionDates.includes(
              day.format("DD/MM/YYYY")
            );
            return (
              <View
                key={day.format("DD/MM/YYYY")}
                style={{
                  flex: 1,
                  margin: 2,
                  aspectRatio: 1,
                  borderRadius: 15,
                  backgroundColor: isCurrentMonth
                    ? isCompleted
                      ? theme.colors.primary
                      : theme.colors.surface
                    : theme.colors.background,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isCurrentMonth && (
                  <TouchableOpacity
                    onPress={() => handleCheckHabit(dateString)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: isCompleted
                        ? theme.colors.primary
                        : theme.colors.surface,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: isCompleted
                          ? theme.colors.onPrimary
                          : theme.colors.onSurface,
                        fontSize: 12,
                      }}
                    >
                      {day.date()}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default MonthlyHeatmap;
