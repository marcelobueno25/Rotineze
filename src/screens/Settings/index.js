import React, { useState } from "react";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export function Settings() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.configuration.theme); // true para Dark, false para Light

  const [checked, setChecked] = useState(currentTheme ? "dark" : "light");

  const handleThemeChange = (value) => {
    setChecked(value);
    dispatch({
      type: "UPDATE_CONFIG",
      payload: { theme: value === "dark" ? true : false },
    });
  };

  return (
    <View rowGap={15} style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Selecionar o Tema:</Text>
      <RadioButton.Group onValueChange={handleThemeChange} value={checked}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <RadioButton value="dark" />
          <Text>Escuro</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <RadioButton value="light" />
          <Text>Claro</Text>
        </View>
      </RadioButton.Group>
    </View>
  );
}
