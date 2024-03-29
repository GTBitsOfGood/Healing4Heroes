import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";
import { authResetPassword } from "../../actions/Auth";
import { Screens } from "../../utils/types";

export default function ResetPasswordScreen(props: any) {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const { webToken } = props.route.params;

  const sendAuthResetPassword = async () => {
    authResetPassword(webToken, password)
      .then(() => {
        props.navigation.navigate(Screens.LOGIN_SCREEN);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  return (
    <OnboardingOverlay
      showBackDrop={false}
      headerText="Reset Your Password"
      footerMainText="Already have an account?"
      footerSubText="Sign in Here"
      nextStepCallback={sendAuthResetPassword}
      nextStepText={"Next"}
      footerCallback={() => {
        props.navigation.navigate(Screens.LOGIN_SCREEN);
      }}
      errorMessage={errorMessage}
      pageBody={
        <View>
          <View style={styles.container}>
            <View style={styles.bodyContainer}>
              <View>
                <TextInput
                  placeholder="Enter Your New Password"
                  style={styles.inputContainer}
                  onChangeText={setPassword}
                  secureTextEntry
                ></TextInput>
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
    flexDirection: "column",
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
    justifyContent: "space-between",
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
    marginTop: "50%",
    alignSelf: "flex-end",
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
  noCodeQuestion: {
    color: "#999999",
    fontWeight: "400",
    marginTop: 10,
  },
  resendButton: {
    color: "#3F3BED",
    fontWeight: "500",
    marginTop: 3,
  },
});
