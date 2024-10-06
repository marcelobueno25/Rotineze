import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  ImageBackground,
  Vibration,
} from "react-native";
import { List, Divider, Text, RadioButton, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export function Aparencia() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentConfig = useSelector((state) => state.configuration);
  const [themeChecked, setThemeChecked] = useState(
    currentConfig.theme ? "dark" : "light"
  );
  const [animalChecked, setAnimalChecked] = useState(
    currentConfig.animal || "cat"
  );

  const handleThemeChange = (value) => {
    Vibration.vibrate(100);
    setThemeChecked(value);
    dispatch({
      type: "UPDATE_CONFIG",
      payload: { ...currentConfig, theme: value === "dark" },
    });
  };

  const handleAnimalChange = (value) => {
    Vibration.vibrate(100);
    setAnimalChecked(value);
    dispatch({
      type: "UPDATE_CONFIG",
      payload: { ...currentConfig, animal: value },
    });
  };

  // Determina a imagem do mascote com base no animal selecionado
  const getAnimalImage = (animal) => {
    switch (animal) {
      case "cat":
        return require("@assets/expressionface/cat_completo.png"); // Atualize com o caminho correto da imagem do gato
      case "dog":
        return require("@assets/expressionface/dog_completo.png"); // Atualize com o caminho correto da imagem do cachorro
      default:
        return null;
    }
  };

  const animalImage = getAnimalImage(animalChecked);

  // Determina a imagem de fundo com base no tema selecionado
  const getBackgroundImage = (theme) => {
    if (theme === "dark") {
      return require("@assets/fundo_dark.png"); // Imagem de noite
    } else {
      return require("@assets/fundo_light.png"); // Imagem de dia
    }
  };

  const backgroundImage = getBackgroundImage(themeChecked);

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 25 }}>
      <Text
        style={{
          fontSize: 14,
          marginTop: 20,
          marginBottom: 10,
          fontWeight: "600",
          color: theme.colors.outline,
        }}
      >
        Aparência
      </Text>

      {/* Seleção de Tema */}
      <List.Item
        title="Tema"
        description={() => (
          <RadioButton.Group
            onValueChange={handleThemeChange}
            value={themeChecked}
          >
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
        )}
        left={() => (
          <List.Icon icon="theme-light-dark" color={theme.colors.primary} />
        )}
      />
      <Divider />

      {/* Seleção de Mascote */}
      <List.Item
        title="Mascote"
        description={() => (
          <>
            <RadioButton.Group
              onValueChange={handleAnimalChange}
              value={animalChecked}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <RadioButton value="cat" />
                  <Text>Lua</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="dog" />
                  <Text>Pingu</Text>
                </View>
              </View>
            </RadioButton.Group>
          </>
        )}
        left={() => <List.Icon icon="paw" color={theme.colors.primary} />}
      />

      {/* Exibe a imagem do mascote com o fundo correspondente */}
      {animalImage && (
        <View style={{ marginBottom: 20, position: "relative" }}>
          <ImageBackground
            source={backgroundImage}
            style={{
              width: "100%",
              height: 150,
              borderRadius: 15,
              overflow: "hidden",
              opacity: 0.5,
            }}
            imageStyle={{ borderRadius: 15 }}
            blurRadius={2}
          ></ImageBackground>
          <View style={{ position: "absolute", bottom: 0, left: "32%" }}>
            <Image
              source={animalImage}
              style={{ width: 120, height: 120 }}
              resizeMode="contain"
            />
          </View>
        </View>
      )}
      <Divider />
    </ScrollView>
  );
}
