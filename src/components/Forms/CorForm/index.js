import React, { memo } from "react";
import { IconButton } from "react-native-paper";
import { View, StyleSheet, Vibration } from "react-native";

export const CorForm = memo(
  ({ selectedColor, setSelectedColor, listColors = [] }) => (
    <View style={styles.colorContainer}>
      {listColors.map((color, index) => (
        <IconButton
          key={index}
          icon="circle"
          iconColor={color}
          size={25}
          onPress={() => {
            Vibration.vibrate(50);
            setSelectedColor(color);
          }}
          style={
            selectedColor === color ? { backgroundColor: color + "55" } : {}
          }
        />
      ))}
    </View>
  )
);

const styles = StyleSheet.create({
  colorContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
