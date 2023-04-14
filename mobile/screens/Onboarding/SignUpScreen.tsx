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
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import {
  userCreateUser,
  userGetRegistrationComplete,
  userGetUserInfo,
} from "../../actions/User";
import {
  EndExecutionError,
  Screens,
  UserVerificationLogType,
} from "../../utils/types";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";
import { authCreateVerificationLog } from "../../actions/Auth";
import { ErrorWrapper } from "../../utils/error";
import ErrorBox from "../../components/ErrorBox";

export default function SignUpScreen(props: any) {
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpDisabled, setSignUpDisabled] = useState(false);
  const validateInput = () => {
    setErrorMessage("");
    if (!validateEmail(email)) {
      setErrorMessage("Registration Failed — Invalid email");
      return false;
    }

    if (password.trim() === "") {
      setErrorMessage("Registration Failed — Password cannot be empty");
      return false;
    }

    if (confirmPassword !== password) {
      setErrorMessage("Registration Failed — Passwords don't match");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    await auth.signOut().then().catch();

    /* attempt to create new user */
    let userCredential;
    let emailAlreadyExists = false;
    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === AuthErrorCodes.WEAK_PASSWORD
      ) {
        setErrorMessage("Your password must be at least 6 characters");
        return;
      } else if (
        error instanceof FirebaseError &&
        error.code === AuthErrorCodes.EMAIL_EXISTS
      ) {
        emailAlreadyExists = true;

        /* we couldn't create user because email already existed, so
        check if registration is complete. if so, display error.*/
        const registrationComplete = await userGetRegistrationComplete(email);
        if (registrationComplete) {
          setErrorMessage("This email is already in use");
          return;
        }

        /* if registration not complete, retrieve firebase credential and continue registration process as normal.*/
        try {
          userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
        } catch (error) {
          if (
            error instanceof FirebaseError &&
            error.code === AuthErrorCodes.INVALID_PASSWORD
          ) {
            setErrorMessage(
              "Incorrect password (account is already in the registration process)"
            );
            return;
          }

          throw error;
        }
      } else {
        throw error;
      }
    }

    try {
      let user;
      if (emailAlreadyExists) {
        user = await userGetUserInfo();
      } else {
        const firebaseUid = userCredential.user.uid;
        user = await ErrorWrapper({
          functionToExecute: userCreateUser,
          errorHandler: setErrorMessage,
          parameters: [email, firebaseUid],
        });
      }

      await ErrorWrapper({
        functionToExecute: authCreateVerificationLog,
        errorHandler: setErrorMessage,
        parameters: [email, UserVerificationLogType.EMAIL_VERIFICATION],
        customErrors: { default: "Failed To Send Verification Email" },
      });
      return user;
    } catch (error) {
      if (error instanceof EndExecutionError) {
        return;
      } else {
        throw error;
      }
    }
  };

  return (
    <OnboardingOverlay
      showBackDrop={false}
      headerText="Register Your Account"
      footerMainText="Already have an account?"
      footerSubText="Sign in Here"
      footerCallback={() => {
        props.navigation.navigate(Screens.LOGIN_SCREEN);
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

              <ErrorBox errorMessage={errorMessage} />
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
                        props.navigation.navigate(
                          Screens.PASSCODE_VALIDATION_SCREEN,
                          {
                            verificationType:
                              UserVerificationLogType.EMAIL_VERIFICATION,
                            email: user.email,
                          }
                        );
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
