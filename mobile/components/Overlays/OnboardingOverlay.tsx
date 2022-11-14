import React, { ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";

interface OnboardingOverlayProps {
  showBackDrop: boolean;
  footerMainText: string;
  footerSubText: string;
  pageBody: ReactElement;
  footerCallback?: () => void | undefined;
  headerText: string;
  errorMessage?: string;
  nextStepText?: string;
  nextStepCallback?: () => Promise<void> | void | undefined;
  notError?: boolean;
}
export default function OnboardingOverlay({
  pageBody,
  showBackDrop,
  footerMainText,
  footerSubText,
  footerCallback,
  headerText,
  errorMessage,
  nextStepText,
  nextStepCallback,
  notError,
}: OnboardingOverlayProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [nextStatus, setNextStatus] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        {showBackDrop && (
          <Image
            style={styles.backDrop}
            source={require("./../../assets/images/BackDrop.jpg")}
          />
        )}
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logoImage}
                source={require("./../../assets/images/Logo.jpg")}
              />
            </View>
          </View>
          {headerText && <Text style={styles.headerText}>{headerText}</Text>}
          <ScrollView>{pageBody}</ScrollView>
          {errorMessage && (
            <View
              style={[
                notError ? styles.notErrorContainer : styles.failedContainer,
              ]}
            >
              <Text
                style={[notError ? styles.notErrorText : styles.failedText]}
              >
                {errorMessage}
              </Text>
            </View>
          )}

          {nextStepText && (
            <TouchableOpacity
              disabled={nextStatus}
              style={styles.button}
              onPress={async () => {
                setNextStatus(true);
                if (nextStepCallback) {
                  await nextStepCallback();
                }
                setNextStatus(false);
              }}
            >
              <Text style={styles.btnText}>{nextStepText}</Text>
            </TouchableOpacity>
          )}

          {!isKeyboardVisible && footerMainText && (
            <Text style={styles.footerMainText}>{footerMainText}</Text>
          )}
          {!isKeyboardVisible && footerSubText && (
            <Text
              style={styles.footerSubText}
              onPress={() => {
                if (footerCallback) {
                  footerCallback();
                }
              }}
            >
              {footerSubText}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    paddingVertical: 0,
    alignItems: "center",
  },
  backDrop: {
    backgroundColor: "#d9d9d9",
    height: "41%",
    width: "100%",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    position: "absolute",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 34,
  },
  headerContainer: {
    marginTop: 75,
    marginBottom: 75,
  },
  logoContainer: {
    padding: 6,
    borderRadius: 16,
    alignItems: "center",
    width: 130,
    height: 130,
    backgroundColor: "white",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  footerMainText: {
    color: "#999999",
    marginTop: "auto",
    fontWeight: "400",
  },
  footerSubText: {
    color: "#3F3BED",
    fontWeight: "400",
    marginBottom: 30,
    marginTop: 4,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
  failedContainer: {
    marginTop: 12,
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
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
  notErrorContainer: {
    marginTop: 12,
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: "100%",
    backgroundColor: "#E6E6FA",
    borderColor: "blue",
  },
  notErrorText: {
    fontSize: 12,
    fontWeight: "400",
    color: "blue",
  },
  button: {
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 10,
    minWidth: "100%",
    backgroundColor: "#3F3BED",
  },

  btnText: {
    color: "white",
  },
});
