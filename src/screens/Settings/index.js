import React, { useState } from "react";
import { View, ScrollView, Linking } from "react-native";
import {
  List,
  Divider,
  Text,
  IconButton,
  Switch,
  useTheme,
  Button,
} from "react-native-paper";
// import { useSelector } from "react-redux";
// import { signOut } from "@services/authService";
// import { backupHabits } from "@services/habitService";
// import { PremiumCard } from "./components/PremiumCard";
// import { AvatarUser } from "./components/AvatarUser";
import { ModalBottom } from "@components/Modal";

export function Settings({ navigation }) {
  // const user = useSelector((state) => state.auth.user);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  // const [lastBackup, setLastBackup] = useState(new Date()); // Armazena a data do último backup
  const theme = useTheme();

  const toggleNotifications = () =>
    setNotificationsEnabled(!notificationsEnabled);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // const formatDateTime = (date) => {
  //   return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   })}`;
  // };

  return (
    <>
      <ScrollView style={{ flex: 1, paddingHorizontal: 25 }}>
        {/* {!!user ? <AvatarUser user={user} /> : <></>} */}
        {/* <PremiumCard /> */}
        {/* <View style={{ marginVertical: 0, alignItems: "center" }}>
          {!user && (
            <View
              style={{
                gap: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 1 }}>
                <Button
                  mode="contained"
                  icon="login"
                  style={{
                    borderRadius: 5,
                  }}
                  labelStyle={{
                    color: theme.colors.background,
                    fontWeight: "bold",
                  }}
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  Logar
                </Button>
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  mode="outlined"
                  style={{
                    borderColor: theme.colors.primary,
                    borderRadius: 5,
                  }}
                  labelStyle={{
                    color: theme.colors.primary,
                    fontWeight: "bold",
                  }}
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  Cadastrar
                </Button>
              </View>
            </View>
          )}
        </View> */}
        <Text
          style={{
            fontSize: 14,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: "600",
            color: theme.colors.outline,
          }}
        >
          Geral
        </Text>
        <List.Item
          title="Notificações"
          right={() => (
            <Text style={{ color: "#A1A1A1", marginRight: 10, fontSize: 16 }}>
              {notificationsEnabled ? "Ativado" : "Desativado"}
            </Text>
          )}
          left={() => <List.Icon icon="bell" color={theme.colors.primary} />}
          onPress={showModal}
        />
        <Divider />
        <List.Item
          title="Aparência"
          left={() => <List.Icon icon="palette" color={theme.colors.primary} />}
          onPress={() => {
            navigation.navigate("Aparencia");
          }}
        />
        {/* <Divider /> */}
        {/* <List.Item
          title="Avançado"
          left={() => <List.Icon icon="cog" color={theme.colors.primary} />}
          onPress={() => {}}
        />
        <Divider /> */}
        {/* <List.Item
          title="Backup"
          description={`Último Backup: ${formatDateTime(lastBackup)}`}
          descriptionStyle={{ color: "#A1A1A1", fontSize: 13 }}
          left={() => (
            <List.Icon icon="cloud-refresh" color={theme.colors.primary} />
          )}
          onPress={() => {
            setLastBackup(new Date());
            backupHabits();
          }}
        /> */}
        <Text
          style={{
            fontSize: 14,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: "600",
            color: theme.colors.outline,
          }}
        >
          Suporte
        </Text>
        {/* <List.Item
          title="Ajuda e Feedback"
          left={() => (
            <List.Icon icon="help-circle" color={theme.colors.primary} />
          )}
          onPress={() => {}}
        />
        <Divider /> */}
        <List.Item
          title="Sobre a Rotinize"
          left={() => (
            <List.Icon icon="download" color={theme.colors.primary} />
          )}
          right={() => (
            <IconButton
              icon="open-in-new"
              color={theme.colors.primary}
              onPress={() => Linking.openURL("https://structured.app")}
            />
          )}
          onPress={() => Linking.openURL("https://structured.app")}
        />
        <Text
          style={{
            fontSize: 14,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: "600",
            color: theme.colors.outline,
          }}
        >
          Siga-nos
        </Text>
        <List.Item
          title="Instagram"
          description="m_bueno.dev"
          left={() => (
            <List.Icon icon="instagram" color={theme.colors.primary} />
          )}
          right={() => (
            <IconButton icon="open-in-new" color={theme.colors.primary} />
          )}
          onPress={() =>
            Linking.openURL("https://www.instagram.com/m_bueno.dev/")
          }
        />
        {/* <View style={{ marginBottom: 20, marginTop: 10, alignItems: "center" }}>
          {!!user && (
            <Button
              mode="text"
              icon="logout"
              style={{
                width: "100%",
              }}
              labelStyle={{
                color: "#FF6B6B",
                fontSize: 15,
                textDecorationLine: "underline",
              }}
              onPress={() => signOut()}
            >
              Sair da conta
            </Button>
          )}
        </View> */}
      </ScrollView>
      <ModalBottom
        title="Notificações e Alertas" // Passando uma string como título
        visible={isModalVisible}
        setVisible={hideModal}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="bodyMedium">Ativar Notificações</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
      </ModalBottom>
    </>
  );
}
