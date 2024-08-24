import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Rect } from "react-native-svg";
import moment from "moment";
import HeatMapModal from "../HeatMapModal";

const daysOfWeek = [
  { label: "S", value: "seg" },
  { label: "T", value: "ter" },
  { label: "Q", value: "qua" },
  { label: "Q", value: "qui" },
  { label: "S", value: "sex" },
  { label: "D", value: "dom" },
];

const WeeklyHeatmap = ({ completedDates, color }) => {
  // Formatando as datas recebidas para a semana atual
  const completedDays = completedDates.map(
    (date) => moment(date, "DD/MM/YYYY").format("ddd") // Usando 'dd' e pegando o primeiro caractere
  );

  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = () => setModalVisible(false);

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {daysOfWeek.map((day, index) => (
          <View key={index} style={{ alignItems: "center", margin: 2 }}>
            <Text style={{ textAlign: "center" }}>{day.label}</Text>
            <Svg width="35" height="35">
              <Rect
                width="35"
                height="35"
                rx="10"
                ry="10"
                fill={completedDays.includes(day.value) ? color : "lightgrey"}
              />
            </Svg>

            <HeatMapModal visible={modalVisible} onClose={hideModal} />
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default WeeklyHeatmap;
