import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../utils/firebase";

export default function DevelopmentScreen(props: any) {
  const [accessToken, setAccessToken] = useState("No Access Token Set Yet");
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
        onPress={() => props.navigation.navigate("Add Training Log")}
        style={styles.buttonItem}
      >
        <Text>Go To Add Training Log Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Upload Video Log")}
        style={styles.buttonItem}
      >
        <Text>Go Upload Video Log Page</Text>
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

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Storage Example Screen")}
        style={styles.buttonItem}
      >
        <Text>Go To Storage Example Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate("Step Overlay Example Screen")}
        style={styles.buttonItem}
      >
        <Text>Go To Step overlay Example Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            "testing@example.com",
            "testpassword"
          );

          const accessToken = (await auth.currentUser?.getIdToken()) as string;
          if (!accessToken) {
            setAccessToken("Failed to Retrieve Access Token");
          }
          setAccessToken(accessToken);
        }}
        style={styles.buttonItem}
      >
        <Text>Get User Access Token - For Backend Devs</Text>
      </TouchableOpacity>
      <View style={styles.accessTokenContainer}>
        <Text>{accessToken}</Text>
      </View>
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

  accessTokenContainer: {
    width: 300,
  },
});
