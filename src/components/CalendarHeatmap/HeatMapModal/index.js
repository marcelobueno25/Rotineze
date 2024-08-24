// /components/HeatMapModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import "moment/locale/pt-br"; // Importa o locale em português

// Configura o moment para usar o português
moment.locale("pt-br");

const HeatMapModal = ({ visible, onClose }) => {
  // Converter datas concluídas para o formato do calendário
  //   const markedDates = completedDates.reduce((acc, date) => {
  //     acc[date] = { marked: true, dotColor: "green" };
  //     return acc;
  //   }, {});

  //   const handleDayPress = (day) => {
  //     toggleDate(day.dateString); // Chama a função para alternar o estado do dia
  //   };

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      //animationType="slide"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Calendário de Hábitos</Text>
          <Calendar />
          {/* <Calendar
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={{
              selectedDayBackgroundColor: color,
              todayTextColor: "blue",
              arrowColor: "blue",
            }}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity> */}
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default HeatMapModal;
