import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getUserById } from "./actions/User";

export default function App() {
  return (
    <View style={styles.container}>
      <Text onPress={retrieveUserById}>
        Open up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const retrieveUserById = async () => {
  const result = await getUserById("62ed9937b052f60447816f42");
  console.log(result);
};
