import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, useTheme, Icon } from "react-native-paper";

export const CardGrafico = React.memo(({ icon, color, number, label }) => {
  const theme = useTheme();

  return (
    <Card
      style={[styles.smallCard, { backgroundColor: theme.colors.background }]}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon source={icon} size={24} color={color} />
          <Text
            variant="titleMedium"
            style={{
              backgroundColor: theme.colors.background,
              fontWeight: "bold",
              marginVertical: 5,
              marginLeft: 5,
            }}
          >
            {number}
          </Text>
        </View>
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
});

const styles = StyleSheet.create({
  smallCard: {
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 5,
  },
});
