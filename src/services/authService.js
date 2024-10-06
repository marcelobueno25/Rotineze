import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { getStore } from "@redux/store";
import { resetHabit } from "@redux/habitSlice";
import { clearUser } from "@redux/authSlice";

const createUserInFirestore = async (uid, userData) => {
  try {
    await firestore().collection("users").doc(uid).set(userData);
  } catch (error) {
    console.error("Erro ao salvar dados no Firestore:", error);
    throw new Error("Erro ao salvar os dados do usuário.");
  }
};

const getUserFromFirestore = async (uid) => {
  try {
    const userDoc = await firestore().collection("users").doc(uid).get();
    if (!userDoc.exists) {
      throw new Error("Usuário não encontrado no Firestore.");
    }
    return userDoc.data();
  } catch (error) {
    console.error("Erro ao buscar dados no Firestore:", error);
    throw new Error("Erro ao buscar as informações do usuário.");
  }
};

export const signUp = async (email, password, name, birthDate, gender) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    const uid = userCredential.user.uid;

    await userCredential.user.updateProfile({ displayName: name });

    const userData = {
      uid,
      name,
      email,
      birthDate,
      gender,
    };

    await createUserInFirestore(uid, userData);

    return getUserFromFirestore(uid);
  } catch (error) {
    console.error("Erro no cadastro:", error);
    throw new Error("Erro ao criar o usuário. Por favor, tente novamente.");
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password
    );
    const uid = userCredential.user.uid;

    return getUserFromFirestore(uid);
  } catch (error) {
    console.error("Erro no login:", error);
    throw new Error(
      "Erro ao fazer login. Por favor, verifique suas credenciais."
    );
  }
};

export const signOut = async () => {
  try {
    await clearLocalUser();
    getStore().dispatch(resetHabit());
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

export const clearLocalUser = async () => {
  try {
    getStore().dispatch(clearUser());
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = () => {
  return auth().currentUser;
};
