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
    const teste = await firestore().collection("habits").doc(habitId);
    console.log("delete: ", teste);
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

// export const getUserData = async (userId) => {
//   try {
//     const userDoc = await firestore().collection("users").doc(userId).get();
//     return userDoc.data();
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateUserData = async (userId, data) => {
//   try {
//     await firestore().collection("users").doc(userId).update(data);
//   } catch (error) {
//     throw error;
//   }
// };

// export const createHabit = async (userId, habitData) => {
//   try {
//     const habitRef = await firestore()
//       .collection("users")
//       .doc(userId)
//       .collection("habits")
//       .add({
//         ...habitData,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
//     const newHabit = { id: habitRef.id, ...habitData };
//     getStore().dispatch(addHabit(newHabit));
//     return habitRef.id;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getUserHabits = async (userId) => {
//   try {
//     const habitsSnapshot = await firestore()
//       .collection("users")
//       .doc(userId)
//       .collection("habits")
//       .orderBy("createdAt", "desc")
//       .get();

//     const habits = habitsSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     getStore().dispatch(setHabits(habits));
//     return habits;
//   } catch (error) {
//     console.error("Error fetching habits:", error);
//     return getStore().getState().auth.habits; // Return cached habits if fetch fails
//   }
// };

// export const syncHabits = (userId) => {
//   return firestore()
//     .collection("users")
//     .doc(userId)
//     .collection("habits")
//     .orderBy("createdAt", "desc")
//     .onSnapshot(
//       (snapshot) => {
//         snapshot.docChanges().forEach((change) => {
//           if (change.type === "added") {
//             getStore().dispatch(
//               addHabit({ id: change.doc.id, ...change.doc.data() })
//             );
//           }
//           if (change.type === "modified") {
//             getStore().dispatch(
//               updateHabit({ id: change.doc.id, ...change.doc.data() })
//             );
//           }
//           if (change.type === "removed") {
//             getStore().dispatch(deleteHabit(change.doc.id));
//           }
//         });
//       },
//       (error) => {
//         console.error("Error syncing habits:", error);
//       }
//     );
// };
