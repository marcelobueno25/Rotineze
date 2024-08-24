// /components/MonthlyHeatMap.js
import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect } from "react-native-svg";
import moment from "moment";
import "moment/locale/pt-br"; // Importa o locale em português

// Configura o moment para usar o português
moment.locale("pt-br");

const MonthlyHeatMap = ({ completedDates, color }) => {
  const currentMonth = moment().format("MMMM"); // Nome do mês atual
  const daysInMonth = moment().daysInMonth(); // Número de dias no mês atual
  const currentYear = moment().year(); // Ano atual
  const monthIndex = moment().month(); // Índice do mês atual

  // Converter datas concluídas para o formato 'YYYY-MM-DD'
  const completedDays = completedDates.map((date) =>
    moment(date, "DD/MM/YYYY").format("YYYY-MM-DD")
  );

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: daysInMonth }, (_, dayIndex) => {
          const date = moment(
            `${currentYear}-${monthIndex + 1}-${dayIndex + 1}`,
            "YYYY-MM-DD"
          ).format("YYYY-MM-DD");
          const isCompleted = completedDays.includes(date);

          return (
            <Svg key={dayIndex} width="25" height="25" style={{ margin: 2 }}>
              <Rect
                width="25"
                height="25"
                rx="5"
                ry="5"
                fill={isCompleted ? color : "lightgrey"}
              />
            </Svg>
          );
        })}
      </View>
    </View>
  );
};

export default MonthlyHeatMap;
