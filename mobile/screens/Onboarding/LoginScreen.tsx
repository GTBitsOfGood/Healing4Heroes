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
import { Role } from "../../utils/types";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import OnboardingOverlay from "../../components/OnboardingOverlay";

export default function LoginScreen(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkValidUser, setCheckValidUser] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      await signOut(auth).then().catch();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential || !userCredential.user) {
        setErrorMessage(`An error occurred -- Please try again!`);
        setCheckValidUser(false);
        return;
      }
      const user = await userGetUserInfo();
      return user;
    } catch (e) {
      setErrorMessage(`Account email or password combination is incorrect!`);
      setCheckValidUser(false);
      return;
    }
  };
  return (
    <OnboardingOverlay
      showBackDrop={false}
      footerMainText={"Don't have an account?"}
      footerSubText={"Create an Account"}
      headerText={"Login to Your Account"}
      footerCallback={() => {
        props.navigation.navigate("Sign Up");
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
                {/* conditional rendering after authentication  */}
                {!checkValidUser ? (
                  <View style={styles.failedContainer}>
                    <Text style={styles.failedText}>{errorMessage}</Text>
                  </View>
                ) : (
                  <View></View>
                )}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={async () => {
                      const result = await handleLogin();
                      if (result) {
                        // If they signed up but haven't set their user information
                        if (
                          !(
                            result.firstName &&
                            result.lastName &&
                            result.handlerType
                          )
                        ) {
                          props.navigation.navigate("Handler Information");
                        } else if (result.roles?.includes(Role.NONPROFIT_ADMIN))
                          props.navigation.navigate("Admin Dashboard");
                      } else {
                        props.navigation.navigate("User Dashboard");
                      }
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.btnText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.forgotContainer}>
                  <Text>Forgot your password?</Text>
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
    minWidth: "100%",
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
