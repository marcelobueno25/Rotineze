import React from "react";
import { View, TouchableOpacity, Vibration } from "react-native";
import { Text } from "react-native-paper";
import Svg, { Rect, Text as SvgText, Circle } from "react-native-svg";
import moment from "moment";
import { useDispatch } from "react-redux";

const daysOfWeek = [
  { label: "D", value: "dom" },
  { label: "S", value: "seg" },
  { label: "T", value: "ter" },
  { label: "Q", value: "qua" },
  { label: "Q", value: "qui" },
  { label: "S", value: "sex" },
  { label: "S", value: "sab" },
];

const WeeklyHeatmap = ({ habit: { completedDates, id }, color }) => {
  const dispatch = useDispatch();

  const isCheckedOut = (date) => {
    return completedDates.includes(
      moment(date, "DD/MM/YYYY").format("DD/MM/YYYY")
    );
  };

  const handleToggleDate = (date) => {
    Vibration.vibrate(100);
    dispatch({
      type: "TOGGLE_COMPLETE_HABIT",
      payload: {
        id: id,
        date: date,
      },
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {daysOfWeek.map((day, index) => {
        const currentDate = moment()
          .startOf("week")
          .add(index, "days")
          .format("DD/MM/YYYY");

        const isFutureDate = moment(currentDate, "DD/MM/YYYY").isAfter(
          moment(),
          "day"
        );
        const isToday = moment(currentDate, "DD/MM/YYYY").isSame(
          moment(),
          "day"
        );

        return (
          <View key={index} style={{ alignItems: "center", margin: 3 }}>
            <Text style={{ textAlign: "center", marginBottom: 3 }}>
              {day.value}
            </Text>
            <TouchableOpacity
              key={index}
              onPress={() => handleToggleDate(currentDate)}
              disabled={isFutureDate}
            >
              <Svg width="35" height="35">
                <Rect
                  width="35"
                  height="35"
                  rx="35"
                  ry="35"
                  fill={isCheckedOut(currentDate) ? color : "lightgray"}
                />
                {isToday && (
                  <Circle
                    cx="17.5"
                    cy="17.5"
                    r="5"
                    fill="#fff" // Cor do círculo interno para o dia de hoje
                  />
                )}
                {isFutureDate && (
                  <SvgText
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="18"
                    fill="#999" // Cor do texto "desabilitado"
                  >
                    -
                  </SvgText>
                )}
              </Svg>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default WeeklyHeatmap;
