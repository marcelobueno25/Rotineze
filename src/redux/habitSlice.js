import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// Função auxiliar para calcular o completionPercentage
const calculateCompletionPercentage = (state, date) => {
  const totalHabits = state.habits.length;

  const dailyRecord = state.dailyRecords.find((record) => record.date === date);
  const completedHabits = dailyRecord ? dailyRecord.completedHabits : [];
  const notCheckedHabits = state.habits
    .map((habit) => habit.id)
    .filter((id) => !completedHabits.includes(id));

  const completionPercentage =
    totalHabits > 0
      ? Math.floor((completedHabits.length / totalHabits) * 100)
      : 0;

  return {
    completedHabits,
    notCheckedHabits,
    totalHabits,
    completionPercentage,
  };
};

// Função auxiliar para atualizar os dailyRecords
const updateDailyRecord = (state, date) => {
  const {
    completedHabits,
    notCheckedHabits,
    totalHabits,
    completionPercentage,
  } = calculateCompletionPercentage(state, date);

  const dayIndex = state.dailyRecords.findIndex(
    (record) => record.date === date
  );

  if (dayIndex !== -1) {
    state.dailyRecords[dayIndex] = {
      date,
      completedHabits,
      notCheckedHabits,
      totalHabits,
      completionPercentage,
    };
  } else {
    state.dailyRecords.push({
      date,
      completedHabits,
      notCheckedHabits,
      totalHabits,
      completionPercentage,
    });
  }
};

// Estado inicial com estrutura de hábitos e registros diários
const initialState = {
  habits: [], // Lista de hábitos do usuário
  dailyRecords: [], // Registros diários de hábitos completados
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    // Define todos os hábitos e atualiza o dailyRecords
    setHabits: (state, action) => {
      state.habits = action.payload;
      const today = moment().format("DD/MM/YYYY");
      updateDailyRecord(state, today);
    },

    // Adiciona um novo hábito e atualiza o dailyRecords
    addHabit: (state, action) => {
      state.habits.push(action.payload);
      const today = moment().format("DD/MM/YYYY");
      updateDailyRecord(state, today);
    },

    // Atualiza as informações de um hábito específico
    updateHabit: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.id === action.payload.id
      );
      if (index !== -1) {
        state.habits[index] = { ...state.habits[index], ...action.payload };
      }
    },

    // Marca ou desmarca um hábito como completo para uma data específica
    checkHabit: (state, action) => {
      const { id, date } = action.payload;

      // Encontra ou cria o registro diário para a data
      let dailyRecord = state.dailyRecords.find(
        (record) => record.date === date
      );
      if (!dailyRecord) {
        dailyRecord = {
          date,
          completedHabits: [],
          notCheckedHabits: [],
          totalHabits: state.habits.length,
          completionPercentage: 0,
        };
        state.dailyRecords.push(dailyRecord);
      }

      // Verifica se o hábito já está marcado como completo
      const index = dailyRecord.completedHabits.indexOf(id);
      if (index !== -1) {
        // Se estiver marcado, desmarca
        dailyRecord.completedHabits.splice(index, 1);
      } else {
        // Se não estiver marcado, marca
        dailyRecord.completedHabits.push(id);
      }

      // Atualiza os hábitos não verificados
      dailyRecord.notCheckedHabits = state.habits
        .map((habit) => habit.id)
        .filter((habitId) => !dailyRecord.completedHabits.includes(habitId));

      // Recalcula a porcentagem de conclusão
      dailyRecord.totalHabits = state.habits.length;
      dailyRecord.completionPercentage =
        dailyRecord.totalHabits > 0
          ? Math.floor(
              (dailyRecord.completedHabits.length / dailyRecord.totalHabits) *
                100
            )
          : 0;
    },

    // Remove um hábito específico e atualiza o dailyRecords
    removeHabit: (state, action) => {
      const habitId = action.payload;
      state.habits = state.habits.filter((habit) => habit.id !== habitId);

      // Atualiza os registros diários
      state.dailyRecords.forEach((dailyRecord) => {
        // Remove o hábito dos hábitos completados e não verificados
        dailyRecord.completedHabits = dailyRecord.completedHabits.filter(
          (id) => id !== habitId
        );
        dailyRecord.notCheckedHabits = dailyRecord.notCheckedHabits.filter(
          (id) => id !== habitId
        );

        // Atualiza totalHabits e completionPercentage
        dailyRecord.totalHabits = state.habits.length;
        dailyRecord.completionPercentage =
          dailyRecord.totalHabits > 0
            ? Math.floor(
                (dailyRecord.completedHabits.length / dailyRecord.totalHabits) *
                  100
              )
            : 0;
      });
    },

    // Reseta todos os hábitos
    resetHabit: (state) => {
      state.habits = [];
      state.dailyRecords = [];
    },
  },
});

export const {
  setHabits,
  addHabit,
  checkHabit,
  updateHabit,
  removeHabit,
  resetHabit,
} = habitSlice.actions;

export default habitSlice.reducer;
