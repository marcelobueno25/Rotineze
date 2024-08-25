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
          <TouchableOpacity onPress={() => handleToggleDate(date)}>
            <Svg key={dayIndex} width="25" height="25" style={{ margin: 2 }}>
              <Rect
                width="25"
                height="25"
                rx="5"
                ry="5"
                fill={isCompleted ? color : "lightgrey"}
                stroke={date === moment().format("DD/MM/YYYY") ? `#888` : ""}
                strokeWidth={"5"}
              />
            </Svg>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MonthlyHeatMap;
