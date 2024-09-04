import React, { useState } from "react";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export function Settings() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.configuration);
  const [checked, setChecked] = useState(currentTheme.theme ? "dark" : "light");

  const handleThemeChange = (value) => {
    setChecked(value);
    dispatch({
      type: "UPDATE_CONFIG",
      payload: { ...currentTheme, theme: value === "dark" ? true : false },
    });
  };

  return (
    <View style={{ flex: 1, flexDirection: "column", padding: 20 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Text style={{ fontSize: 18, marginRight: 10, fontWeight: "bold" }}>
          Tema:
        </Text>
        <RadioButton.Group onValueChange={handleThemeChange} value={checked}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
            >
              <RadioButton value="dark" />
              <Text>Escuro</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="light" />
              <Text>Claro</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
}
