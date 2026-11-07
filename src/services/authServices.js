import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const USERS_COLLECTION = "users";

// Pages never see Firebase error codes, only these messages
const AUTH_ERROR_MESSAGES = {
  "auth/email-already-in-use": "This email is already registered. Try logging in.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/weak-password": "Password is too weak. Use at least 6 characters.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/user-not-found": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
};

function toFriendlyError(error) {
  const message = AUTH_ERROR_MESSAGES[error.code];
  if (!message) console.error(error); // unknown error: keep details for debugging
  return new Error(message || "Something went wrong. Please try again.");
}

// The user object the rest of the app sees (no Firebase types leak out)
function toProfile(uid, data) {
  return { uid, name: data.name, email: data.email };
}

function fallbackProfile(user) {
  return { uid: user.uid, name: user.displayName || "", email: user.email };
}

// True while register() is running, so the listener doesn't read a half-made profile
let registrationInProgress = false;

export async function getUserProfile(uid) {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, uid));
  return snapshot.exists() ? toProfile(uid, snapshot.data()) : null;
}

export async function register({ name, email, password }) {
  registrationInProgress = true;
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );

    const profileData = {
      name: name.trim(),
      email: user.email,
      created_at: serverTimestamp(),
    };

    try {
      await setDoc(doc(db, USERS_COLLECTION, user.uid), profileData);
      await updateProfile(user, { displayName: name.trim() });
    } catch (error) {
      // Roll back so we don't leave an account with no profile
      await deleteUser(user).catch(() => {});
      throw error;
    }

    return toProfile(user.uid, profileData);
  } catch (error) {
    throw toFriendlyError(error);
  } finally {
    registrationInProgress = false;
  }
}

export async function login({ email, password }) {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password
    );
    const profile = await getUserProfile(user.uid);
    return profile ?? fallbackProfile(user);
  } catch (error) {
    throw toFriendlyError(error);
  }
}

export async function logout() {
  await signOut(auth);
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email.trim());
  } catch (error) {
    throw toFriendlyError(error);
  }
}

// AuthContext uses this, so it never imports Firebase itself.
// Returns an unsubscribe function.
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (registrationInProgress) return; // register() returns the profile itself
    if (!user) {
      callback(null);
      return;
    }
    try {
      const profile = await getUserProfile(user.uid);
      callback(profile ?? fallbackProfile(user));
    } catch {
      callback(fallbackProfile(user));
    }
  });
}