import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const habitSlice = createSlice({
  name: "habits",
  initialState: {
    habits: [],
  },
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
    },
    addHabit: (state, action) => {
      state.habits = [...state.habits, action.payload];
    },
    updateHabit: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => habit.id === action.payload.id
      );
      if (index !== -1) {
        state.habits[index] = action.payload;
      }
    },
    checkHabit: (state, action) => {
      const today = moment().format("DD/MM/YYYY");

      state.habits = state.habits.map((habit) => {
        if (habit.id === action.payload.id) {
          const dateIndex = habit.checkIns.indexOf(today);

          if (dateIndex > -1) {
            habit.checkIns = habit.checkIns.filter((date) => date !== today);
          } else {
            habit.checkIns = [...habit.checkIns, today];
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
    resetHabit: (state, action) => {
      state.habits = [];
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

// import moment from "moment";

// const initialState = {
//   habits: [],
// };

// const habitReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_HABIT":
//       return {
//         ...state,
//         habits: [...state.habits, action.payload],
//       };
//     case "REMOVE_HABIT":
//       return {
//         ...state,
//         habits: state.habits.filter((habit) => habit.id !== action.payload),
//       };
//     case "UPDATE_HABIT":
//       return {
//         ...state,
//         habits: state.habits.map((habit) =>
//           habit.id === action.payload.id ? action.payload : habit
//         ),
//       };
//     case "TOGGLE_COMPLETE_HABIT":
//       const today = !!action.payload.date
//         ? action.payload.date
//         : moment().format("DD/MM/YYYY");
//       return {
//         ...state,
//         habits: state.habits.map((habit) => {
//           if (habit.id === action.payload.id) {
//             const dateIndex = habit.checkIns.indexOf(today);
//             if (dateIndex > -1) {
//               return {
//                 ...habit,
//                 checkIns: habit.checkIns.filter(
//                   (date) => date !== today
//                 ),
//               };
//             } else {
//               return {
//                 ...habit,
//                 checkIns: [...habit.checkIns, today],
//               };
//             }
//           }
//           return habit;
//         }),
//       };
//     default:
//       return state;
//   }
// };

// export default habitReducer;
