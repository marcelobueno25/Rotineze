import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Card,
  Button,
  IconButton,
  ProgressBar,
  useTheme,
} from "react-native-paper";
import moment from "moment";
import { getHabitStatsForMonth } from "@utils/habits";

// Componente para exibir linhas de informações
const InfoRow = ({ label, value, theme, last = false }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: last ? 0 : 12,
    }}
  >
    <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
      {label}
    </Text>
    <Text style={{ color: theme.colors.onBackground }}>{value}</Text>
  </View>
);

// Componente para exibir cartões de estatísticas
const StatCard = ({ label, value, icon, color, theme }) => (
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <IconButton
      icon={icon}
      size={30}
      iconColor={color}
      style={{ margin: 0, padding: 0 }}
    />
    <Text style={{ fontSize: 18, fontWeight: "bold", color }}>{value}</Text>
    <Text style={{ color: theme.colors.onBackground }}>{label}</Text>
  </View>
);

const HabitDetails = ({ route, navigation }) => {
  const { habit } = route.params;
  const theme = useTheme();

  // Datas formatadas
  const formattedInitialDate = moment(habit.initialDate, "DD/MM/YYYY").format(
    "DD/MM/YYYY"
  );
  const formattedEndDate = habit.endDate
    ? moment(habit.endDate, "DD/MM/YYYY").format("DD/MM/YYYY")
    : "Indeterminado";

  // Mapeamento dos dias da semana
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const formattedFrequency = habit.frequency
    .map((day) => weekDays[day])
    .join(", ");

  // Obtém o horário da notificação formatado
  const notificationTime = habit.frequencyTime
    ? moment(habit.frequencyTime, "HH:mm").format("HH:mm")
    : null;

  // Data atual para obter as métricas mensais
  const currentDate = moment().format("YYYY-MM-DD");
  const monthlyStats = useMemo(
    () => getHabitStatsForMonth(currentDate, habit),
    [habit.id, currentDate]
  );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Cabeçalho com Nome e Ícone */}
      <Card
        style={{
          marginBottom: 16,
          padding: 16,
          alignItems: "center",
          borderRadius: 15,
          marginTop: 40,
        }}
      >
        <View style={{ alignItems: "center", paddingTop: 30 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              backgroundColor: theme.colors.primary,
              borderWidth: 5,
              borderColor: theme.colors.background,
              borderStyle: "solid",
              borderRadius: 50,
              top: -60,
              height: 85,
              width: 85,
            }}
          >
            <IconButton
              icon={habit.icon}
              size={40}
              iconColor={theme.colors.background}
            />
          </View>
          <Text
            variant="titleLarge"
            style={{ fontWeight: "bold", color: theme.colors.onBackground }}
          >
            {habit.name}
          </Text>
        </View>
      </Card>

      {/* Informações Básicas */}
      <Card style={{ marginBottom: 16, borderRadius: 15 }}>
        <Card.Title
          title="Informações do Hábito"
          titleStyle={{ fontWeight: "bold" }}
        />
        <Card.Content>
          <InfoRow
            label="Data Inicial"
            value={formattedInitialDate}
            theme={theme}
          />
          <InfoRow label="Data Final" value={formattedEndDate} theme={theme} />
          <InfoRow
            label="Notificações"
            value={habit.notificationsEnabled ? "Sim" : "Não"}
            theme={theme}
            last={!habit.notificationsEnabled}
          />
          {habit.notificationsEnabled && (
            <>
              <InfoRow
                label="Frequência"
                value={formattedFrequency || "Sem frequência definida"}
                theme={theme}
              />
              <InfoRow
                label="Horário"
                value={notificationTime || "Sem horário definido"}
                theme={theme}
                last
              />
            </>
          )}
        </Card.Content>
      </Card>

      {/* Resumo Mensal */}
      <Card style={{ marginBottom: 16, borderRadius: 15 }}>
        <Card.Title
          title="Resumo do Mês Atual"
          titleStyle={{ fontWeight: "bold" }}
        />
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 16,
            }}
          >
            <StatCard
              label="Pendentes"
              value={monthlyStats.notCompletedHabitsCount}
              icon="alert-circle"
              color="#eead2d"
              theme={theme}
            />
            <StatCard
              label="Concluídos"
              value={monthlyStats.completedHabitsCount}
              icon="check-circle"
              color="#4CAF50"
              theme={theme}
            />
            <StatCard
              label="Maior Série"
              value={`${monthlyStats.maxSequence} dias`}
              icon="fire"
              color="#FF5722"
              theme={theme}
            />
          </View>
          <View style={{ alignItems: "center", marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: theme.colors.primary,
              }}
            >
              {monthlyStats.completionPercentage}%
            </Text>
            <Text style={{ color: theme.colors.onBackground }}>
              Porcentagem de Conclusão
            </Text>
          </View>
          <ProgressBar
            progress={monthlyStats.completionPercentage / 100}
            color={theme.colors.primary}
            style={{ height: 10, borderRadius: 5 }}
          />
        </Card.Content>
      </Card>

      {/* Botão de Edição */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("EditHabit", { habitId: habit.id })}
        style={{ borderRadius: 15, marginBottom: 16 }}
        contentStyle={{ padding: 8 }}
      >
        Editar Hábito
      </Button>
    </ScrollView>
  );
};

export default HabitDetails;
