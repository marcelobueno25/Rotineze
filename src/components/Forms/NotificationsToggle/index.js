import React from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { StyleSheet, Vibration } from "react-native";

export const NotificationsToggle = ({ notificationsEnabled, onToggle }) => (
  <View style={styles.switchContainer}>
    <Text variant="bodyMedium">Ativar Notificações</Text>
    <Switch
      value={notificationsEnabled}
      onValueChange={(e) => {
        Vibration.vibrate(50);
        onToggle(e);
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
