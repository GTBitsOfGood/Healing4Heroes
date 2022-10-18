import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";

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
    fontSize: 18,
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
    backgroundColor: "#3F3BED",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  signupBtn: {
    marginTop: 20,
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#3F3BED",
    borderWidth: 1,
  },

  loginBtnText: {
    color: "white",
    fontSize: 16,
  },

  signupBtnText: {
    color: "#3F3BED",
    fontSize: 16,
  },
});
