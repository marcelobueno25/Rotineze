import React, { useState } from "react";
import { SegmentedButtons } from "react-native-paper";
import { View, ScrollView, Vibration } from "react-native";
import { useSelector } from "react-redux";
import CardDiario from "./components/CardDiario";
import CardSemanal from "./components/CardSemanal";
import CardMensal from "./components/CardMensal";
import CardAnual from "./components/CardAnual";

export function Home() {
  const habits = useSelector((state) => state.habits.habits);
  const [selectedView, setSelectedView] = useState("Diário");

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
          { label: "Diário", value: "Diário" },
          {
            label: "Semanal",
            value: "Semanal",
          },
          { label: "Mensal", value: "Mensal" },
          { label: "Anual", value: "Anual" },
        ]}
      />
      <ScrollView>
        {habits.map((habit, index) => (
          <View key={index}>
            {selectedView === "Diário" && <CardDiario habit={habit} />}
            {selectedView === "Semanal" && <CardSemanal habit={habit} />}
            {selectedView === "Mensal" && <CardMensal habit={habit} />}
            {selectedView === "Anual" && <CardAnual habit={habit} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
