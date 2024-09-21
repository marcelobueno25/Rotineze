import React from "react";
import { View, Image } from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";

export const PremiumCard = () => {
  const theme = useTheme();

  return (
    <Card
      style={{
        backgroundColor: theme.colors.primaryContainer,
        borderRadius: 15,
        marginVertical: 20,
        paddingHorizontal: 5,
      }}
    >
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            marginRight: 5,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary, // Fundo preto do badge Premium
              paddingHorizontal: 15,
              paddingVertical: 3,
              borderRadius: 5,
              alignSelf: "flex-start", // Para alinhar o badge no topo esquerdo
              marginBottom: 15,
            }}
          >
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.background }}
            >
              Premium
            </Text>
          </View>
          <Text variant="bodyMedium">
            Desbloqueie Hábitos Ilimitados, Lembretes e Estatísticas Avançadas
          </Text>
        </View>

        <View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/10585/10585155.png",
            }}
            style={{
              width: 40,
              height: 40,
              resizeMode: "contain",
            }}
          />
        </View>
      </Card.Content>

      <Card.Actions
        style={{
          justifyContent: "center",
          paddingVertical: 10,
        }}
      >
        <Button
          mode="contained"
          onPress={() => console.log("Obter Premium Pressionado")}
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            width: "100%",
          }}
          labelStyle={{
            color: theme.colors.background,
          }}
        >
          Obter Premium
        </Button>
      </Card.Actions>
    </Card>
  );
};
