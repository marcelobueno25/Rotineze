import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  RadioButton,
  IconButton,
  useTheme,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "@redux/authSlice";
import { signUp } from "@services/authService";

const formatDate = (input) => {
  const numbers = input.replace(/\D/g, "");
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
};

const validateDate = (date) => {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) return "Formato de data inválido";
  const [day, month, year] = date.split("/").map(Number);
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) return "Ano inválido";
  if (month < 1 || month > 12) return "Mês inválido";
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) return "Dia inválido";
  if (new Date(year, month - 1, day) > new Date())
    return "A data não pode ser no futuro";
  return true;
};

export default function RegisterModal() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const onRegister = async (data) => {
    try {
      const user = await signUp(
        data.email,
        data.password,
        data.name,
        data.birthDate,
        data.gender
      );
      dispatch(setUser(user));
      navigation.goBack(); // Fechar o modal após o cadastro
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao cadastrar. Por favor, tente novamente.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Botão para fechar o modal */}
          <IconButton
            icon="close"
            size={30}
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          />

          <Text style={styles.title}>Cadastro</Text>

          <Controller
            control={control}
            rules={{ required: "Nome é obrigatório" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nome"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                error={!!errors.name}
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
              />
            )}
            name="name"
            defaultValue=""
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Email é obrigatório",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Formato de email inválido",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "A senha deve ter pelo menos 6 caracteres",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Senha"
                mode="outlined"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: "Data de nascimento é obrigatória",
              validate: validateDate,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Data de Nascimento"
                mode="outlined"
                onBlur={onBlur}
                onChangeText={(text) => onChange(formatDate(text))}
                value={value}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                error={!!errors.birthDate}
                style={styles.input}
                maxLength={10}
                left={<TextInput.Icon icon="calendar" />}
              />
            )}
            name="birthDate"
            defaultValue=""
          />
          {errors.birthDate && (
            <Text style={styles.errorText}>{errors.birthDate.message}</Text>
          )}

          <Controller
            control={control}
            rules={{ required: "Sexo é obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <View style={styles.genderContainer}>
                <Text style={styles.genderLabel}>Sexo:</Text>
                <View style={styles.radioGroup}>
                  <View style={styles.radioButton}>
                    <RadioButton
                      value="Masculino"
                      status={value === "Masculino" ? "checked" : "unchecked"}
                      onPress={() => onChange("Masculino")}
                      color={theme.colors.primary}
                    />
                    <Text>Masculino</Text>
                  </View>
                  <View style={styles.radioButton}>
                    <RadioButton
                      value="Feminino"
                      status={value === "Feminino" ? "checked" : "unchecked"}
                      onPress={() => onChange("Feminino")}
                      color={theme.colors.primary}
                    />
                    <Text>Feminino</Text>
                  </View>
                </View>
              </View>
            )}
            name="gender"
            defaultValue=""
          />
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender.message}</Text>
          )}

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSubmit(onRegister)}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Cadastrar
          </Button>

          <View style={styles.loginContainer}>
            <Text>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Entre aqui</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginLink: {
    color: "#6200ee",
    marginLeft: 5,
    fontWeight: "bold",
  },
  genderContainer: {
    marginBottom: 10,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
});
