import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, MD3Colors } from "react-native-paper";
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
import moment from "moment";
import { editHabit } from "@services/habitService";
import { converterParaHora } from "@utils/date";

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
  const [selectedColor, setSelectedColor] = useState(habit.color || "");
  const [selectedIcon, setSelectedIcon] = useState(habit.icon || "");
  const [selectedDate, setSelectedDate] = useState(
    converterParaHora(habit.date)
  );
  const [selectedDays, setSelectedDays] = useState(habit.days || []);
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    habit.notificationsEnabled || false
  );

  useEffect(() => {
    setValue("name", habit.name);
    setValue("description", habit.description);
  }, [habit, setValue]);

  const handleNotificationToggle = (value) => {
    setNotificationsEnabled(value);
    if (!value) {
      setSelectedDays([]);
      setSelectedDate(converterParaHora());
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
      await scheduleNotifications(habitId, selectedDate, selectedDays);
    }

    const updatedHabit = {
      name: data.name,
      description: data.description,
      color: selectedColor,
      icon: selectedIcon,
      date: selectedDays.length ? selectedDate : "",
      days: selectedDays,
      notificationsEnabled,
    };
    try {
      await dispatch(editHabit(habitId, updatedHabit));
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
  deleteButton: {
    marginTop: 20,
    alignSelf: "center",
  },
});
