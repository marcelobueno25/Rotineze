import React, { useEffect, useMemo, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import Svg, { Rect } from "react-native-svg";
import moment from "moment";

const AnnualHeatMap = ({ habit: { checkIns }, color }) => {
  const currentYear = moment().year(); // Ano atual

  // Converter datas concluídas para o formato 'YYYY-MM-DD'
  const completedDaysSet = useMemo(
    () =>
      new Set(
        checkIns.map((date) => moment(date, "DD/MM/YYYY").format("DD/MM/YYYY"))
      ),
    [checkIns]
  );

  // Obter todos os dias do ano atual
  const daysInYear = useMemo(() => {
    const days = [];
    for (let month = 0; month < 12; month++) {
      const daysInMonth = moment({ year: currentYear, month }).daysInMonth();
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(moment({ year: currentYear, month, day }));
      }
    }
    return days;
  }, [currentYear]);

  const [renderedDays, setRenderedDays] = useState(0); // Estado para controlar a quantidade de dias renderizados
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    if (renderedDays < daysInYear.length) {
      const timeoutId = setTimeout(() => {
        setRenderedDays((prev) => Math.min(prev + 50, daysInYear.length));
      }, 100); // Incrementa o número de dias renderizados a cada 100ms

      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false); // Quando todos os dias são renderizados, para o carregamento
    }
  }, [renderedDays, daysInYear.length]);

  return (
    <View style={{ alignItems: "center", marginBottom: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color={color} />
      ) : (
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {daysInYear.slice(0, renderedDays).map((day, index) => {
            const date = day.format("DD/MM/YYYY");
            const isCompleted = completedDaysSet.has(date);

            return (
              <Svg width="13" height="13" style={{ margin: 1 }}>
                <Rect
                  width="13"
                  height="13"
                  rx="13"
                  ry="13"
                  fill={isCompleted ? color : "lightgrey"}
                />
              </Svg>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default AnnualHeatMap;
