import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// Estado inicial com estrutura de hábitos e selectedDate
const initialState = {
  habits: [], // Lista de hábitos do usuário
  selectedDate: moment().format("DD/MM/YYYY"), // Data selecionada, inicialmente hoje
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setHabits: (state, action) => {
      state.habits = action.payload.map((habit) => ({
        ...habit,
        checkIns: Array.isArray(habit.checkIns) ? habit.checkIns : [],
      }));
    },
    addHabit: (state, action) => {
      const newHabit = {
        ...action.payload,
        checkIns: Array.isArray(action.payload.checkIns)
          ? action.payload.checkIns
          : [],
      };
      state.habits.push(newHabit);
    },
    updateHabit: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.id === action.payload.id
      );
      if (index !== -1) {
        state.habits[index] = {
          ...action.payload,
          checkIns: Array.isArray(action.payload.checkIns)
            ? action.payload.checkIns
            : [],
        };
      }
    },
    checkHabit: (state, action) => {
      const { id, date } = action.payload;

      state.habits = state.habits.map((habit) => {
        if (habit.id === id) {
          const dateIndex = habit.checkIns.indexOf(date);

          if (dateIndex > -1) {
            // Desmarca o hábito
            habit.checkIns = habit.checkIns.filter(
              (checkInDate) => checkInDate !== date
            );
          } else {
            // Marca o hábito
            habit.checkIns = [...habit.checkIns, date];
          }
        }
        return habit;
      });
    },
    removeHabit: (state, action) => {
      state.habits = state.habits.filter(
        (habit) => habit.id !== action.payload
      );
    },
    resetHabit: (state) => {
      state.habits = [];
      state.selectedDate = moment().format("YYYY-MM-DD"); // Reset selectedDate
    },
  },
});

export const {
  setSelectedDate,
  setHabits,
  addHabit,
  checkHabit,
  updateHabit,
  removeHabit,
  resetHabit,
} = habitSlice.actions;

export default habitSlice.reducer;
