import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextInput, Switch, Text } from "react-native-paper";
import DatePicker from "react-native-date-picker";
import moment from "moment";

const DateSelection = ({
  initialDate,
  setInitialDate,
  endDate,
  setEndDate,
  enableEndDate,
  setEnableEndDate,
}) => {
  const [showInitialDate, setShowInitialDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text variant="bodyMedium">Data de término</Text>
        <Switch
          value={enableEndDate}
          onValueChange={() => setEnableEndDate(!enableEndDate)}
          color="#6200EE"
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, marginHorizontal: 4 }}
          onPress={() => setShowInitialDate(true)}
        >
          <TextInput
            label="Data Inicial"
            value={moment(initialDate).format("DD/MM/YYYY")}
            mode="outlined"
            editable={false}
            style={{ backgroundColor: "transparent" }}
          />
          <DatePicker
            modal
            open={showInitialDate}
            date={initialDate}
            mode="date"
            title="Data Inicial"
            confirmText="Confirmar"
            cancelText="Cancelar"
            onConfirm={(date) => {
              setInitialDate(date);
              setShowInitialDate(false);
            }}
            onCancel={() => setShowInitialDate(false)}
          />
        </TouchableOpacity>

        {/* Data Final */}
        {enableEndDate && (
          <TouchableOpacity
            style={{ flex: 1, marginHorizontal: 4 }}
            onPress={() => setShowEndDate(true)}
          >
            <TextInput
              label="Data Final"
              value={endDate ? moment(endDate).format("DD/MM/YYYY") : ""}
              mode="outlined"
              editable={false}
              style={{ backgroundColor: "transparent" }}
            />
            <DatePicker
              modal
              open={showEndDate}
              date={endDate || new Date()}
              mode="date"
              title="Data Final"
              confirmText="Confirmar"
              cancelText="Cancelar"
              onConfirm={(date) => {
                setEndDate(date);
                setShowEndDate(false);
              }}
              onCancel={() => setShowEndDate(false)}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default DateSelection;
