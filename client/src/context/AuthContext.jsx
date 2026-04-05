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
import { getMe } from "../api/user.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Handle Google Redirect Login
  useEffect(() => {
    const handleRedirect = async () => {
      const result = await getRedirectResult(auth);

      if (result?.user) {
        const token = await result.user.getIdToken();

        // create user if not exists
        await loginUser(token, "student");

        // fetch full user data
        const backendUser = await getMe(token);

        setUser({ ...backendUser, token });

        window.location.href = "/dashboard";
      }
    };

    handleRedirect();
  }, []);

  // 🔥 Auto Login (IMPORTANT)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();

        // 🔥 ONLY get user (NOT login again)
        const backendUser = await getMe(token);

        setUser({ ...backendUser, token });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Email Login
  const login = async (email, password, role) => {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (!res.user.emailVerified) {
      throw new Error("Please verify your email first");
    }

    const token = await res.user.getIdToken();

    // 🔥 create user if new
    await loginUser(token, role);

    // 🔥 fetch full user
    const backendUser = await getMe(token);

    setUser({ ...backendUser, token });
  };

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🔁 Forgot Password
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  };

  // 🔵 Google Login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        resetPassword,
        googleLogin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);