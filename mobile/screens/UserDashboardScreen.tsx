import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";

export default function UserDashboardScreen(props: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("User Dashboard");
      return true;
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>User Dashboard Screen</Text>
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
