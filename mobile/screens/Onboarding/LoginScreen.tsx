import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { userGetUserInfo } from "../../actions/User";
import { EndExecutionError, Role, Screens, User } from "../../utils/types";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";
import { ErrorWrapper } from "../../utils/error";
import ErrorBox from "../../components/ErrorBox";

export default function LoginScreen(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loginDisabled, setLoginDisable] = useState(false);

  const handleLogin = async () => {
    try {
      setErrorMessage("");
      await signOut(auth).then().catch();
      await ErrorWrapper({
        functionToExecute: signInWithEmailAndPassword,
        errorHandler: setErrorMessage,
        parameters: [auth, email, password],
        customErrors: {
          "Firebase: Error (auth/invalid-email).": "This email is invalid",
          "Firebase: Error (auth/user-not-found).":
            "There is no user record corresponding to this email",
          "Firebase: Error (auth/internal-error).":
            "An error occurred when trying to authenticate",
          "Firebase: Error (auth/wrong-password).":
            "Invalid email/password combination",
        },
      });
      const user = await ErrorWrapper({
        functionToExecute: userGetUserInfo,
        errorHandler: setErrorMessage,
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
      footerMainText={"Don't have an account?"}
      footerSubText={"Sign up here"}
      headerText={"Login to Your Account"}
      footerCallback={() => {
        props.navigation.navigate(Screens.SIGN_UP_SCREEN);
      }}
      pageBody={
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View>
            <KeyboardAvoidingView style={styles.container}>
              <View style={styles.bodyContainer}>
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
                <ErrorBox errorMessage={errorMessage} />
                <View
                  style={[
                    styles.buttonContainer,
                    loginDisabled
                      ? styles.disabledButton
                      : styles.buttonContainer,
                  ]}
                >
                  <TouchableOpacity
                    disabled={loginDisabled}
                    onPress={async () => {
                      setLoginDisable(true);
                      const result = await handleLogin();
                      if (result) {
                        // If they signed up but haven't set their user information
                        if (
                          !(
                            (result as User).firstName &&
                            (result as User).lastName &&
                            (result as User).handlerType
                          )
                        ) {
                          props.navigation.navigate(
                            Screens.HANDLER_INFORMATION_SCREEN
                          );
                        } else if (
                          (result as User).roles?.includes(Role.NONPROFIT_ADMIN)
                        ) {
                          props.navigation.navigate(
                            Screens.ADMIN_DASHBOARD_SCREEN
                          );
                        } else {
                          props.navigation.navigate(
                            Screens.USER_DASHBOARD_SCREEN
                          );
                        }
                      }
                      setLoginDisable(false);
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.btnText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.forgotContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate(Screens.FORGOT_PASSWORD_SCREEN);
                    }}
                  >
                    <Text style={styles.forgotText}>Forgot your password?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
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
    marginTop: 15,
    alignItems: "center",
  },

  button: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    minWidth: "100%",
    backgroundColor: "#3F3BED",
  },

  btnText: {
    color: "white",
  },

  forgotContainer: {
    marginTop: 20,
    alignItems: "center",
  },

  forgotText: {
    color: "#666666",
    fontWeight: "400",
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
  disabledButton: {
    opacity: 0.5,
  },
});
