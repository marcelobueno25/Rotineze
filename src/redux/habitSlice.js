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
    case "ADD_CONCLUIDO_DATA":
      return {
        ...state,
        habits: state.habits.map(
          (habit) =>
            habit.completedDates === habit.completedDates.push(action.payload)
        ),
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
    default:
      return state;
  }
};

export default habitReducer;
