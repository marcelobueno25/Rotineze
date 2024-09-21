import React from "react";
import { View, TouchableOpacity, Vibration } from "react-native";
import { Text } from "react-native-paper";
import Svg, { Rect, Text as SvgText, Circle } from "react-native-svg";
import moment from "moment";
import { useDispatch } from "react-redux";

const daysOfWeek = [
  { label: "D", value: 0 }, // Domingo
  { label: "S", value: 1 }, // Segunda-feira
  { label: "T", value: 2 }, // Terça-feira
  { label: "Q", value: 3 }, // Quarta-feira
  { label: "Q", value: 4 }, // Quinta-feira
  { label: "S", value: 5 }, // Sexta-feira
  { label: "S", value: 6 }, // Sábado
];

const MonthlyHeatMap = ({ habit: { checkIns, id }, color }) => {
  const dispatch = useDispatch();
  const daysInMonth = moment().daysInMonth(); // Número de dias no mês atual
  const currentYear = moment().year(); // Ano atual
  const monthIndex = moment().month(); // Índice do mês atual

  // Converter datas concluídas para o formato 'YYYY-MM-DD'
  const completedDays = checkIns.map((date) =>
    moment(date, "DD/MM/YYYY").format("DD/MM/YYYY")
  );

  const handleToggleDate = (date) => {
    Vibration.vibrate(100);
    dispatch({
      type: "TOGGLE_COMPLETE_HABIT",
      payload: {
        id: id,
        date: date,
      },
    });
  };

  // Determinar o dia da semana em que o mês começa
  const firstDayOfMonth = moment(
    `${monthIndex + 1}/01/${currentYear}`,
    "MM/DD/YYYY"
  ).day();

  // Criar uma matriz de dias do mês, preenchida para começar no dia correto da semana
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const dayOfMonth = index - firstDayOfMonth + 1;
    if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
      return moment(
        `${dayOfMonth}/${monthIndex + 1}/${currentYear}`,
        "DD/MM/YYYY"
      );
    }
    return null; // Dias fora do mês
  });

  // Remover a última linha de dias se todos forem nulos
  while (calendarDays.slice(-7).every((day) => day === null)) {
    calendarDays.splice(-7);
  }

  return (
    <View style={{ alignItems: "center" }}>
      {/* Cabeçalho com os dias da semana */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        {daysOfWeek.map((day, index) => (
          <View key={index} style={{ width: 40, alignItems: "center" }}>
            <Text style={{ fontWeight: "bold" }}>{day.label}</Text>
          </View>
        ))}
      </View>

      {/* Renderização dos dias do calendário */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: 280,
          justifyContent: "center",
        }}
      >
        {calendarDays.map((date, index) => {
          if (date) {
            const formattedDate = date.format("DD/MM/YYYY");
            const dayNumber = date.date();

            const isCompleted = completedDays.includes(formattedDate);
            const isFutureDate = date.isAfter(moment(), "day");
            const isToday = date.isSame(moment(), "day");
            const isPastDate = date.isBefore(moment(), "day");

            return (
              <View
                key={index}
                style={{
                  width: 40,
                  alignItems: "center",
                  marginVertical: 2,
                }}
              >
                <TouchableOpacity
                  onPress={() => handleToggleDate(formattedDate)}
                  disabled={isFutureDate}
                >
                  <Svg width="30" height="30">
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
                        {dayNumber}
                      </SvgText>
                    )}
                  </Svg>
                </TouchableOpacity>
              </View>
            );
          } else {
            // Espaço vazio para os dias fora do mês com círculo "-"
            return (
              <View
                key={index}
                style={{ width: 40, alignItems: "center", marginVertical: 2 }}
              >
                <Svg width="30" height="30">
                  <Rect
                    width="30"
                    height="30"
                    rx="23"
                    ry="23"
                    fill="lightgrey"
                  />
                  <SvgText
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="18"
                    fill="#999" // Cor do texto "-"
                  >
                    -
                  </SvgText>
                </Svg>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

export default MonthlyHeatMap;
