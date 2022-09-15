import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createUser, getUserInfo } from "../actions/User";
import { HandlerType, Role } from "../utils/types";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function LoginScreen(props: any) {
  const [email, setEmail] = useState("testing@example.com");
  const [password, setPassword] = useState("testpassword");
  const [checkValidUser, setCheckValidUser] = useState(true);
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
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}></View>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.loginText}>Login your account</Text>
        <View>
          <View style={styles.inputContainer}>
            <Fontisto name="email" size={20} color="grey" />
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="lock" size={20} color="grey" />
            <TextInput
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            ></TextInput>
          </View>
        </View>
        {/* conditional rendering after authentication  */}
        {checkValidUser ? (
          <View style={styles.failedContainer}>
            <Text style={styles.failedText}>
              Login Failed - Wrong password/ email address
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotContainer}>
          <Text>Forgot the password?</Text>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Text
            style={styles.signupText}
            onPress={() => {
              props.navigation.navigate("Sign Up");
            }}
          >
            Sign up here
          </Text>
        </View>
      </View>

      {/* <Text onPress={handleLogin}>Login</Text> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
  },

  headerContainer: {
    flex: 2,
    marginTop: 25,
  },

  bodyContainer: {
    flex: 3,
    marginTop: 25,
    alignItems: "center",
  },

  footerContainer: {
    flex: 1,
    marginTop: 225,
  },

  logoContainer: {
    width: 120,
    height: 120,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#666666",
  },

  loginText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },

  inputContainer: {
    flexDirection: "row",
    marginTop: 15,
    paddingVertical: 10,
    paddingLeft: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "85%",
    backgroundColor: "white",
  },

  input: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },

  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
  },

  button: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    minWidth: "85%",
    backgroundColor: "#666666",
  },

  btnText: {
    color: "white",
  },

  forgotContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  failedContainer: {
    alignItems: "center",
    marginTop: 25,
    padding: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    minWidth: "85%",
    backgroundColor: "#D9D9D9",
  },

  failedText: {
    fontSize: 10,
    fontWeight: "300",
  },

  footerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    fontWeight: "200",
  },

  signupText: {
    fontWeight: "400",
  },
});
