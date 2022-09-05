import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DevelopmentScreen(props: any) {
  return (
    <View style={styles.container}>
      {/* Temporary Development Screen to help devs w/navigation */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Landing")}
        style={styles.buttonItem}
      >
        <Text>Go To Landing Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Login")}
        style={styles.buttonItem}
      >
        <Text>Go To Login Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Sign Up")}
        style={styles.buttonItem}
      >
        <Text>Go To Sign Up Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Handler Information")}
        style={styles.buttonItem}
      >
        <Text>Go To Handler Info Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Animal Information")}
        style={styles.buttonItem}
      >
        <Text>Go To Animal Info Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("User Dashboard")}
        style={styles.buttonItem}
      >
        <Text>Go To User Dashboard Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Admin Dashboard")}
        style={styles.buttonItem}
      >
        <Text>Go To Admin Dashboard Page</Text>
      </TouchableOpacity>
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
