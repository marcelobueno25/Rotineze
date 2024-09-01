import React, { memo, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import moment from "moment";

export const TimePickerForm = memo(({ selectedDate, setSelectedDate }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <TextInput
          label="Selecione a Hora"
          value={moment(selectedDate).format("HH:mm")}
          mode="outlined"
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      <DatePicker
        date={selectedDate}
        onDateChange={setSelectedDate}
        mode="time"
        title=" "
        confirmText="Confirmar"
        cancelText="Cancelar"
        modal={true}
        open={visible}
        onConfirm={(date) => {
          setSelectedDate(date);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      />
    </>
  );
});
