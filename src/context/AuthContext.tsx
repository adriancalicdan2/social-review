"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const SUPER_ADMIN_EMAIL = "adriancalicdan2@gmail.com";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, pass: string) => Promise<UserCredential>;
  signUp: (email: string, pass: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  signIn: async () => {
    throw new Error("AuthProvider not mounted");
  },
  signUp: async () => {
    throw new Error("AuthProvider not mounted");
  },
  signInWithGoogle: async () => {
    throw new Error("AuthProvider not mounted");
  },
  signOut: async () => {},
});

const googleProvider = new GoogleAuthProvider();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === SUPER_ADMIN_EMAIL;

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string): Promise<UserCredential> => {
    if (!auth) throw new Error("Firebase Auth is not initialized");
    return await signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email: string, pass: string): Promise<UserCredential> => {
    if (!auth) throw new Error("Firebase Auth is not initialized");
    return await createUserWithEmailAndPassword(auth, email, pass);
  };

  const signInWithGoogleFn = async (): Promise<UserCredential> => {
    if (!auth) throw new Error("Firebase Auth is not initialized");
    return await signInWithPopup(auth, googleProvider);
  };

  const signOut = async (): Promise<void> => {
    if (auth) {
      await firebaseSignOut(auth);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, signIn, signUp, signInWithGoogle: signInWithGoogleFn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
