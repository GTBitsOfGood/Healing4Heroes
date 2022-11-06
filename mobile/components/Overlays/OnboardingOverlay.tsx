import React, { ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

interface OnboardingOverlayProps {
  showBackDrop: boolean;
  footerMainText: string;
  footerSubText: string;
  pageBody: ReactElement;
  footerCallback?: () => void | undefined;
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
});
