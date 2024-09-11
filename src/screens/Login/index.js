import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Text, Checkbox } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "@redux/authSlice";
import { signIn } from "@services/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const [rememberPassword, setRememberPassword] = useState(false); // Estado para o checkbox "Lembrar senha"
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogin = async (data) => {
    try {
      const user = await signIn(data.email, data.password);
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
            secureTextEntry={!showPassword} // Controla a visibilidade da senha
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)} // Alterna a visibilidade da senha
              />
            }
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

      <View style={styles.rememberContainer}>
        <Checkbox
          status={rememberPassword ? "checked" : "unchecked"}
          onPress={() => setRememberPassword(!rememberPassword)}
        />
        <Text>Lembrar senha</Text>
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <Button
        mode="contained"
        onPress={handleSubmit(onLogin)}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Entrar
      </Button>

      <View style={styles.registerContainer}>
        <Text>Ainda não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Cadastre-se</Text>
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
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerLink: {
    color: "#6200ee",
    marginLeft: 5,
  },
});
