import React from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useSelector } from "react-redux";
import { Text, useTheme, IconButton } from "react-native-paper";
import CardDiario from "./components/CardDiario";

export function Home() {
  const habits = useSelector((state) => state.habits.habits) || [];
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: habits.length === 0 ? "center" : "flex-start",
        }}
        refreshControl={<RefreshControl refreshing={false} />}
      >
        {habits.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              flex: 1,
              opacity: 0.5,
            }}
          >
            <IconButton
              icon="clipboard-text-off-outline"
              size={70}
              iconColor={theme.colors.outline}
              style={{ marginBottom: 10, marginTop: 60 }}
            />
            <Text
              variant="titleMedium"
              style={{
                color: theme.colors.outline,
                textAlign: "center",
              }}
            >
              Nenhum hábito cadastrado ainda.
            </Text>
          </View>
        ) : (
          <CardDiario habits={habits} />
        )}
      </ScrollView>
    </View>
  );
}
