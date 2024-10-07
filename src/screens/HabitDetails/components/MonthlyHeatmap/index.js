import React from "react";
import { View, TouchableOpacity, Vibration } from "react-native";
import moment from "moment";
import { useTheme, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { checkHabit } from "@redux/habitSlice";

const MonthlyHeatmap = ({ habit, currentDate, initialDate, endDate }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const startOfMonth = moment(currentDate).startOf("month");
  const endOfMonth = moment(currentDate).endOf("month");

  const startDayOfWeek = startOfMonth.clone().startOf("isoWeek");

  const endDayOfWeek = endOfMonth.clone().endOf("isoWeek");

  const daysArray = [];
  const day = startDayOfWeek.clone();
  while (day.isBefore(endDayOfWeek) || day.isSame(endDayOfWeek, "day")) {
    daysArray.push(day.clone());
    day.add(1, "day");
  }

  const completionDates = habit.checkIns || [];

  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  const handleCheckHabit = (date) => {
    Vibration.vibrate(100);
    dispatch(checkHabit({ id: habit.id, date }));
  };

  const isDateEnabled = (day) => {
    const date = day.clone().startOf("day");
    if (endDate) {
      return (
        date.isSameOrAfter(initialDate, "day") &&
        date.isSameOrBefore(endDate, "day")
      );
    }
    return date.isSameOrAfter(initialDate, "day");
  };

  return (
    <View>
      <View style={{ flexDirection: "row", marginBottom: 5 }}>
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((dayName) => (
          <View key={dayName} style={{ flex: 1, alignItems: "center" }}>
            <Text
              variant="labelMedium"
              style={{
                color: theme.colors.onBackground,
                fontWeight: "bold",
              }}
            >
              {dayName}
            </Text>
          </View>
        ))}
      </View>

      {weeks.map((weekDays, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          {weekDays.map((day) => {
            const isCurrentMonth = day.month() === startOfMonth.month();
            const dateString = day.format("DD/MM/YYYY");
            const isCompleted = completionDates.includes(
              day.format("DD/MM/YYYY")
            );
            const enabled = isCurrentMonth && isDateEnabled(day);

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
                  opacity: enabled ? 1 : 0.3,
                }}
              >
                {isCurrentMonth &&
                  (enabled ? (
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
                        variant="labelMedium"
                        style={{
                          fontWeight: "bold",
                          color: isCompleted
                            ? theme.colors.onPrimary
                            : theme.colors.onSurface,
                        }}
                      >
                        {day.date()}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 15,
                        backgroundColor: theme.colors.disabled,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        variant="labelMedium"
                        style={{
                          fontWeight: "bold",

                          color: theme.colors.onSurface,
                        }}
                      >
                        {day.date()}
                      </Text>
                    </View>
                  ))}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

export default MonthlyHeatmap;
