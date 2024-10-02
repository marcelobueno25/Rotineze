import React, { useState, useEffect } from "react";
import { Button, Card, useTheme } from "react-native-paper";
import uuid from "react-native-uuid";
import { View, ScrollView, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { COLORS_NEW_HABIT, ICONS_NEW_HABIT } from "../../constant";
import * as Notifications from "expo-notifications";
import moment from "moment";

import { NomeForm } from "@components/Forms/NomeForm";
import DateSelection from "@components/Forms/DateSelection";
import { CorForm } from "@components/Forms/CorForm";
import { IconeForm } from "@components/Forms/IconeForm";
import { TimePickerForm } from "@components/Forms/TimePickerForm";
import { DiasDaSemanaForm } from "@components/Forms/DiasDaSemanaForm";
import { NotificationsToggle } from "@components/Forms/NotificationsToggle";
import { converterParaHora } from "@utils/date";
import { addHabit } from "@redux/habitSlice";

export function CreateHabits({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedColor, setSelectedColor] = useState(COLORS_NEW_HABIT[0]);
  const [selectedIcon, setSelectedIcon] = useState(ICONS_NEW_HABIT[0]);
  const [frequencyTime, setFrequencyTime] = useState(converterParaHora());
  const [frequency, setFrequency] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const [enableEndDate, setEnableEndDate] = useState(false);
  const [initialDate, setInitialDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const selectedDate = useSelector((state) => state.habits.selectedDate);

  useEffect(() => {
    if (selectedDate) {
      setInitialDate(moment(selectedDate, "DD/MM/YYYY").toDate());
    }
  }, [selectedDate]);

  const handleNotificationToggle = (value) => {
    setNotificationsEnabled(value);
    if (!value) {
      setFrequency([]);
      setFrequencyTime(converterParaHora());
    }
  };

  const scheduleNotifications = async (habitId, date, frequency) => {
    await cancelNotifications(habitId);
    for (let day of frequency) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete de Hábito",
          body: "Está na hora de completar seu hábito!",
          sound: true,
        },
        identifier: `${habitId}-${day}`,
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
    const newHabitId = uuid.v4();

    if (notificationsEnabled) {
      await scheduleNotifications(newHabitId, frequencyTime, frequency);
    }

    const habitData = {
      id: newHabitId,
      name: data.name,
      color: selectedColor,
      icon: selectedIcon,
      checkIns: [],
      initialDate: moment(initialDate).format("DD/MM/YYYY"),
      endDate: enableEndDate ? moment(endDate).format("DD/MM/YYYY") : null,
      createdAt: moment().format("DD/MM/YYYY"),
      frequency: frequency,
      frequencyTime: frequency.length ? frequencyTime : "",
      notificationsEnabled,
    };
    dispatch(addHabit(habitData));
    navigation.goBack();
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
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
  formContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});
