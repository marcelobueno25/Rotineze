import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
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

export function Settings({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const theme = useTheme();

  const toggleNotifications = () =>
    setNotificationsEnabled(!notificationsEnabled);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const userName = "Marcelo Bueno";
  const userEmail = "marcelo.bueno@email.com"; // Email do usuário
  const userAvatar =
    "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; // Coloque a URL do avatar

  return (
    <ScrollView style={[styles.container]}>
      {/* Header com Avatar e Nome do Usuário */}
      <Text style={[styles.categoryTitle, { color: theme.colors.outline }]}>
        Usuário
      </Text>
      <View style={styles.header}>
        <Avatar.Image size={80} source={{ uri: userAvatar }} />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme.colors.onBackground }]}>
            {userName}
          </Text>
          <Text style={[styles.userEmail, { color: theme.colors.outline }]}>
            {userEmail}
          </Text>
        </View>
      </View>
      <Divider />

      {/* Categoria: Geral */}
      <Text style={[styles.categoryTitle, { color: theme.colors.outline }]}>
        Geral
      </Text>
      <List.Item
        title="Notificações"
        right={() => (
          <Text style={styles.disabledText}>
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
        left={() => (
          <List.Icon icon="cloud-refresh" color={theme.colors.primary} />
        )}
        onPress={() => {}}
      />

      {/* Categoria: Suporte */}
      <Text style={[styles.categoryTitle, { color: theme.colors.outline }]}>
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
      <Text style={[styles.categoryTitle, { color: theme.colors.outline }]}>
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

      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          icon="logout"
          //onPress={handleLogout}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonText}
        >
          Deslogar
        </Button>
      </View>

      {/* BottomSheet com Backdrop */}
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalWrapper}
        >
          <TouchableWithoutFeedback onPress={hideModal}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.bottomSheet,
              { backgroundColor: theme.colors.onBackground },
            ]}
          >
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                  marginBottom: 20,
                },
              ]}
            >
              <IconButton
                icon="close"
                color={theme.colors.primary}
                iconColor={theme.colors.background}
                size={24}
                style={styles.closeButtonTopLeft}
                onPress={hideModal}
              />
              <Text
                variant="titleMedium"
                style={{ color: theme.colors.surface }}
              >
                Notificações e Alertas
              </Text>
            </View>
            <View style={styles.switchRow}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  userInfo: {
    marginLeft: 16, // Espaço entre o avatar e o texto
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#A1A1A1",
    fontSize: 16,
    marginTop: 4, // Pequeno espaçamento entre o nome e o e-mail
  },
  categoryTitle: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  disabledText: {
    color: "#A1A1A1",
    marginRight: 10,
    fontSize: 16,
  },
  modalWrapper: {
    justifyContent: "flex-end",
    flex: 1,
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    backgroundColor: "#2c2c2e",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
  logoutContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#FF6B6B",
    marginBottom: 30,
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
