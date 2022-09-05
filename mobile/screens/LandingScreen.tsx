import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LandingScreen(props: any) {
  return (
    <View style={styles.container}>
      <Text>Landing Screen</Text>
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

  buttonItem: {
    width: 300,
    backgroundColor: "#D3D3D3",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
