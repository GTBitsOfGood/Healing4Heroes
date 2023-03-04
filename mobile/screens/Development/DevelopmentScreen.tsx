import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../utils/firebase";
import { Screens } from "../../utils/types";

export default function DevelopmentScreen(props: any) {
  const [accessToken, setAccessToken] = useState("No Access Token Set Yet");
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          props.navigation.navigate(Screens.BASE_OVERLAY_EXAMPLE_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Base Overlay Example</Text>
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
          props.navigation.navigate(Screens.ADMIN_DETAILED_USER_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To Detailed User Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(Screens.VIEW_ALL_ANNOUNCEMENTS_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Go To View All Announcements</Text>
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
        onPress={() =>
          props.navigation.navigate(Screens.ANALYTICS_DASHBOARD_SCREEN)
        }
        style={styles.buttonItem}
      >
        <Text>Analytics Dashboard Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          await signInWithEmailAndPassword(
            auth,
            "samratsahoo2013@gmail.com",
            "Aqaqaq"
          );

          const accessToken = (await auth.currentUser?.getIdToken()) as string;
          if (!accessToken) {
            setAccessToken("Failed to Retrieve Access Token");
          }
          setAccessToken("User token: " + accessToken);
        }}
        style={styles.buttonItem}
      >
        <Text>Get User Access Token - For Backend Devs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          await signInWithEmailAndPassword(
            auth,
            "samrat@healing4heroes.org",
            "Aqaqaq"
          );

          const accessToken = (await auth.currentUser?.getIdToken()) as string;
          if (!accessToken) {
            setAccessToken("Failed to Retrieve Access Token");
          }
          setAccessToken("Admin token: " + accessToken);
        }}
        style={styles.buttonItem}
      >
        <Text>Get Admin Access Token - For Backend Devs</Text>
      </TouchableOpacity>
      <View style={styles.accessTokenContainer}>
        <Text>{accessToken}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
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
