import React from "react";
import { View } from "react-native";
import { Divider, Text, useTheme, Avatar } from "react-native-paper";

export const AvatarUser = ({ user }) => {
  const theme = useTheme();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Avatar.Text size={50} label={!!user ? user.name?.charAt(0) : "N"} />
        <View style={{ marginLeft: 10 }}>
          <Text
            variant="titleMedium"
            style={{
              fontWeight: "bold",
              color: theme.colors.onBackground,
            }}
          >
            {!!user ? user.name : "Nome"}
          </Text>
          <Text
            variant="bodySmall"
            style={{
              color: theme.colors.outline,
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
