import React, { useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { View, Vibration } from "react-native";
import { useSelector } from "react-redux";
import CardDiario from "./components/CardDiario";
import CardSemanal from "./components/CardSemanal";
import CardMensal from "./components/CardMensal";
import CardAnual from "./components/CardAnual";

export function Home() {
  const habits = useSelector((state) => state.habits.habits);
  const [selectedView, setSelectedView] = useState("Hoje");

  const handleValueChange = (value) => {
    Vibration.vibrate(50); // Vibra por 50ms
    setSelectedView(value);
  };

  return (
    <View
      rowGap={15}
      style={{
        flex: 1,
        marginBottom: 80,
        padding: 10,
      }}
    >
      <SegmentedButtons
        density="small"
        value={selectedView}
        onValueChange={handleValueChange}
        buttons={[
          { label: "Hoje", value: "Hoje" },
          {
            label: "Semanal",
            value: "Semanal",
          },
          { label: "Mensal", value: "Mensal" },
          { label: "Anual", value: "Anual" },
        ]}
      />
      {selectedView === "Hoje" && <CardDiario habits={habits} />}
      {selectedView === "Semanal" && <CardSemanal habits={habits} />}
      {selectedView === "Mensal" && <CardMensal habits={habits} />}
      {selectedView === "Anual" && <CardAnual habits={habits} />}
    </View>
  );
}
