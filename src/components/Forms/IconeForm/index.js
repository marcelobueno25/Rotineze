import React, { useState, useEffect, memo } from "react";
import {
  Text,
  IconButton,
  Modal,
  Portal,
  Button,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";

export const IconeForm = memo(
  ({ selectedIcon, setSelectedIcon, selectedColor, listIcons }) => {
    const theme = useTheme();

    const [visible, setVisible] = useState(false);
    const [icons, setIcons] = useState(listIcons);

    useEffect(() => {
      setIcons([
        selectedIcon,
        ...icons.filter((icon) => icon !== selectedIcon),
      ]);
    }, []);

    const handleIconSelect = (icon) => {
      setSelectedIcon(icon);
      setIcons((prevIcons) => [icon, ...prevIcons.filter((i) => i !== icon)]);
      setVisible(false);
    };

    return (
      <>
        <Text>Ícone</Text>
        <View style={styles.iconContainer}>
          {!!icons.length &&
            icons.slice(0, 10).map((icon, index) => (
              <View key={index} style={styles.iconWrapper}>
                <IconButton
                  icon={icon}
                  iconColor={selectedIcon === icon ? "#fff" : "#888"}
                  size={22}
                  onPress={() => setSelectedIcon(icon)}
                  style={
                    selectedIcon === icon
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                />
              </View>
            ))}
        </View>
        <Button onPress={() => setVisible(true)}>Ver mais</Button>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: theme.colors.surfaceVariant,
              ...styles.modalContainer,
            }}
          >
            <View style={styles.iconContainer}>
              {listIcons.map((icon, index) => (
                <IconButton
                  key={index}
                  icon={icon}
                  iconColor={selectedIcon === icon ? "#fff" : "#888"}
                  size={22}
                  onPress={() => handleIconSelect(icon)}
                  style={
                    selectedIcon === icon
                      ? { backgroundColor: selectedColor }
                      : {}
                  }
                />
              ))}
            </View>
            <Button
              mode="outlined"
              onPress={() => setVisible(false)}
              style={{ marginTop: 10 }}
            >
              Fechar
            </Button>
          </Modal>
        </Portal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  iconWrapper: {
    width: "20%",
    alignItems: "center",
  },
  modalContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
});
