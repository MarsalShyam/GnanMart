import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "firebase/auth";

import { loginUser } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Auto login if already authenticated
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();

      const backendUser = await loginUser(token, "student");

      setUser({ ...backendUser, token });
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);
  
  useEffect(() => {
  const handleRedirect = async () => {
    const result = await getRedirectResult(auth);

    if (result?.user) {
      const token = await result.user.getIdToken();

      const backendUser = await loginUser(token, "student");

      setUser({ ...backendUser, token });

      // 🔥 REDIRECT AFTER GOOGLE LOGIN
      window.location.href = "/dashboard";
    }
  };

  handleRedirect();
}, []);

  // 🔐 Login function
 const login = async (email, password, role) => {
  const res = await signInWithEmailAndPassword(auth, email, password);

  if (!res.user.emailVerified) {
    throw new Error("Please verify your email first");
  }

  const token = await res.user.getIdToken();

  const storedRole = localStorage.getItem("role");

  const backendUser = await loginUser(token, role || storedRole);

  setUser({ ...backendUser, token });
};

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };
  //forgot password
  const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
  alert("Password reset email sent");
};
//google Login
const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
};

  return (
    <AuthContext.Provider value={{ user, setUser, resetPassword, googleLogin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);