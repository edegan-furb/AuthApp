import app from "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth(app);

async function authenticate(mode, email, password) {
  try {
    if (mode === "signUp") {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      return token;
    } else if (mode === "signInWithPassword") {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      return token;
    } else {
      throw new Error("Invalid authentication mode");
    }
  } catch (error) {
    console.error("Authentication Error:", error.message);
    throw error;
  }
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
