import React, { useState } from "react";
import { Button } from "react-native-paper";
import uuid from "react-native-uuid";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { COLORS_NEW_HABIT, ICONS_NEW_HABIT } from "../../constant";
import moment from "moment";
import * as Notifications from "expo-notifications"; // Para notificações

import { NomeForm } from "../../components/Forms/NomeForm";
import { DescricaoForm } from "../../components/Forms/DescricaoForm";
import { CorForm } from "../../components/Forms/CorForm";
import { IconeForm } from "../../components/Forms/IconeForm";
import { TimePickerForm } from "../../components/Forms/TimePickerForm";
import { DiasDaSemanaForm } from "../../components/Forms/DiasDaSemanaForm";
import { NotificationsToggle } from "../../components/Forms/NotificationsToggle";

export function CreateHabits({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(COLORS_NEW_HABIT[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS_NEW_HABIT[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleNotificationToggle = (value) => {
    setNotificationsEnabled(value);
    if (!value) {
      setSelectedDays([]);
      setSelectedDate(new Date());
    }
  };

  const scheduleNotifications = async (habitId, date, selectedDays) => {
    await cancelNotifications(habitId); // Cancelar quaisquer notificações existentes antes de agendar novas
    for (let day of selectedDays) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete de Hábito",
          body: "Está na hora de completar seu hábito!",
        },
        identifier: `${habitId}-${day}`, // Usando o ID do hábito e o dia como identificador de notificação
        trigger: {
          weekday: day + 1,
          hour: date.getHours(),
          minute: date.getMinutes(),
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
    const newHabitId = uuid.v4();

    if (notificationsEnabled) {
      await scheduleNotifications(newHabitId, selectedDate, selectedDays);
    }

    const newHabit = {
      id: newHabitId,
      name: data.name,
      description: data.description,
      color: selectedColor,
      icon: selectedIcon,
      completedDates: [],
      criado: moment().format("DD/MM/YYYY"),
      date: selectedDate,
      days: selectedDays,
      notificationsEnabled,
    };

    dispatch({ type: "ADD_HABIT", payload: newHabit });
    navigation.goBack();
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.container}>
          <NomeForm control={control} errors={errors} />
          <DescricaoForm control={control} errors={errors} />
          <CorForm
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            listColors={COLORS_NEW_HABIT}
          />
          <IconeForm
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            selectedColor={selectedColor}
            listIcons={ICONS_NEW_HABIT}
          />
          <NotificationsToggle
            notificationsEnabled={notificationsEnabled}
            onToggle={handleNotificationToggle}
          />
          {notificationsEnabled && (
            <>
              <DiasDaSemanaForm
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                selectedColor={selectedColor}
              />
              {selectedDays.length > 0 && (
                <TimePickerForm
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.floatingButtonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={styles.floatingButton}
        >
          Salvar
        </Button>
      </View>
    </>
  );
}

// Estilos
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
});
