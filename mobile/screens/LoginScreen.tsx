import React, { useState } from "react";
import { Text, View } from "react-native";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("testing@example.com");
  const [password, setPassword] = useState("testpassword");

  const handleSignUp = async () => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!userCredential || !userCredential.user) {
      throw new Error(
        `Failed to sign Up with email; account may already exist!`
      );
    }

    return userCredential.user;
  };

  const handleLogin = async () => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredential || !userCredential.user) {
      throw new Error(`Email or password is incorrect!`);
    }

    return userCredential.user;
  };

  return (
    <View>
      <Text onPress={handleLogin}>Sign Up</Text>
    </View>
  );
}
