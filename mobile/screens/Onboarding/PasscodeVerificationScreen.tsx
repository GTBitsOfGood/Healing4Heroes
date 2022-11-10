import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";
import PasscodeInput from "../../components/PasscodeInput";
import { authCreateVerificationLog } from "../../actions/Auth";

export default function PasscodeVerificationScreen(props: any) {
  const [checkValidRegister, setCheckValidRegister] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [passcode, setPassword] = useState("");
  const [signUpDisabled, setSignUpDisabled] = useState(false);

  useEffect(() => {
    // async function sendVerification() {
    //   await authCreateVerificationLog();
    // }
  }, []);

  const verifyPasscode = async () => {
    setErrorMessage("");

    if (passcode.length !== 6) {
      setErrorMessage("Passcode Cannot be Partially Empty!");
      return;
    }
  };
  return (
    <OnboardingOverlay
      showBackDrop={false}
      headerText="Verify Your Account"
      footerMainText="Already have an account?"
      footerSubText="Sign in Here"
      nextStepCallback={verifyPasscode}
      nextStepText={"Next"}
      footerCallback={() => {
        props.navigation.navigate("Login");
      }}
      errorMessage={errorMessage}
      pageBody={
        <View>
          <View style={styles.container}>
            <View style={styles.bodyContainer}>
              <View>
                <PasscodeInput
                  callbackFunction={(value: string) => {
                    setPassword(value);
                  }}
                ></PasscodeInput>
              </View>

              <Text style={styles.noCodeQuestion}>Did Not Receive Code?</Text>
              <Text style={styles.resendButton}>Resend Code</Text>

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
              ></View>
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
