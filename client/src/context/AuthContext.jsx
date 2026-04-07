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

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 GOOGLE REDIRECT LOGIN
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result?.user) {
          const token = await result.user.getIdToken();

          // create user if not exists (default student)
          await loginUser(token, "student");

          const backendUser = await getMe(token);

          setUser({ ...backendUser, token });
        }
      } catch (err) {
        console.log("Redirect error:", err);
      }
    };

    handleRedirect();
  }, []);

  // 🔥 AUTO LOGIN (MOST IMPORTANT)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();

          const backendUser = await getMe(token);

          setUser({ ...backendUser, token });
        } else {
          setUser(null); // ✅ FIX
        }
      } catch (err) {
        console.log(err);
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 EMAIL LOGIN
  const login = async (email, password, role) => {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (!res.user.emailVerified) {
      throw new Error("Please verify your email first");
    }

    const token = await res.user.getIdToken();

    // create user if new
    await loginUser(token, role);

    const backendUser = await getMe(token);

    setUser({ ...backendUser, token });
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // 🔁 RESET PASSWORD
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent");
  };

  // 🔵 GOOGLE LOGIN
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

