import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const signUp = async (email, password, name, birthDate, gender) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
      name,
      birthDate,
      gender
    );
    await userCredential.user.updateProfile({ displayName: name });
    await firestore().collection("users").doc(userCredential.user.uid).set({
      name,
      email,
      name,
      birthDate,
      gender,
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
