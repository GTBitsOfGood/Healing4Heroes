import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createUser, getUserInfo } from "../actions/User";
import { HandlerType, Role } from "../utils/types";

export default function LoginScreen() {
  const [email, setEmail] = useState("testing@example.com");
  const [password, setPassword] = useState("testpassword");
  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");

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
    const user = userCredential.user;
    const result = await createUser(
      user.email as string,
      user.uid,
      [Role.NONPROFIT_USER],
      firstName,
      lastName,
      HandlerType.HANDLER_VETERAN
    );
    return result;
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
    const user = await getUserInfo();
    console.log(user);
    return userCredential.user;
  };

  return (
    <View style={styles.container}>
      <Text onPress={handleLogin}>Sign Up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
