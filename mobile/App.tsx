import React from "react";
import { StyleSheet, View } from "react-native";
import { getUserById } from "./actions/User";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen></LoginScreen>
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
