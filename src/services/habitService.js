import firestore from "@react-native-firebase/firestore";
import { setHabits } from "@redux/habitSlice";
import { getStore } from "@redux/store";

export const backupHabits = async () => {
  const habits = getStore().getState().habits.habits || [];
  const user = getStore().getState().auth.user;

  try {
    if (user) {
      const habitsRef = firestore()
        .collection("users")
        .doc(user.uid)
        .collection("habits");
      const querySnapshot = await habitsRef.get();
      const batch = firestore().batch();
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log("Hábitos antigos excluídos.");
      for (const habit of habits) {
        const habitWithUserId = {
          ...habit,
          createdAt: new Date().toISOString(),
        };
        await habitsRef.add(habitWithUserId);
      }
      getStore().dispatch(setHabits(habits));
    } else {
      console.log("Nenhum usuário logado.");
    }
  } catch (error) {
    console.error("Erro ao atualizar hábitos:", error);
    throw error;
  }
};

export const fetchAllHabits = async () => {
  const user = getStore().getState().auth.user;

  try {
    if (user) {
      const habitsRef = firestore()
        .collection("users")
        .doc(user.uid)
        .collection("habits");
      const querySnapshot = await habitsRef.get();
      const allHabits = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      getStore().dispatch(setHabits(allHabits));
      console.log("Hábitos atualizados:", allHabits);
    } else {
      console.log("Nenhum usuário logado.");
    }
  } catch (error) {
    console.error("Erro ao buscar hábitos:", error);
    throw error;
  }
};

// const habitsSnapshot = await firestore()
//   .collection("habits")
//   .where("userId", "==", userId)
//   .get();
// const habits = habitsSnapshot.docs.map((doc) => ({
//   id: doc.id,
//   ...doc.data(),
// }));
// dispatch(setHabits(habits));

// export const createHabit = (habit, userId) => async (dispatch) => {
//   try {
//     const habitWithUserId = { ...habit, userId };
//     const habitRef = await firestore()
//       .collection("habits")
//       .add(habitWithUserId);
//     const newHabit = { id: habitRef.id, ...habitWithUserId };
//     // dispatch(addHabit(newHabit));
//     return newHabit;
//   } catch (error) {
//     console.error("Error creating habit:", error);
//     throw error;
//   }
// };

// export const editHabit = (habitId, updatedHabit) => async (dispatch) => {
//   try {
//     await firestore().collection("habits").doc(habitId).update(updatedHabit);
//     dispatch(updateHabit({ id: habitId, ...updatedHabit }));
//   } catch (error) {
//     console.error("Error editing habit:", error);
//     throw error;
//   }
// };

// export const deleteHabit = (habitId) => async (dispatch) => {
//   try {
//     await firestore().collection("habits").doc(habitId).delete();
//     dispatch(removeHabit(habitId));
//   } catch (error) {
//     console.error("Error deleting habit:", error);
//     throw error;
//   }
// };

// export const toggleHabitCheck =
//   (habitId, date) => async (dispatch, getState) => {
//     try {
//       const { habits } = getState().habits;
//       const habit = habits.find((h) => h.id === habitId);
//       const checkDates = habit.checkDates || [];
//       const updatedCheckDates = checkDates.includes(date)
//         ? checkDates.filter((d) => d !== date)
//         : [...checkDates, date];

//       await firestore()
//         .collection("habits")
//         .doc(habitId)
//         .update({ checkDates: updatedCheckDates });
//       dispatch(updateHabit({ ...habit, checkDates: updatedCheckDates }));
//     } catch (error) {
//       console.error("Error toggling habit check:", error);
//       throw error;
//     }
//   };
