import React, { useState, memo } from "react";
import {
  Text,
  Button,
  TextInput,
  MD3Colors,
  IconButton,
} from "react-native-paper";
import uuid from "react-native-uuid";
import { View, StyleSheet, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { COLORS_NEW_HABIT, ICONS_NEW_HABIT } from "../../constant";
import moment from "moment";

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

const IconeForm = memo(({ selectedIcon, setSelectedIcon, selectedColor }) => (
  <>
    <Text>Ícone</Text>
    <View style={styles.iconContainer}>
      {ICONS_NEW_HABIT.map((icon, index) => (
        <IconButton
          key={index}
          icon={icon}
          iconColor={selectedIcon === icon ? "#fff" : "#888"}
          size={22}
          onPress={() => setSelectedIcon(icon)}
          style={
            selectedIcon === icon ? { backgroundColor: selectedColor } : {}
          }
        />
      ))}
    </View>
  </>
));

export function CreateHabits({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState(COLORS_NEW_HABIT[0]); // Cor padrão
  const [selectedIcon, setSelectedIcon] = useState(ICONS_NEW_HABIT[0]); // Ícone padrão
  const today = moment().format("DD/MM/YYYY");

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
    };
    dispatch({
      type: "ADD_HABIT",
      payload: newHabit,
    });
    navigation.goBack(); // Retorna à tela anterior (lista de hábitos)
  };

  return (
    <ScrollView>
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
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 20 }}
        >
          Cadastrar
        </Button>
      </View>
    </ScrollView>
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
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
