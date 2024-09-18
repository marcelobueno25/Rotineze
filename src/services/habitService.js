import firestore from "@react-native-firebase/firestore";
import {
  setHabits,
  addHabit,
  updateHabit,
  removeHabit,
} from "@redux/habitSlice";
//import { getStore } from "@redux/store";

export const fetchHabits = (userId) => async (dispatch) => {
  try {
    const habitsSnapshot = await firestore()
      .collection("habits")
      .where("userId", "==", userId)
      .get();
    const habits = habitsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(setHabits(habits));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createHabit = (habit, userId) => async (dispatch) => {
  try {
    const habitWithUserId = { ...habit, userId };
    const habitRef = await firestore()
      .collection("habits")
      .add(habitWithUserId);
    const newHabit = { id: habitRef.id, ...habitWithUserId };
    dispatch(addHabit(newHabit));
    return newHabit;
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

export const editHabit = (habitId, updatedHabit) => async (dispatch) => {
  try {
    await firestore().collection("habits").doc(habitId).update(updatedHabit);
    dispatch(updateHabit({ id: habitId, ...updatedHabit }));
  } catch (error) {
    console.error("Error editing habit:", error);
    throw error;
  }
};

export const deleteHabit = (habitId) => async (dispatch) => {
  try {
    await firestore().collection("habits").doc(habitId).delete();
    dispatch(removeHabit(habitId));
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
};

export const toggleHabitCheck =
  (habitId, date) => async (dispatch, getState) => {
    try {
      const { habits } = getState().habits;
      const habit = habits.find((h) => h.id === habitId);
      const checkDates = habit.checkDates || [];
      const updatedCheckDates = checkDates.includes(date)
        ? checkDates.filter((d) => d !== date)
        : [...checkDates, date];

      await firestore()
        .collection("habits")
        .doc(habitId)
        .update({ checkDates: updatedCheckDates });
      dispatch(updateHabit({ ...habit, checkDates: updatedCheckDates }));
    } catch (error) {
      console.error("Error toggling habit check:", error);
      throw error;
    }
  };
