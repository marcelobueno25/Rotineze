import moment from "moment";

const initialState = {
  habits: [],
};

const habitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HABIT":
      return {
        ...state,
        habits: [...state.habits, action.payload],
      };
    case "REMOVE_HABIT":
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.payload),
      };
    case "UPDATE_HABIT":
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.id ? action.payload : habit
        ),
      };
    case "TOGGLE_COMPLETE_HABIT":
      const today = !!action.payload.date
        ? action.payload.date
        : moment().format("DD/MM/YYYY");
      return {
        ...state,
        habits: state.habits.map((habit) => {
          if (habit.id === action.payload.id) {
            const dateIndex = habit.completedDates.indexOf(today);
            if (dateIndex > -1) {
              return {
                ...habit,
                completedDates: habit.completedDates.filter(
                  (date) => date !== today
                ),
              };
            } else {
              return {
                ...habit,
                completedDates: [...habit.completedDates, today],
              };
            }
          }
          return habit;
        }),
      };
    default:
      return state;
  }
};

export default habitReducer;
