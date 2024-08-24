import React, { useState } from "react";
import {
  Text,
  Button,
  TextInput,
  MD3Colors,
  IconButton,
} from "react-native-paper";
import uuid from "react-native-uuid";
import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

export function CreateHabits({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const colors = ["#4682B4", "#FF6347", "#32CD32", "#FFD700", "#8A2BE2"]; // Cores predefinidas
  const icons = ["camera", "calendar", "briefcase", "book", "beer"];

  const [selectedColor, setSelectedColor] = useState(colors[0]); // Cor padrão
  const [selectedIcon, setSelectedIcon] = useState(icons[0]); // Ícone padrão

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
    };
    dispatch({
      type: "ADD_HABIT",
      payload: newHabit,
    });
    navigation.goBack(); // Retorna à tela anterior (lista de hábitos)
  };

  const NomeForm = () => (
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
  );

  const DescricaoForm = () => (
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
  );

  const CorForm = () => (
    <>
      <Text>Cor</Text>
      <View style={styles.colorContainer}>
        {colors.map((color, index) => (
          <IconButton
            key={index}
            icon="circle"
            iconColor={color}
            size={30}
            onPress={() => setSelectedColor(color)}
            style={
              selectedColor === color ? { backgroundColor: color + "55" } : {}
            }
          />
        ))}
      </View>
    </>
  );

  const IconeForm = () => (
    <>
      <Text>Ícone</Text>
      <View style={styles.iconContainer}>
        {icons.map((icon, index) => (
          <IconButton
            key={index}
            icon={icon}
            iconColor={selectedIcon === icon ? "#fff" : "#888"}
            size={30}
            onPress={() => setSelectedIcon(icon)}
            style={
              selectedIcon === icon ? { backgroundColor: selectedColor } : {}
            }
          />
        ))}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <View>
        <NomeForm />
      </View>
      <View>
        <DescricaoForm />
      </View>
      <View>
        <CorForm />
      </View>
      <View>
        <IconeForm />
      </View>
      <View>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
      </View>
    </View>
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
