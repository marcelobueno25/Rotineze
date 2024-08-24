// /components/AnnualHeatMap.js
import React from "react";
import { View, Text } from "react-native";
import Svg, { Rect } from "react-native-svg";
import moment from "moment";
import "moment/locale/pt-br"; // Importa o locale em português

// Configura o moment para usar o português
moment.locale("pt-br");

const AnnualHeatMap = ({ completedDates, color }) => {
  const currentYear = moment().year(); // Ano atual

  // Converter datas concluídas para o formato 'YYYY-MM-DD'
  const completedDays = completedDates.map((date) =>
    moment(date, "DD/MM/YYYY").format("YYYY-MM-DD")
  );

  // Obter todos os dias do ano atual
  const daysInYear = Array.from({ length: 12 }, (_, monthIndex) => {
    const daysInMonth = moment(
      `${currentYear}-${monthIndex + 1}`,
      "YYYY-MM"
    ).daysInMonth();
    return Array.from({ length: daysInMonth }, (_, dayIndex) => {
      return moment(
        `${currentYear}-${monthIndex + 1}-${dayIndex + 1}`,
        "YYYY-MM-DD"
      );
    });
  }).flat();

  return (
    <View style={{ alignItems: "center" }}>
      {/* Renderiza a grade de dias do ano */}
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {daysInYear.map((day, index) => {
          const date = day.format("YYYY-MM-DD");
          const isCompleted = completedDays.includes(date);

          return (
            <Svg key={index} width="15" height="15" style={{ margin: 1 }}>
              <Rect
                width="15"
                height="15"
                rx="3"
                ry="3"
                fill={isCompleted ? color : "lightgrey"}
              />
            </Svg>
          );
        })}
      </View>
    </View>
  );
};

export default AnnualHeatMap;
