import React, { useState, useMemo, useCallback } from "react";
import { View, TouchableOpacity, Vibration } from "react-native";
import { useTheme, IconButton, Text } from "react-native-paper";
import moment from "moment";
import { capitalizeFirstLetter } from "@utils/string";
import MoodImage from "./MoodImage";

const Header = React.memo(
  ({ currentMonth, setCurrentMonth, goToToday, showTodayButton }) => {
    const theme = useTheme();
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
            {capitalizeFirstLetter(currentMonth.format("MMMM"))}{" "}
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              fontWeight: "bold",
              color: theme.colors.primary,
            }}
          >
            {currentMonth.format("YYYY")}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton
            icon="chevron-left"
            size={24}
            color={theme.colors.primary}
            onPress={() => {
              Vibration.vibrate(50);
              setCurrentMonth(currentMonth.clone().subtract(1, "month"));
            }}
          />
          <IconButton
            icon="chevron-right"
            size={24}
            color={theme.colors.primary}
            onPress={() => {
              Vibration.vibrate(50);
              setCurrentMonth(currentMonth.clone().add(1, "month"));
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                Vibration.vibrate(200);
                goToToday();
              }}
              style={{ marginLeft: 5, padding: 5 }}
            >
              <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
                Hoje
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
);

const DaysOfWeek = React.memo(() => {
  const theme = useTheme();
  const DAYS_OF_WEEK = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 5,
      }}
    >
      {DAYS_OF_WEEK.map((day) => (
        <Text
          key={day}
          style={{
            width: 32,
            textAlign: "center",
            fontWeight: "bold",
            color: theme.colors.onSurface,
          }}
        >
          {day}
        </Text>
      ))}
    </View>
  );
});

const WeekRow = React.memo(
  ({ week, currentMonth, selectedDate, setSelectedDate, dailyRecordsMap }) => {
    const theme = useTheme();
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 5,
        }}
      >
        {week.map((dayItem) => {
          const dateString = dayItem.format("YYYY-MM-DD");
          const isCurrentMonth = dayItem.month() === currentMonth.month();
          const isSelected = dateString === selectedDate;
          const record = dailyRecordsMap[dateString];
          const completionPercentage = record
            ? record.completionPercentage
            : null;
          const isToday = dayItem.isSame(moment(), "day");

          return (
            <Day
              key={dayItem.format("DD-MM-YYYY")}
              dayItem={dayItem}
              isCurrentMonth={isCurrentMonth}
              isSelected={isSelected}
              isToday={isToday}
              completionPercentage={completionPercentage}
              setSelectedDate={setSelectedDate}
              theme={theme}
            />
          );
        })}
      </View>
    );
  }
);

const Day = React.memo(
  ({
    dayItem,
    isCurrentMonth,
    isSelected,
    isToday,
    completionPercentage,
    setSelectedDate,
    theme,
  }) => {
    const dateString = dayItem.format("YYYY-MM-DD");
    return (
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          backgroundColor: isSelected
            ? theme.colors.primaryContainer
            : "transparent",
        }}
        onPress={() => setSelectedDate(dateString)}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {completionPercentage !== null ? (
            <MoodImage completionPercentage={completionPercentage} />
          ) : (
            <Text
              style={{
                color: isSelected
                  ? theme.colors.onBackground
                  : isCurrentMonth
                  ? isToday
                    ? theme.colors.primary
                    : theme.colors.onBackground
                  : "#A9A9A9",
                fontWeight: isToday ? "bold" : "normal",
              }}
            >
              {dayItem.date()}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

export const CustomCalendar = ({
  selectedDate,
  setSelectedDate,
  dailyRecordsMap,
}) => {
  const [currentMonth, setCurrentMonth] = useState(moment());

  const today = moment();

  const calendar = useMemo(() => {
    const startOfMonth = currentMonth.clone().startOf("month").startOf("week");
    const endOfMonth = currentMonth.clone().endOf("month").endOf("week");
    const day = startOfMonth.clone().subtract(1, "day");
    const weeks = [];

    while (day.isBefore(endOfMonth, "day")) {
      weeks.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    return weeks;
  }, [currentMonth]);

  const renderWeek = useCallback(
    (week, index) => (
      <WeekRow
        key={index}
        week={week}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dailyRecordsMap={dailyRecordsMap}
      />
    ),
    [currentMonth, selectedDate, setSelectedDate, dailyRecordsMap]
  );

  const goToToday = () => {
    setCurrentMonth(today);
    setSelectedDate(today.format("YYYY-MM-DD"));
  };

  const showTodayButton = !today.isSame(currentMonth, "month");

  return (
    <View>
      <Header
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
        goToToday={goToToday}
        showTodayButton={showTodayButton}
      />
      <DaysOfWeek />
      {calendar.map((week, index) => renderWeek(week, index))}
    </View>
  );
};
