import React from "react";
import { View, TouchableOpacity } from "react-native";
import Svg, { Rect } from "react-native-svg";
import moment from "moment";
import { useDispatch } from "react-redux";

const MonthlyHeatMap = ({ habit: { completedDates, id }, color }) => {
  const dispatch = useDispatch();
  const daysInMonth = moment().daysInMonth(); // Número de dias no mês atual
  const currentYear = moment().year(); // Ano atual
  const monthIndex = moment().month(); // Índice do mês atual

  // Converter datas concluídas para o formato 'YYYY-MM-DD'
  const completedDays = completedDates.map((date) =>
    moment(date, "DD/MM/YYYY").format("DD/MM/YYYY")
  );

  const handleToggleDate = (date) => {
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
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {Array.from({ length: daysInMonth }, (_, dayIndex) => {
        const date = moment(
          `${dayIndex + 1}/${monthIndex + 1}/${currentYear}`,
          "DD/MM/YYYY"
        ).format("DD/MM/YYYY");

        const isCompleted = completedDays.includes(date);

        return (
          <TouchableOpacity
            key={dayIndex}
            onPress={() => handleToggleDate(date)}
          >
            <Svg width="23" height="23" style={{ margin: 2 }}>
              <Rect
                width="23"
                height="23"
                rx="23"
                ry="23"
                fill={isCompleted ? color : "lightgrey"}
              />
            </Svg>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MonthlyHeatMap;
