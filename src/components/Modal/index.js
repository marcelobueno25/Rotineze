import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import { Text, IconButton, Portal, Modal, useTheme } from "react-native-paper";

export function ModalBottom({ title, visible, setVisible, children }) {
  const theme = useTheme();

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={setVisible}
        contentContainerStyle={{ flex: 1, justifyContent: "flex-end" }}
      >
        <TouchableWithoutFeedback onPress={setVisible}>
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
            backgroundColor: theme.colors.background,
            paddingHorizontal: 20,
            paddingTop: 5,
            paddingBottom: 30,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              width: 40,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: theme.colors.disabled,
              alignSelf: "center",
              marginBottom: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", color: theme.colors.onBackground }}
            >
              {title}
            </Text>
            <IconButton
              icon="close"
              color={theme.colors.onBackground}
              size={24}
              onPress={setVisible}
            />
          </View>
          <View>{children}</View>
        </View>
      </Modal>
    </Portal>
  );
}
