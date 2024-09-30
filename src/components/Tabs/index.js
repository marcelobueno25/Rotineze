import React, { useState, useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";

const Tabs = ({ onTabSelect }) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState("Diário"); // Define a aba padrão

  // Lista de abas
  const tabs = useMemo(() => ["Diário", "Mensal"], []);

  // Função para atualizar a aba selecionada e chamar o callback do componente pai
  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
    if (onTabSelect) {
      onTabSelect(tab); // Chama o callback passando a aba selecionada
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.colors.primaryContainer,
        padding: 5,
        borderRadius: 20,
        justifyContent: "space-between",
        alignItems: "center",
        margin: 5,
      }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={{
            flex: 1,
            paddingVertical: 5,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            backgroundColor:
              selectedTab === tab ? theme.colors.primary : "transparent",
            transition: "background-color 0.3s ease",
          }}
          onPress={() => handleTabSelect(tab)}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color:
                selectedTab === tab
                  ? theme.colors.background
                  : theme.colors.onBackground,
            }}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;
