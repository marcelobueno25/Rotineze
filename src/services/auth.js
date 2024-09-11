// src/services/firebaseService.js
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const signUp = async (email, password, name) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    await userCredential.user.updateProfile({ displayName: name });
    await firestore().collection("users").doc(userCredential.user.uid).set({
      name,
      email,
    });
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth().currentUser;
};
