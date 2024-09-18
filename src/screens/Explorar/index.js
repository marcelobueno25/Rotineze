import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  ImageBackground,
} from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Permitir animação de layout no Android
if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function Explorar() {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const routines = [
    {
      id: 1,
      title: "Rotina Noturna",
      time: "44 min",
      description:
        "Termine seu dia com clareza mental, relaxe e prepare-se para uma noite tranquila.",
      color: "#512DA8",
      icon: "moon-waning-crescent",
      tasks: [
        { id: 1, title: "Desconecte", icon: "cellphone-off", color: "#512DA8" },
        { id: 2, title: "Banho relaxante", icon: "shower", color: "#512DA8" },
        {
          id: 3,
          title: "Planeje o dia seguinte",
          icon: "pencil",
          color: "#512DA8",
        },
        {
          id: 4,
          title: "Alongamento suave",
          icon: "run-fast",
          color: "#512DA8",
        },
        {
          id: 5,
          title: "Leitura",
          icon: "book-open-page-variant",
          color: "#512DA8",
        },
      ],
    },
    {
      id: 2,
      title: "Manhã Energética",
      time: "32 min",
      description: "Comece o seu dia com energia e disposição.",
      color: "#EF5350",
      icon: "weight-lifter",
      tasks: [
        { id: 1, title: "Exercícios", icon: "weight-lifter", color: "#EF5350" },
        { id: 2, title: "Meditação", icon: "meditation", color: "#EF5350" },
        {
          id: 3,
          title: "Café da Manhã Saudável",
          icon: "food-apple",
          color: "#EF5350",
        },
      ],
    },
    {
      id: 3,
      title: "Manhã Relaxante",
      time: "40 min",
      description: "Relaxe e recomece seu dia com tranquilidade.",
      color: "#29B6F6",
      icon: "spa",
      tasks: [
        { id: 1, title: "Alongamento", icon: "yoga", color: "#29B6F6" },
        { id: 2, title: "Meditação", icon: "meditation", color: "#29B6F6" },
      ],
    },
  ];

  const handleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Card com Imagem de Fundo */}
      <Card style={{ marginBottom: 20, borderRadius: 10, overflow: "hidden" }}>
        <ImageBackground
          source={{
            uri: "https://media.istockphoto.com/id/1251354121/pt/vetorial/cartoon-meadow-landscape-summer-green-fields-view-spring-lawn-hill-and-blue-sky-green.jpg?s=612x612&w=0&k=20&c=kHFpiyYitMZ9fV5cvEHHTBnIvSoHo3XxNTkQpHZ5-70=",
          }} // Substitua com uma URL válida da imagem
          style={{ width: "100%", height: 150 }}
          resizeMode="cover"
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              flex: 1,
              justifyContent: "center",
              padding: 15,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#FFF",
                marginBottom: 10,
              }}
            >
              Bem-vindo ao Explorar
            </Text>
            <Text style={{ fontSize: 16, color: "#FFF" }}>
              Explore rotinas que podem ajudar você a melhorar sua produtividade
              e bem-estar. Clique em uma rotina para ver mais detalhes.
            </Text>
          </View>
        </ImageBackground>
      </Card>

      {/* Lista de rotinas */}
      {routines.map((routine) => (
        <ExpandableRoutineCard
          key={routine.id}
          routine={routine}
          expanded={expandedCardId === routine.id}
          onPress={() => handleExpand(routine.id)}
        />
      ))}
    </ScrollView>
  );
}

function ExpandableRoutineCard({ routine, expanded, onPress }) {
  const theme = useTheme();

  return (
    <Card
      style={{
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        backgroundColor: theme.colors.background,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name={routine.icon} size={40} color={routine.color} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: theme.colors.onBackground,
              }}
            >
              {routine.title}
            </Text>
          </View>
          <Icon
            name={expanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.colors.onBackground}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={{ marginTop: 15 }}>
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.onBackground,
              marginBottom: 20,
            }}
          >
            {routine.description}
          </Text>
          {routine.tasks.map((task) => (
            <View
              key={task.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                borderRadius: 10,
                marginBottom: 10,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: theme.colors.backdrop,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name={task.icon} size={24} color={task.color} />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: theme.colors.onBackground,
                    marginLeft: 10,
                  }}
                >
                  {task.title}
                </Text>
              </View>
              <Icon name="plus" size={24} color={theme.colors.onBackground} />
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}
