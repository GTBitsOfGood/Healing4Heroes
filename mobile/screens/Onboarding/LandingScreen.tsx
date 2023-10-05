import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from "react-native";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";
import { Screens } from "../../utils/types";

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
                onPress={() => props.navigation.navigate(Screens.LOGIN_SCREEN)}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(Screens.SIGN_UP_SCREEN)
                }
                style={styles.signupBtn}
              >
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={() =>
                //   props.navigation.navigate(Screens.DONATE_SCREEN)
                // }
                style={styles.signupBtn}
              >
                <Text style={styles.signupBtnText}>Donate</Text>
              </TouchableOpacity>
            </View>
          </View>
          {Platform.OS === "web" ? (
            <View style={styles.netlifyContainer}>
              <TouchableOpacity
                style={styles.netlifyButton}
                onPress={() => Linking.openURL("https://www.netlify.com")}
              >
                <Image
                  style={styles.netlify}
                  source={require("./../../assets/images/netlify.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.quoteContainer}>
            <Text
              style={styles.quoteText}
            >{`"Not all wounds are visible"`}</Text>
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
    paddingBottom: 32,
    borderRadius: 16,
    alignItems: "center",
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

  netlifyContainer: {
    width: "100%",
    height: 80,
    marginTop: 20,
    alignItems: "center",
  },

  netlifyButton: {
    width: "100%",
    height: "100%",
  },

  netlify: {
    width: "100%",
    height: "100%",
  },
  quoteContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  quoteText: {
    fontFamily: "Baskerville",
    fontStyle: "italic",
    fontSize: 22,
  },
});
