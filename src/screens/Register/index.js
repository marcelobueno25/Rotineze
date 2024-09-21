import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
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
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const onRegister = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const user = await signUp(
        data.email,
        data.password,
        data.name,
        data.birthDate,
        data.gender
      );
      dispatch(setUser(user));
      navigation.navigate("Settings");
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao cadastrar. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <IconButton
            icon="close"
            size={30}
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              top: 40,
              right: 20,
              zIndex: 1,
            }}
          />

          <Text
            variant="headlineSmall"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            Cadastro
          </Text>

          <Controller
            control={control}
            rules={{
              required: "Nome é obrigatório",
              minLength: {
                value: 3,
                message: "O nome deve ter no mínimo 3 caracteres",
              },
              maxLength: {
                value: 20,
                message: "O nome deve ter no máximo 20 caracteres",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Nome"
                mode="outlined"
                onBlur={onBlur}
                onFocus={() => clearErrors()}
                onChangeText={onChange}
                value={value}
                autoCapitalize="words"
                error={!!errors.name}
                style={{ marginBottom: 15 }}
                left={<TextInput.Icon icon="account" />}
              />
            )}
            name="name"
            defaultValue=""
          />
          {errors.name && (
            <Text style={{ color: "red", marginBottom: 10, fontSize: 12 }}>
              {errors.name.message}
            </Text>
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
                onFocus={() => clearErrors()}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
                style={{ marginBottom: 15 }}
                left={<TextInput.Icon icon="email" />}
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <Text style={{ color: "red", marginBottom: 10, fontSize: 12 }}>
              {errors.email.message}
            </Text>
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
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                onBlur={onBlur}
                onFocus={() => clearErrors()}
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
                style={{ marginBottom: 15 }}
                left={<TextInput.Icon icon="lock" />}
              />
            )}
            name="password"
            defaultValue=""
          />
          {errors.password && (
            <Text style={{ color: "red", marginBottom: 10, fontSize: 12 }}>
              {errors.password.message}
            </Text>
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
                onFocus={() => clearErrors()}
                onChangeText={(text) => onChange(formatDate(text))}
                value={value}
                placeholder="DD/MM/AAAA"
                keyboardType="numeric"
                error={!!errors.birthDate}
                style={{ marginBottom: 15 }}
                maxLength={10}
                left={<TextInput.Icon icon="calendar" />}
              />
            )}
            name="birthDate"
            defaultValue=""
          />
          {errors.birthDate && (
            <Text style={{ color: "red", marginBottom: 10, fontSize: 12 }}>
              {errors.birthDate.message}
            </Text>
          )}

          <Controller
            control={control}
            rules={{ required: "Sexo é obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <View style={{ marginBottom: 10 }}>
                <Text style={{ marginBottom: 8 }}>Sexo:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                      value="Masculino"
                      status={value === "Masculino" ? "checked" : "unchecked"}
                      onPress={() => {
                        clearErrors();
                        onChange("Masculino");
                      }}
                      color={theme.colors.primary}
                    />
                    <Text>Masculino</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton
                      value="Feminino"
                      status={value === "Feminino" ? "checked" : "unchecked"}
                      onPress={() => {
                        clearErrors();
                        onChange("Feminino");
                      }}
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
            <Text style={{ color: "red", marginBottom: 10, fontSize: 12 }}>
              {errors.gender.message}
            </Text>
          )}

          {errorMessage ? (
            <Text style={{ color: "red", marginBottom: 10, fontSize: 12 }}>
              {errorMessage}
            </Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSubmit(onRegister)}
            loading={loading}
            disabled={loading}
            style={{ marginTop: 20, paddingVertical: 8 }}
          >
            Cadastrar
          </Button>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{ color: "#6200ee", marginLeft: 5, fontWeight: "bold" }}
              >
                Entre aqui
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
