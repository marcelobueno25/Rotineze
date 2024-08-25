import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Rect } from "react-native-svg";
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
        return (
          <View key={index} style={{ alignItems: "center", margin: 3 }}>
            <Text style={{ textAlign: "center", marginBottom: 3 }}>
              {day.value}
            </Text>
            <TouchableOpacity
              key={index}
              onPress={() => handleToggleDate(currentDate)}
            >
              <Svg width="35" height="35">
                <Rect
                  width="35"
                  height="35"
                  rx="35"
                  ry="35"
                  fill={isCheckedOut(currentDate) ? color : "lightgray"}
                />
              </Svg>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default WeeklyHeatmap;
