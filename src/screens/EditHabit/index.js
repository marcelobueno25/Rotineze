import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, MD3Colors, Card, useTheme } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";

// Importando componentes
import { NomeForm } from "@components/Forms/NomeForm";
import DateSelection from "@components/Forms/DateSelection";
import { CorForm } from "@components/Forms/CorForm";
import { IconeForm } from "@components/Forms/IconeForm";
import { TimePickerForm } from "@components/Forms/TimePickerForm";
import { DiasDaSemanaForm } from "@components/Forms/DiasDaSemanaForm";
import { NotificationsToggle } from "@components/Forms/NotificationsToggle";

import { COLORS_NEW_HABIT, ICONS_NEW_HABIT } from "../../constant";
import moment from "moment";
import { converterParaHora } from "@utils/date";
import { updateHabit } from "@redux/habitSlice";

export function EditHabit({ route, navigation }) {
  const { habitId } = route.params; // Recebendo o ID do hábito a ser editado
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Buscar hábito existente a partir do Redux Store
  const habit = useSelector((state) =>
    state.habits.habits.find((h) => h.id === habitId)
  );
  const [selectedColor, setSelectedColor] = useState(habit.color || "");
  const [selectedIcon, setSelectedIcon] = useState(habit.icon || "");
  const [frequencyTime, setFrequencyTime] = useState(
    converterParaHora(habit.frequencyTime)
  );
  const [frequency, setFrequency] = useState(habit.frequency || []);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    habit.notificationsEnabled || false
  );

  const [enableEndDate, setEnableEndDate] = useState(!!habit.endDate);
  const [initialDate, setInitialDate] = useState(
    moment(habit.initialDate, "DD/MM/YYYY").toDate() || new Date()
  );
  const [endDate, setEndDate] = useState(
    !!habit.endDate ? moment(habit.endDate, "DD/MM/YYYY").toDate() : null
  );

  useEffect(() => {
    setValue("name", habit.name);
    setValue("description", habit.description);
  }, [habit, setValue]);

  const handleNotificationToggle = (value) => {
    setNotificationsEnabled(value);
    if (!value) {
      setFrequency([]);
      setFrequencyTime(converterParaHora());
    }
  };

  const scheduleNotifications = async (habitId, date, frequency) => {
    await cancelNotifications(habitId); // Cancelar quaisquer notificações existentes antes de agendar novas
    for (let day of frequency) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete de Hábito",
          body: "Está na hora de completar seu hábito!",
        },
        identifier: `${habitId}-${day}`, // Usando o ID do hábito e o dia como identificador de notificação
        trigger: {
          weekday: day + 1,
          hour: moment(date, "HH:mm").hour(),
          minute: moment(date, "HH:mm").minute(),
          repeats: true,
        },
      });
    }
  };

  const cancelNotifications = async (habitId) => {
    const allScheduledNotifications =
      await Notifications.getAllScheduledNotificationsAsync();
    const habitNotifications = allScheduledNotifications.filter(
      (notification) => notification.identifier.startsWith(`${habitId}-`)
    );

    for (let notification of habitNotifications) {
      await Notifications.cancelScheduledNotificationAsync(
        notification.identifier
      );
    }
  };

  const onSubmit = async (data) => {
    if (!selectedColor || !selectedIcon) {
      alert("Por favor, selecione uma cor e um ícone.");
      return;
    }

    if (notificationsEnabled) {
      await scheduleNotifications(habitId, frequencyTime, frequency);
    }

    const updatedHabit = {
      ...habit,
      name: data.name,
      description: data.description,
      color: selectedColor,
      icon: selectedIcon,
      initialDate: moment(initialDate).format("DD/MM/YYYY"),
      endDate: enableEndDate ? moment(endDate).format("DD/MM/YYYY") : null,
      frequency: frequency,
      frequencyTime: frequency.length ? frequencyTime : "",
      notificationsEnabled,
    };
    try {
      await dispatch(updateHabit(updatedHabit));
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível editar o hábito. Tente novamente.");
    }
  };

  const handleRemoveHabit = () => {
    Alert.alert(
      "Deseja Excluir o Hábito",
      "Tem certeza de que deseja excluir este hábito?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await cancelNotifications(habitId); // Cancelar todas as notificações associadas ao hábito
            dispatch({ type: "REMOVE_HABIT", payload: habitId });
            navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.formContainer}>
          <NomeForm
            control={control}
            errors={errors}
            selectedIcon={selectedIcon}
            selectedColor={selectedColor}
          />
          <Card style={styles.card}>
            <Card.Title title="Cor" />
            <Card.Content>
              <CorForm
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                listColors={COLORS_NEW_HABIT}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Icone" />
            <Card.Content>
              <IconeForm
                selectedIcon={selectedIcon}
                setSelectedIcon={setSelectedIcon}
                selectedColor={selectedColor}
                listIcons={ICONS_NEW_HABIT}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <DateSelection
                initialDate={initialDate}
                setInitialDate={setInitialDate}
                endDate={endDate}
                setEndDate={setEndDate}
                enableEndDate={enableEndDate}
                setEnableEndDate={setEnableEndDate}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Notificações" />
            <Card.Content>
              <NotificationsToggle
                notificationsEnabled={notificationsEnabled}
                onToggle={handleNotificationToggle}
              />
              {notificationsEnabled && (
                <>
                  <DiasDaSemanaForm
                    selectedDays={frequency}
                    setSelectedDays={setFrequency}
                    selectedColor={selectedColor}
                  />
                  {frequency.length > 0 && (
                    <TimePickerForm
                      selectedDate={frequencyTime}
                      setSelectedDate={setFrequencyTime}
                    />
                  )}
                </>
              )}
            </Card.Content>
          </Card>
          <Button
            onPress={handleRemoveHabit}
            mode="text"
            textColor={MD3Colors.error50}
            style={styles.deleteButton}
          >
            Excluir Hábito
          </Button>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
        }}
      >
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ borderRadius: 10, backgroundColor: selectedColor }}
          labelStyle={{ fontSize: 16, color: theme.colors.background }}
          contentStyle={{ padding: 5 }}
          theme={{ roundness: 50 }}
        >
          Salvar
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 16,
  },
  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButton: {
    width: "100%",
    borderRadius: 10,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  formContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});
