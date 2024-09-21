import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  IconButton,
  Checkbox,
  useTheme,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "@redux/authSlice";
import { signIn } from "@services/authService";
import { fetchAllHabits } from "@services/habitService";

export default function LoginModal() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useTheme();

  const onLogin = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const user = await signIn(data.email, data.password);
      dispatch(setUser(user));
      await fetchAllHabits();
      navigation.navigate("Settings");
    } catch (error) {
      console.error(error);
      setErrorMessage("Falha no login. Verifique suas credenciais.");
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
            Entrar
          </Text>

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
                style={{ marginBottom: 15 }}
                left={<TextInput.Icon icon="email" />}
              />
            )}
            name="email"
            defaultValue=""
          />
          {errors.email && (
            <Text
              style={{
                color: "#ff3333",
                marginBottom: 10,
                fontSize: 12,
                marginLeft: 5,
              }}
            >
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
            <Text
              style={{
                color: "#ff3333",
                marginBottom: 10,
                fontSize: 12,
                marginLeft: 5,
              }}
            >
              {errors.password.message}
            </Text>
          )}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Checkbox
              status={rememberPassword ? "checked" : "unchecked"}
              onPress={() => setRememberPassword(!rememberPassword)}
              color={theme.colors.primary}
            />
            <Text style={{ marginLeft: 8, color: "#666" }}>Lembrar senha</Text>
          </View>

          {errorMessage ? (
            <Text style={{ color: "#ff3333", marginBottom: 10, fontSize: 12 }}>
              {errorMessage}
            </Text>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSubmit(onLogin)}
            loading={loading}
            disabled={loading}
            style={{ marginTop: 20 }}
            contentStyle={{ paddingVertical: 10 }}
          >
            Entrar
          </Button>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#666" }}>Ainda não tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{ color: "#6200ee", marginLeft: 5, fontWeight: "bold" }}
              >
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
