import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../utils/firebase";
import { Screens } from "../../utils/types";

export default function DevelopmentScreen(props: any) {
  const [accessToken, setAccessToken] = useState("No Access Token Set Yet");
  return (
    <View style={styles.container}>
      {/* Temporary Development Screen to help devs w/navigation */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate(Screens.LANDING_SCREEN)}
        style={styles.buttonItem}
      >
        <Text>Go To Landing Page</Text>
      </TouchableOpacity>

      {/* needs to be deleted */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate(Screens.USER_DASHBOARD_SCREEN)}
        style={styles.buttonItem}
      >
        <Text>Go To User Dashboard Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Screens.PASSCODE_VALIDATION_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Passcode Verification Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Admin Dashboard Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Screens.ADMIN_USER_LIST_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Admin User List Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Screens.ADMIN_USER_VERIFICATION_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Admin User Verification Page</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Screens.ADMIN_DETAILED_USER_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Detailed User Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Screens.STORAGE_EXAMPLE_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Storage Example Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Screens.UPLOAD_PROFILE_IMAGE_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Upload Profile Image Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate(Screens.VIEW_ALL_LOGS_SCREEN)}
        style={styles.buttonItem}
      >
        <Text>View All Logs Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          await signInWithEmailAndPassword(
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
