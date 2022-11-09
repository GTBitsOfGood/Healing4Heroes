import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { User } from "../../utils/types";
import { userGetUserInfo } from "../../actions/User";
import DashboardOverlay from "../../components/Overlays/DashboardOverlay";
import IconButton from "../../components/IconButton";

export default function AdminDashboardScreen(props: any) {
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    async function getAdminDashboardInfo() {
      const user: User = (await userGetUserInfo()) as User;
      setUserInfo(user);
    }

    getAdminDashboardInfo().then().catch();
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("Admin Dashboard");
      return true;
    });

    const unsubscribe = props.navigation.addListener("focus", () => {
      getAdminDashboardInfo().then().catch();
    });
    return unsubscribe;
  }, []);

  return (
    <DashboardOverlay
      headerComponent={
        <View style={styles.dashboardHeader}>
          <FontAwesome name="user-circle" size={26} color="#3F3BED" />
          <Text style={styles.profileName}>
            {userInfo?.firstName} {userInfo?.lastName}
          </Text>
          <IconButton
            icon={
              <MaterialCommunityIcons
                name="bell-badge"
                size={26}
                color="#3F3BED"
              />
            }
          ></IconButton>
        </View>
      }
      pageBody={
        <View style={styles.container}>
          <Text style={styles.label}>Announcements</Text>
          <View style={styles.announcementContainer}>
            <TouchableOpacity style={styles.announcementBox}>
              <Text style={styles.announcementTitle}>New Announcements</Text>
              <Text style={styles.announcementText}>No New Announcements</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => props.navigation.navigate("Create Announcement")}
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>User Summary</Text>
          <TouchableOpacity style={styles.bigButton}>
            <Text style={styles.bigButtonText}>View All Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton}>
            <Text style={styles.bigButtonText}>
              Users with Negative Behavior
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton}>
            <Text style={styles.bigButtonText}>
              New User Verification Portal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bigButton}>
            <Text style={styles.bigButtonText}>Users with 800 Hours</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  profileName: {
    flexGrow: 1,
    paddingLeft: 10,
    alignSelf: "center",
    fontFamily: "DMSans-Bold",
  },
  dashboardHeader: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    margin: 3,
  },
  label: {
    marginBottom: 16,
    fontSize: 16,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  announcementContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  announcementBox: {
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    flex: 1,
  },
  announcement: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flex: 1,
  },
  announcementTitle: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },
  announcementText: {
    size: 12,
    color: "#666666",
  },
  addButton: {
    backgroundColor: "#3F3BED",
    alignSelf: "center",
    width: 48,
    height: 48,
    borderRadius: 48,
    padding: 12,
    marginLeft: 12,
  },
  bigButton: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 36,
    marginBottom: 20,
    borderRadius: 8,
  },
  bigButtonText: {
    fontWeight: "700",
    fontSize: 12,
    color: "#9A9A9A",
  },
});
