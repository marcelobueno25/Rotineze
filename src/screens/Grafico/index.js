import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function CardGrafico({ icon, color, number, label }) {
  const theme = useTheme();

  return (
    <Card
      style={[styles.smallCard, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ alignItems: "center" }}>
        <Icon name={icon} size={24} color={color} />
        <Text
          variant="titleMedium"
          style={{
            backgroundColor: theme.colors.background,
            fontWeight: "bold",
            marginVertical: 5,
          }}
        >
          {number}
        </Text>
        <Text
          variant="labelMedium"
          style={{
            backgroundColor: theme.colors.background,
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      </View>
    </Card>
  );
}

export function Grafico() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card
        style={[styles.mainCard, { backgroundColor: theme.colors.primary }]}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            variant="headlineLarge"
            style={{
              color: theme.colors.background,
              fontWeight: "bold",
            }}
          >
            1 dia
          </Text>
          <Text
            variant="titleMedium"
            style={{
              color: theme.colors.background,
              marginTop: 5,
            }}
          >
            A sua série atual
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Icon
              name="trophy"
              size={25}
              color={theme.colors.background}
              style={{ marginHorizontal: 10 }}
            />
            <Text
              variant="headlineSmall"
              style={{
                color: theme.colors.background,
                marginTop: 5,
              }}
            >
              1 dia
            </Text>
          </View>
          <Text
            variant="labelMedium"
            style={{
              color: theme.colors.background,
              marginTop: 5,
            }}
          >
            A sua melhor série
          </Text>
        </View>
      </Card>

      <View style={styles.cardRow}>
        <CardGrafico
          icon="calendar"
          label="Total de dias perfeitos"
          number="1 dia"
          color="#9C27B0"
        />
        <CardGrafico
          icon="check-circle"
          label="Total de momentos concluídos"
          number="1"
          color="#4CAF50"
        />
      </View>

      <View style={styles.cardRow}>
        <CardGrafico
          icon="chart-line"
          label="Taxa total de conclusão"
          number="100%"
          color="#FF5722"
        />
        <CardGrafico
          icon="chart-bar"
          label="Média por dia"
          number="1,0"
          color="#E91E63"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  mainCard: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  smallCard: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
  },
});
