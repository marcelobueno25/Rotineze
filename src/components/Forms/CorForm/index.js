import React, { memo } from "react";
import { Text, IconButton } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export const CorForm = memo(
  ({ selectedColor, setSelectedColor, listColors = [] }) => (
    <>
      <Text>Cor</Text>
      <View style={styles.colorContainer}>
        {listColors.map((color, index) => (
          <IconButton
            key={index}
            icon="circle"
            iconColor={color}
            size={25}
            onPress={() => setSelectedColor(color)}
            style={
              selectedColor === color ? { backgroundColor: color + "55" } : {}
            }
          />
        ))}
      </View>
    </>
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
