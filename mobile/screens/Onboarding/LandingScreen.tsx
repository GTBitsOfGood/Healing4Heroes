import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import OnboardingOverlay from "../../components/OnboardingOverlay";

export default function LandingScreen(props: any) {
  return (
    <OnboardingOverlay
      showBackDrop={true}
      footerSubText={""}
      footerMainText={""}
      headerText={""}
      pageBody={
        <View style={styles.bodyContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.headerText}>Welcome to Healing 4 Heroes!</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Login")}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Sign Up")}
                style={styles.signupBtn}
              >
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 0,
    flex: 3,
  },

  logoContainer: {
    marginTop: 50,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    width: 120,
    height: 120,
    backgroundColor: "#666666",
  },

  loginContainer: {
    marginTop: 0,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    width: 340,
    height: 270,
    backgroundColor: "#fff",
  },

  headerText: {
    margin: 10,
    fontSize: 15,
    paddingTop: 20,
    fontWeight: "bold",
  },

  buttonContainer: {
    width: "90%",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  loginBtn: {
    marginTop: 20,
    backgroundColor: "#666666",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  signupBtn: {
    marginTop: 20,
    backgroundColor: "#F2F2F2",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  loginBtnText: {
    color: "white",
  },

  signupBtnText: {},
});
