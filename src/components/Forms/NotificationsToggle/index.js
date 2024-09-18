import React from "react";
import { View } from "react-native";
import { Switch, Text } from "react-native-paper";
import { StyleSheet } from "react-native";

export const NotificationsToggle = ({ notificationsEnabled, onToggle }) => (
  <View style={styles.switchContainer}>
    <Text>Notificações</Text>
    <Switch value={notificationsEnabled} onValueChange={onToggle} />
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
