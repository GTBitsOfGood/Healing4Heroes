import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { validateEmail } from "../utils/string";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { userCreateUser } from "../actions/User";
import { Role } from "../utils/types";

export default function SignUpScreen(props: any) {
  const [checkValidRegister, setCheckValidRegister] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const windowHeight = useWindowDimensions().height;

  const validateInput = () => {
    setCheckValidRegister(true);
    if (!validateEmail(email)) {
      setCheckValidRegister(false);
      setErrorMessage("Invalid Email Detected!");
      return false;
    }

    if (confirmPassword !== password) {
      setCheckValidRegister(false);
      setErrorMessage("Password does not match confirmation!");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    await auth.signOut().then().catch();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential || !userCredential.user) {
        setErrorMessage("An error occurred -- Please try again!");
        setCheckValidRegister(false);
        return;
      }

      const user = userCredential.user;
      const isAdmin = email.endsWith("@healing4heroes.org");
      const firebaseUid = user.uid;

      let createdUser;
      if (isAdmin) {
        createdUser = await userCreateUser(email, firebaseUid, [
          Role.NONPROFIT_USER,
          Role.NONPROFIT_ADMIN,
        ]);
      } else {
        createdUser = await userCreateUser(email, firebaseUid, [
          Role.NONPROFIT_USER,
        ]);
      }
      return createdUser;
    } catch (e) {
      setErrorMessage(
        "Failed to sign up with email; account may already exist!"
      );
      setCheckValidRegister(false);
      return;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={[{ minHeight: Math.round(windowHeight) }]}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}></View>
          </View>

          <View style={styles.bodyContainer}>
            <Text style={styles.registerText}>Register your account</Text>
            <View>
              {/* Email Input Container */}
              <View style={styles.inputContainer}>
                <Fontisto name="email" size={20} color="grey" />
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  onChangeText={setEmail}
                ></TextInput>
              </View>

              {/* Password Input Container */}
              <View style={styles.inputContainer}>
                <SimpleLineIcons name="lock" size={20} color="grey" />
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  secureTextEntry
                  onChangeText={setPassword}
                ></TextInput>
              </View>

              {/* Confirm Password Container */}
              <View style={styles.inputContainer}>
                <SimpleLineIcons name="lock" size={20} color="grey" />
                <TextInput
                  placeholder="Confirm Password"
                  style={styles.input}
                  secureTextEntry
                  onChangeText={setConfirmPassword}
                ></TextInput>
              </View>
            </View>

            {!checkValidRegister ? (
              <View style={styles.failedContainer}>
                <Text style={styles.failedText}>{errorMessage}</Text>
              </View>
            ) : (
              <View></View>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  const validInputs = validateInput();
                  if (validInputs) {
                    const user = await handleSignUp();
                    if (user) {
                      props.navigation.navigate("Handler Information", {
                        params: {
                          userId: user?._id,
                          roles: user?.roles,
                        },
                      });
                    }
                  }
                }}
              >
                <Text style={styles.btnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.changeOptionContainer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <Text
                style={styles.signupText}
                onPress={() => {
                  props.navigation.navigate("Login");
                }}
              >
                Sign in here
              </Text>
            </View>
          </View>

          {/* <Text onPress={handleLogin}>Login</Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    marginTop: 75,
  },

  bodyContainer: {
    flex: 3,
    marginTop: 30,
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

  registerText: {
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

  changeOptionContainer: {
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
