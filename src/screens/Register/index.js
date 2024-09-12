import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "@redux/authSlice";
import { signUp } from "@services/authService";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onRegister = async (data) => {
    try {
      const user = await signUp(data.email, data.password, data.name);
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <Controller
        control={control}
        rules={{
          required: "Nome é obrigatório",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nome"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            error={!!errors.name}
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
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginLink: {
    color: "#6200ee",
    marginLeft: 5,
  },
});
