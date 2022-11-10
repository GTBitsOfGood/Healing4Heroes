import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { validateEmail } from "../../utils/helper";
import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { userCreateUser } from "../../actions/User";
import { Role } from "../../utils/types";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";

export default function SignUpScreen(props: any) {
  const [checkValidRegister, setCheckValidRegister] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpDisabled, setSignUpDisabled] = useState(false);
  const validateInput = () => {
    setCheckValidRegister(true);
    if (!validateEmail(email)) {
      setCheckValidRegister(false);
      setErrorMessage("Registration Failed — Invalid email");
      return false;
    }

    if (password.trim() === "") {
      setCheckValidRegister(false);
      setErrorMessage("Registration Failed — Password cannot be empty");
      return false;
    }

    if (confirmPassword !== password) {
      setCheckValidRegister(false);
      setErrorMessage("Registration Failed — Passwords don't match");
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
        setErrorMessage("Registration Failed - Please try again!");
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
      console.log(e);
      setErrorMessage("Registration failed - Account already exists");
      setCheckValidRegister(false);
      return;
    }
  };

  return (
    <OnboardingOverlay
      showBackDrop={false}
      headerText="Register Your Account"
      footerMainText="Already have an account?"
      footerSubText="Sign in Here"
      footerCallback={() => {
        props.navigation.navigate("Login");
      }}
      pageBody={
        <View>
          <View style={styles.container}>
            <View style={styles.bodyContainer}>
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
              <View
                style={[
                  styles.buttonContainer,
                  signUpDisabled
                    ? styles.disabledButton
                    : styles.buttonContainer,
                ]}
              >
                <TouchableOpacity
                  disabled={signUpDisabled}
                  style={styles.button}
                  onPress={async () => {
                    setSignUpDisabled(true);
                    const validInputs = validateInput();
                    if (validInputs) {
                      const user = await handleSignUp();
                      if (user) {
                        props.navigation.navigate("Passcode Screen", {
                          params: {
                            userId: user?._id,
                            roles: user?.roles,
                          },
                        });
                      }
                    }
                    setSignUpDisabled(false);
                  }}
                >
                  <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    marginBottom: 10,
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
    minWidth: "100%",
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
    marginTop: 24,
    alignItems: "center",
  },

  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    minWidth: "100%",
    backgroundColor: "#3F3BED",
  },

  btnText: {
    color: "white",
  },

  failedContainer: {
    marginTop: 24,
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: "100%",
    backgroundColor: "#FF8E8E50",
    borderColor: "#C63636",
  },

  failedText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#C63636",
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
  disabledButton: {
    opacity: 0.5,
  },
});
