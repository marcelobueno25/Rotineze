import React from "react";
import { View } from "react-native";

export function Layout({ children }) {
  return (
    <View style={{ flex: 1, paddingBottom: 70 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
}
