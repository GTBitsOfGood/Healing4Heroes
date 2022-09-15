import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function SignUpScreen(props: any) {
  const [checkValidRegister, setCheckValidRegister] = useState(true);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}></View>
      </View>

      <View style={styles.bodyContainer}>
        <Text style={styles.registerText}>Register your account</Text>
        <View>
          <View style={styles.inputContainer}>
            <Fontisto name="email" size={20} color="grey" />
            <TextInput placeholder="Email" style={styles.input}></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="lock" size={20} color="grey" />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name="lock" size={20} color="grey" />
            <TextInput
              placeholder="Confirmed Password"
              style={styles.input}
              secureTextEntry
            ></TextInput>
          </View>
        </View>

        {checkValidRegister ? (
          <View style={styles.failedContainer}>
            <Text style={styles.failedText}>
              Register Falied - Account already exists{" "}
            </Text>
          </View>
        ) : (
          <View></View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
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
