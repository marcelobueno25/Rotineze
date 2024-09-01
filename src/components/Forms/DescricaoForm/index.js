import React, { memo } from "react";
import { Text, TextInput, MD3Colors } from "react-native-paper";
import { Controller } from "react-hook-form";

export const DescricaoForm = memo(({ control, errors }) => (
  <>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          label="Descrição"
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={!!errors.description}
          maxLength={50}
        />
      )}
      name="description"
      defaultValue=""
    />
    {errors.description && (
      <Text style={{ color: MD3Colors.error50 }}>
        Este campo é obrigatório.
      </Text>
    )}
  </>
));
