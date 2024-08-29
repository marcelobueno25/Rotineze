import React from "react";
import { View, TouchableOpacity } from "react-native";
import Svg, { Rect, Text as SvgText, Circle } from "react-native-svg";
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
        const isFutureDate = moment(date, "DD/MM/YYYY").isAfter(
          moment(),
          "day"
        );
        const isToday = moment(date, "DD/MM/YYYY").isSame(moment(), "day");
        const isPastDate = moment(date, "DD/MM/YYYY").isBefore(moment(), "day");

        return (
          <TouchableOpacity
            key={dayIndex}
            onPress={() => handleToggleDate(date)}
            disabled={isFutureDate}
          >
            <Svg width="30" height="30" style={{ margin: 2 }}>
              <Rect
                width="30"
                height="30"
                rx="23"
                ry="23"
                fill={isCompleted ? color : "lightgrey"}
              />
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
              {isToday && (
                <Circle
                  cx="15"
                  cy="15"
                  r="4"
                  fill="#fff" // Cor do círculo interno para o dia de hoje
                />
              )}
              {isPastDate && (
                <SvgText
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dy=".3em"
                  fontSize="10"
                  fill="black" // Cor do texto para os dias passados
                >
                  {dayIndex + 1}
                </SvgText>
              )}
            </Svg>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MonthlyHeatMap;
