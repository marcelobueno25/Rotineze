import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import {
  List,
  Divider,
  Text,
  IconButton,
  Switch,
  Portal,
  Modal,
  useTheme,
  Avatar,
  Button,
} from "react-native-paper";
import { useSelector } from "react-redux";
import { signOut } from "@services/authService";
import { backupHabits } from "@services/habitService";

export function Settings({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [lastBackup, setLastBackup] = useState(new Date()); // Armazena a data do último backup
  const theme = useTheme();

  const toggleNotifications = () =>
    setNotificationsEnabled(!notificationsEnabled);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const formatDateTime = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const AvatarUser = () => {
    return (
      <>
        <Text
          style={{
            fontSize: 14,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: "600",
            color: theme.colors.outline,
          }}
        >
          Usuário
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Avatar.Text size={75} label={!!user ? user.name.charAt(0) : "N"} />
          <View style={{ marginLeft: 16 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: theme.colors.onBackground,
              }}
            >
              {!!user ? user.name : "Nome"}
            </Text>
            <Text
              style={{
                color: theme.colors.outline,
                fontSize: 16,
                marginTop: 4,
              }}
            >
              {!!user ? user.email : "Email"}
            </Text>
          </View>
        </View>
        <Divider />
      </>
    );
  };

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 25 }}>
      {!!user ? <AvatarUser /> : <></>}
      {/* Categoria: Geral */}
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
      <Divider />
      <List.Item
        title="Avançado"
        left={() => <List.Icon icon="cog" color={theme.colors.primary} />}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Backup"
        description={`Último Backup: ${formatDateTime(lastBackup)}`}
        descriptionStyle={{ color: "#A1A1A1", fontSize: 13 }} // Cor igual ao "Desativado"
        left={() => (
          <List.Icon icon="cloud-refresh" color={theme.colors.primary} />
        )}
        onPress={() => {
          setLastBackup(new Date()); // Atualiza a data do último backup
          backupHabits();
        }}
      />

      {/* Categoria: Suporte */}
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
      <List.Item
        title="Ajuda e Feedback"
        left={() => (
          <List.Icon icon="help-circle" color={theme.colors.primary} />
        )}
        onPress={() => {}}
      />
      <Divider />
      <List.Item
        title="Sobre a Rotinize"
        left={() => <List.Icon icon="download" color={theme.colors.primary} />}
        right={() => (
          <IconButton
            icon="open-in-new"
            color={theme.colors.primary}
            onPress={() => Linking.openURL("https://structured.app")}
          />
        )}
        onPress={() => Linking.openURL("https://structured.app")}
      />

      {/* Categoria: Siga-nos */}
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
        left={() => <List.Icon icon="instagram" color={theme.colors.primary} />}
        right={() => (
          <IconButton icon="open-in-new" color={theme.colors.primary} />
        )}
        onPress={() => Linking.openURL("https://instagram.com")}
      />

      <View style={{ marginVertical: 30, alignItems: "center" }}>
        {!user ? (
          <>
            <Button
              mode="contained"
              icon="login"
              style={{
                borderColor: theme.colors.primary,
                width: "100%", // Largura total
                paddingVertical: 10, // Mais altura para o botão
                borderRadius: 10, // Arredondamento suave
                elevation: 2, // Leve sombra
              }}
              labelStyle={{
                color: theme.colors.background,
                fontSize: 16,
                fontWeight: "bold",
              }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              Logar
            </Button>
            <Button
              mode="outlined"
              style={{
                borderColor: theme.colors.primary,
                marginTop: 15,
                width: "100%", // Largura total
                paddingVertical: 10, // Mais altura para o botão
                borderRadius: 10, // Arredondamento suave
                elevation: 2, // Leve sombra
              }}
              labelStyle={{
                color: theme.colors.primary,
                fontSize: 16,
                fontWeight: "bold",
              }}
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              Cadastrar
            </Button>
          </>
        ) : (
          <Button
            mode="contained"
            icon="logout"
            style={{
              backgroundColor: "#FF6B6B",
              marginTop: 15,
              width: "100%", // Largura total
              paddingVertical: 10, // Mais altura para o botão
              borderRadius: 10, // Arredondamento suave
              elevation: 2, // Leve sombra
            }}
            labelStyle={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "bold",
            }}
            onPress={() => signOut()}
          >
            Sair
          </Button>
        )}
      </View>

      {/* BottomSheet com Backdrop */}
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={{ justifyContent: "flex-end", flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={hideModal}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: theme.colors.onBackground,
              padding: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <IconButton
                icon="close"
                color={theme.colors.primary}
                iconColor={theme.colors.background}
                size={24}
                onPress={hideModal}
              />
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.surface }}
              >
                Notificações e Alertas
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.surface }}
              >
                Ativar Notificações
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
}
