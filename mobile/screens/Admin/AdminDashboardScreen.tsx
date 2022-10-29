import React, { useEffect } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import DashboardOverlay from "../../components/Overlays/DashboardOverlay";
import DashboardButton from "../../components/DashboardButton";
import UserEntry from "../../components/UserEntry";

export default function AdminDashboardScreen(props: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("Admin Dashboard");
      return true;
    });
  }, []);

  return (
    <DashboardOverlay
      headerComponent={
        <View style={styles.dashboardHeader}>
          <FontAwesome name="user-circle" size={26} color="grey" />
          <Text style={styles.profileName}>Admin Page</Text>
          <DashboardButton
            icon={
              <MaterialCommunityIcons
                name="bell-badge"
                size={26}
                color="grey"
              />
            }
          ></DashboardButton>
          <DashboardButton
            icon={<Ionicons name="ios-settings" size={26} color="grey" />}
          ></DashboardButton>
        </View>
      }
      pageBody={
        <View style={styles.container}>
          <Text style={styles.title}>All Users</Text>
          <UserEntry></UserEntry>
          <UserEntry></UserEntry>
        </View>
      }
    ></DashboardOverlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
  },

  dashboardHeader: {
    flexDirection: "row",
  },

  profileName: {
    flexGrow: 1,
    paddingLeft: 10,
    alignSelf: "center",
    color: "grey",
    fontFamily: "DMSans-Bold",
  },

  title: {
    color: "grey",
    fontFamily: "DMSans-Bold",
  },
});
