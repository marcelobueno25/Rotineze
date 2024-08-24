import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Svg, Rect } from "react-native-svg";
import moment from "moment";

const HeatMap = ({ dates, view }) => {
  const getHeatMapData = () => {
    let data = [];
    let currentDate = moment();

    switch (view) {
      case "week":
        // Gerar a visualização semanal
        for (let i = 0; i < 7; i++) {
          let date = currentDate.subtract(1, "days").format("YYYY-MM-DD");
          data.push({
            date,
            filled: dates.includes(date),
            day: moment(date).format("dd")[0], // Primeiro caracter do dia
          });
        }
        break;
      case "month":
        // Gerar a visualização mensal
        let daysInMonth = currentDate.daysInMonth();
        for (let i = 1; i <= daysInMonth; i++) {
          let date = currentDate.date(i).format("YYYY-MM-DD");
          data.push({
            date,
            filled: dates.includes(date),
            day: i,
          });
        }
        break;
      case "year":
        // Gerar a visualização anual
        for (let i = 0; i < 12; i++) {
          let daysInMonth = moment().month(i).daysInMonth();
          data.push({
            month: moment().month(i).format("MMM")[0], // Primeiro caracter do mês
            filledDays: dates.filter((date) => moment(date).month() === i)
              .length,
            totalDays: daysInMonth,
          });
        }
        break;
    }

    return data;
  };

  const renderHeatMap = () => {
    const data = getHeatMapData();

    return (
      <Svg height="100" width="100%">
        {data.map((item, index) => (
          <Rect
            key={index}
            x={(index % 7) * 15}
            y={Math.floor(index / 7) * 15}
            width="10"
            height="10"
            fill={item.filled ? "green" : "gray"}
          />
        ))}
      </Svg>
    );
  };

  return <View style={styles.container}>{renderHeatMap()}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default HeatMap;
