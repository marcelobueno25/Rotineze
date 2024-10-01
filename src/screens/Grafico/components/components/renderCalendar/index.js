import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import Svg, { Circle } from "react-native-svg";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Importa as imagens dos estados de humor
const moodImages = {
  superTriste: require("@assets/expressionface/gatobravo.png"),
  triste: require("@assets/expressionface/gatolingua.png"),
  normal: require("@assets/expressionface/gatonormal.png"),
  feliz: require("@assets/expressionface/gatofeliz.png"),
  superFeliz: require("@assets/expressionface/gatoapaixonado.png"),
};

export const renderCalendar = (
  dayProps,
  selectedDate,
  setSelectedDate,
  dailyRecordsMap,
  theme
) => {
  const { date, state } = dayProps;
  const dateString = date.dateString;

  const record = dailyRecordsMap[dateString];
  const isSelected = dateString === selectedDate;

  if (!record) {
    return (
      <TouchableOpacity
        onPress={() => setSelectedDate(dateString)}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Text
          style={{
            color: isSelected
              ? theme.colors.onBackground
              : state === "disabled"
              ? "#D3D3D3"
              : theme.colors.onSurface,
            backgroundColor: isSelected
              ? theme.colors.primaryContainer
              : "transparent",
            borderRadius: 16,
            width: 32,
            height: 32,
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  }

  const completionPercentage = record.completionPercentage;
  // const textColor = theme.colors.onBackground;
  const backgroundColor = isSelected
    ? theme.colors.primaryContainer
    : theme.colors.background;
  // const strokeDashoffset = 283 - (283 * completionPercentage) / 100;

  // Função para escolher a imagem com base na porcentagem de conclusão
  const getMoodImage = (percentage) => {
    if (percentage === 100) {
      return moodImages.superFeliz;
    } else if (percentage >= 60) {
      return moodImages.feliz;
    } else if (percentage >= 40) {
      return moodImages.normal;
    } else if (percentage >= 20) {
      return moodImages.triste;
    } else {
      return moodImages.superTriste;
    }
  };

  const moodImage = getMoodImage(completionPercentage);

  return (
    <TouchableOpacity
      onPress={() => setSelectedDate(dateString)}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Svg height="40" width="40" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="50"
            //stroke={theme.colors.background}
            strokeWidth="20"
            fill={backgroundColor}
          />
          {/* <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#4CAF50"
            strokeWidth="10"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            origin="50,50"
          /> */}
        </Svg>
        {/* {completionPercentage === 100 ? (
          <Icon
            name="check-outline"
            size={18}
            color={textColor}
            style={{ position: "absolute" }}
          />
        ) : (
          <Text
            style={{ position: "absolute", color: textColor, fontSize: 14 }}
          >
            {date.day}
          </Text>
        )} */}
        <Image
          source={moodImage}
          style={{ position: "absolute", width: 35, height: 45 }}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};
