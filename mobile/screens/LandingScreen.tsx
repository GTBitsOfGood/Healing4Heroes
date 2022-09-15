import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LandingScreen(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}></View>
      </View>
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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  headerContainer: {
    flex: 1,
  },

  bodyContainer: {
    marginTop: 25,
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
    marginTop: 50,
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
