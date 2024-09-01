import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";

// Importando componentes
import { NomeForm } from "../../components/Forms/NomeForm";
import { DescricaoForm } from "../../components/Forms/DescricaoForm";
import { CorForm } from "../../components/Forms/CorForm";
import { IconeForm } from "../../components/Forms/IconeForm";
import { TimePickerForm } from "../../components/Forms/TimePickerForm";
import { DiasDaSemanaForm } from "../../components/Forms/DiasDaSemanaForm";
import { NotificationsToggle } from "../../components/Forms/NotificationsToggle";

import { COLORS_NEW_HABIT, ICONS_NEW_HABIT } from "../../constant";

export function EditHabit({ route, navigation }) {
  const { habitId } = route.params; // Recebendo o ID do hábito a ser editado
  const dispatch = useDispatch();
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

  const [selectedColor, setSelectedColor] = useState(habit.color);
  const [selectedIcon, setSelectedIcon] = useState(habit.icon);
  const [selectedDate, setSelectedDate] = useState(new Date(habit.date));
  const [selectedDays, setSelectedDays] = useState(habit.days);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    habit.notificationsEnabled
  );

  useEffect(() => {
    // Carregar valores do hábito para o formulário
    setValue("name", habit.name);
    setValue("description", habit.description);
  }, [habit, setValue]);

  const handleNotificationToggle = (value) => {
    setNotificationsEnabled(value);
    if (!value) {
      setSelectedDays([]);
      setSelectedDate(new Date());
    }
  };

  const scheduleNotification = (date, selectedDays) => {
    selectedDays.forEach((day) => {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete de Hábito",
          body: "Está na hora de completar seu hábito!",
        },
        trigger: {
          weekday: day + 1,
          hour: date.getHours(),
          minute: date.getMinutes(),
          repeats: true,
        },
      });
    });
  };

  const onSubmit = (data) => {
    if (!selectedColor || !selectedIcon) {
      alert("Por favor, selecione uma cor e um ícone.");
      return;
    }

    const updatedHabit = {
      ...habit,
      name: data.name,
      description: data.description,
      color: selectedColor,
      icon: selectedIcon,
      date: selectedDate,
      days: selectedDays,
      notificationsEnabled,
    };

    if (notificationsEnabled) {
      scheduleNotification(selectedDate, selectedDays);
    }

    dispatch({ type: "UPDATE_HABIT", payload: updatedHabit });
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
          Salvar Alterações
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
});
