interface ErrorBoxProps {
  errorMessage?: string;
}
import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function ErrorBox({ errorMessage }: ErrorBoxProps) {
  return (
    <View>
      {errorMessage && (
        <View style={styles.failedContainer}>
          <Text style={styles.failedText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
