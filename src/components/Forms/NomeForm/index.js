import React, { memo } from "react";
import { Text, TextInput, MD3Colors } from "react-native-paper";
import { Controller } from "react-hook-form";

export const NomeForm = memo(({ control, errors }) => (
  <>
    <Controller
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          label="Nome"
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={!!errors.name}
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
  </>
));
