import React, { useState, memo } from "react";
import {
  Text,
  TextInput,
  MD3Colors,
  IconButton,
  Modal,
  Portal,
  Button,
  Switch,
} from "react-native-paper";
import uuid from "react-native-uuid";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-native-date-picker";
import { useDispatch } from "react-redux";
import { COLORS_NEW_HABIT, ICONS_NEW_HABIT } from "../../constant";
import moment from "moment";
import * as Notifications from "expo-notifications"; // Para notificações

const NomeForm = memo(({ control, errors }) => (
  <>
    <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          label="Nome"
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={!!errors.name}
        />
      )}
      name="name"
      defaultValue=""
    />
    {errors.name && (
      <Text style={{ color: MD3Colors.error50 }}>
        Este campo é obrigatório.
      </Text>
    )}
  </>
));

const DescricaoForm = memo(({ control, errors }) => (
  <>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          label="Descrição"
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={!!errors.description}
        />
      )}
      name="description"
      defaultValue=""
    />
    {errors.description && (
      <Text style={{ color: MD3Colors.error50 }}>
        Este campo é obrigatório.
      </Text>
    )}
  </>
));

const CorForm = memo(({ selectedColor, setSelectedColor }) => (
  <>
    <Text>Cor</Text>
    <View style={styles.colorContainer}>
      {COLORS_NEW_HABIT.map((color, index) => (
        <IconButton
          key={index}
          icon="circle"
          iconColor={color}
          size={25}
          onPress={() => setSelectedColor(color)}
          style={
            selectedColor === color ? { backgroundColor: color + "55" } : {}
          }
        />
      ))}
    </View>
  </>
));

const IconeForm = memo(({ selectedIcon, setSelectedIcon, selectedColor }) => {
  const [visible, setVisible] = useState(false);
  const [icons, setIcons] = useState(ICONS_NEW_HABIT);

  const iconsToShow = icons.slice(0, 10);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
    setIcons((prevIcons) => {
      const newIcons = prevIcons.filter((i) => i !== icon);
      return [icon, ...newIcons];
    });
    closeModal();
  };

  return (
    <>
      <Text>Ícone</Text>
      <View style={styles.iconContainer}>
        {iconsToShow.map((icon, index) => (
          <View key={index} style={styles.iconWrapper}>
            <IconButton
              icon={icon}
              iconColor={selectedIcon === icon ? "#fff" : "#888"}
              size={22}
              onPress={() => setSelectedIcon(icon)}
              style={
                selectedIcon === icon ? { backgroundColor: selectedColor } : {}
              }
            />
          </View>
        ))}
      </View>
      <Button onPress={openModal}>Ver mais</Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Text>Escolha um Ícone</Text>
          <View style={styles.iconContainer}>
            {ICONS_NEW_HABIT.map((icon, index) => (
              <IconButton
                key={index}
                icon={icon}
                iconColor={selectedIcon === icon ? "#fff" : "#888"}
                size={22}
                onPress={() => handleIconSelect(icon)}
                style={
                  selectedIcon === icon
                    ? { backgroundColor: selectedColor }
                    : {}
                }
              />
            ))}
          </View>
          <Button onPress={closeModal}>Fechar</Button>
        </Modal>
      </Portal>
    </>
  );
});

const TimePickerForm = memo(({ selectedDate, setSelectedDate }) => {
  const [visible, setVisible] = useState(false);

  const showDatePicker = () => setVisible(true);
  const hideDatePicker = () => setVisible(false);

  return (
    <>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          label="Hora Selecionada"
          value={moment(selectedDate).format("HH:mm")}
          mode="outlined"
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <DatePicker
        date={selectedDate}
        onDateChange={setSelectedDate}
        mode="time"
        modal={true}
        open={visible}
        onConfirm={(date) => {
          setSelectedDate(date);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
      />
    </>
  );
});

const DiasDaSemanaForm = memo(
  ({ selectedDays, setSelectedDays, selectedColor }) => {
    const daysOfWeek = [
      { label: "Seg", value: 1 },
      { label: "Ter", value: 2 },
      { label: "Qua", value: 3 },
      { label: "Qui", value: 4 },
      { label: "Sex", value: 5 },
      { label: "Sáb", value: 6 },
      { label: "Dom", value: 0 },
    ];

    const toggleDay = (day) => {
      setSelectedDays((prevDays) => {
        if (prevDays.includes(day)) {
          return prevDays.filter((d) => d !== day);
        } else {
          return [...prevDays, day];
        }
      });
    };

    return (
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCircle,
              selectedDays.includes(day.value)
                ? [styles.selectedDay, { backgroundColor: selectedColor }]
                : { backgroundColor: "#e0e0e0" },
            ]}
            onPress={() => toggleDay(day.value)}
          >
            <Text style={styles.dayLabel}>{day.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
);

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
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Estado para o switch

  const today = moment().format("DD/MM/YYYY");

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

  const handleNotificationToggle = (value) => {
    setNotificationsEnabled(value);
    if (!value) {
      // Resetar opções quando notificações são desativadas
      setSelectedDays([]);
      setSelectedDate(new Date());
    }
  };

  const onSubmit = (data) => {
    if (!selectedColor || !selectedIcon) {
      alert("Por favor, selecione uma cor e um ícone.");
      return;
    }

    const newHabit = {
      id: uuid.v4(),
      name: data.name,
      description: data.description,
      color: selectedColor,
      icon: selectedIcon,
      completedDates: [],
      criado: today,
      date: selectedDate,
      days: selectedDays,
      notificationsEnabled: notificationsEnabled,
    };

    // Agendar notificação somente se o switch estiver ativado
    if (notificationsEnabled) {
      scheduleNotification(selectedDate, selectedDays);
    }

    dispatch({
      type: "ADD_HABIT",
      payload: newHabit,
    });
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
          />
          <IconeForm
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
            selectedColor={selectedColor}
          />
          <View style={styles.switchContainer}>
            <Text>Notificações</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle} // Função modificada para redefinir ao desativar
            />
          </View>
          {notificationsEnabled && (
            <>
              <DiasDaSemanaForm
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                selectedColor={selectedColor} // Passando a cor selecionada
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 16,
  },
  colorContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  iconWrapper: {
    width: "20%",
    alignItems: "center",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: "#4a90e2", // Cor padrão antes de aplicar o selectedColor
  },
  dayLabel: {
    color: "#fff",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
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
