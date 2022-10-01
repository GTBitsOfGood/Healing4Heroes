import React, { ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

interface OnboardingOverlayProps {
  showBackDrop: boolean;
  footerMainText: string;
  footerSubText: string;
  pageBody: ReactElement;
  footerCallback: () => void;
  headerText: string;
}
export default function OnboardingOverlay({
  pageBody,
  showBackDrop,
  footerMainText,
  footerSubText,
  footerCallback,
  headerText,
}: OnboardingOverlayProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}></View>
        </View>
        {headerText && <Text style={styles.headerText}>{headerText}</Text>}
        <ScrollView>{pageBody}</ScrollView>

        {!isKeyboardVisible && footerMainText && (
          <Text style={styles.footerMainText}>{footerMainText}</Text>
        )}
        {!isKeyboardVisible && footerSubText && (
          <Text
            style={styles.footerSubText}
            onPress={() => {
              footerCallback();
            }}
          >
            {footerSubText}
          </Text>
        )}
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
    paddingHorizontal: 34,
    alignItems: "center",
  },
  headerContainer: {
    marginTop: 75,
    marginBottom: 75,
  },
  logoContainer: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    width: 120,
    height: 120,
    backgroundColor: "#666666",
  },
  footerMainText: {
    marginTop: "auto",
    fontWeight: "400",
  },
  footerSubText: {
    fontWeight: "200",
    marginBottom: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
  },
});
