import React, { ReactElement } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";

interface OnboardingOverlayProps {
  header: ReactElement;
  body: ReactElement;
  footer?: ReactElement;
  fixedBody?: boolean;
}
export default function OnboardingOverlay({
  header,
  body,
  footer,
  fixedBody,
}: OnboardingOverlayProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding">
          <SafeAreaView>
            <View style={styles.container}>
              <View>{header}</View>
              {fixedBody ? (
                <View>{body}</View>
              ) : (
                <ScrollView>{body}</ScrollView>
              )}
              {footer && <View>{footer}</View>}
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      ) : (
        <SafeAreaView>
          <View style={styles.container}>
            <View>{header}</View>
            {fixedBody ? <View>{body}</View> : <ScrollView>{body}</ScrollView>}
            {footer && <View>{footer}</View>}
          </View>
        </SafeAreaView>
      )}
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 34,
    height: "100%",

    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight as number) + 10 : 10,
    paddingBottom: 15,
  },
});
