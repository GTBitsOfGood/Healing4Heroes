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
  Pressable,
} from "react-native";

interface BaseOverlayProps {
  header: ReactElement;
  body: ReactElement;
  footer?: ReactElement;
  fixedBody?: boolean;
}
export default function BaseOverlay({
  header,
  body,
  footer,
  fixedBody,
}: BaseOverlayProps) {
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
                <ScrollView>
                  <Pressable>{body}</Pressable>
                </ScrollView>
              )}
              {footer && <View>{footer}</View>}
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      ) : (
        <SafeAreaView>
          <View style={styles.container}>
            <View>{header}</View>
            {fixedBody ? (
              <View>{body}</View>
            ) : (
              <ScrollView>
                <Pressable>{body}</Pressable>
              </ScrollView>
            )}
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
