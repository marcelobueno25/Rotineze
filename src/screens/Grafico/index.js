import React from "react";
import { View } from "react-native";
import { Card, Text, Divider } from "react-native-paper";
//import { useSelector } from "react-redux";

export const Grafico = () => {
  //const habits = useSelector((state) => state.habits.habits) || [];
  //const habit = {};

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <View style={{ width: "100%" }}>
        <Text variant="headlineSmall">Gráfico</Text>
      </View>
      <View style={{ width: "100%" }}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Nome Habito</Text>
            <Text variant="bodyMedium">teste</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Criado</Text>
            <Text variant="bodyMedium">teste</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={{ flex: 1 }}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Concluídos</Text>
            <Text variant="bodyMedium">teste</Text>
          </Card.Content>
        </Card>
      </View>
      <View style={{ width: "100%", marginVertical: 10 }}>
        <Divider bold={true} />
      </View>
      <View style={{ width: "100%" }}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Descrição</Text>
            <Text variant="bodyMedium">teste</Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};
