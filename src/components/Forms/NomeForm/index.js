import React, { memo } from "react";
import { Text, TextInput, MD3Colors } from "react-native-paper";
import { Controller } from "react-hook-form";
import { View } from "react-native";

export const NomeForm = memo(
  ({ control, errors, selectedIcon, selectedColor }) => (
    <View style={{ marginBottom: 20 }}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nome do hábito"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.name}
            maxLength={20}
            left={<TextInput.Icon icon={selectedIcon} color={selectedColor} />}
          />
        )}
        name="name"
        defaultValue=""
      />
      {errors.name && (
        <Text style={{ color: MD3Colors.error50 }}>
          Este campo é obrigatório.
        </Text>
      )}
    </View>
  )
);
