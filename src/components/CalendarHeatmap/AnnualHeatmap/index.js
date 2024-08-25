// /components/AnnualHeatMap.js
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Svg, { Rect } from "react-native-svg";
import moment from "moment";
import { useDispatch } from "react-redux";

const AnnualHeatMap = ({ habit: { completedDates, id }, color }) => {
  const dispatch = useDispatch();
  const currentYear = moment().year(); // Ano atual

  // Converter datas concluídas para o formato 'YYYY-MM-DD'
  const completedDays = completedDates.map((date) =>
    moment(date, "DD/MM/YYYY").format("DD/MM/YYYY")
  );

  // Obter todos os dias do ano atual
  const daysInYear = Array.from({ length: 12 }, (_, monthIndex) => {
    const daysInMonth = moment(
      `${monthIndex + 1}/${currentYear}`,
      "MM-YYYY"
    ).daysInMonth();
    return Array.from({ length: daysInMonth }, (_, dayIndex) => {
      return moment(
        `${dayIndex + 1}/${monthIndex + 1}/${currentYear}`,
        "DD/MM/YYYY"
      );
    });
  }).flat();

  const handleToggleDate = (date) => {
    console.log("ANO", date);
    dispatch({
      type: "TOGGLE_COMPLETE_HABIT",
      payload: {
        id: id,
        date: date,
      },
    });
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {daysInYear.map((day, index) => {
          const date = day.format("DD/MM/YYYY");
          const isCompleted = completedDays.includes(date);

          return (
            <TouchableOpacity onPress={() => handleToggleDate(date)}>
              <Svg key={index} width="15" height="15" style={{ margin: 1 }}>
                <Rect
                  width="15"
                  height="15"
                  rx="3"
                  ry="3"
                  fill={isCompleted ? color : "lightgrey"}
                  stroke={date === moment().format("DD/MM/YYYY") ? `#888` : ""}
                  strokeWidth={"5"}
                />
              </Svg>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default AnnualHeatMap;
