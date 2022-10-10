import React, { useEffect } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import NormalOverlay from "../components/NormalOverlay";
import HealthCard from "../components/HealthCard";
import LogButton from "../components/LogButton";

export default function UserDashboardScreen(props: any) {
  let uploadNew = <MaterialIcons name="note-add" size={40} color="blue" />;
  let viewAll = (
    <MaterialCommunityIcons name="file-document" size={40} color="blue" />
  );

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("User Dashboard");
      return true;
    });
  }, []);

  return (
    <NormalOverlay
      circleCount={0}
      numberSelected={0}
      headerComponent={
        <View style={styles.dashboardHeader}>
          <FontAwesome name="user-circle" size={26} color="blue" />
          <Text style={styles.profileName}>Jason Statham</Text>
          <MaterialCommunityIcons name="bell-badge" size={26} color="blue" />
        </View>
      }
      error={""}
      pageBody={
        <View style={styles.container}>
          {/* announcment */}
          <View style={styles.announcementContainer}>
            <Text style={styles.announcementText}>New Announcement</Text>
            <Text style={styles.announcementText}>#####################</Text>
          </View>

          {/* training bar status */}
          <Text style={styles.label}>Training Progress</Text>
          <View style={styles.progressContainer}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>348/800</Text>
              <Text>Hours</Text>
            </View>
            <View>
              <View style={styles.progressBar}>
                <View style={styles.progressBarFilled}></View>
              </View>
            </View>
          </View>

          {/* training log */}
          <Text style={styles.label}>Training Log</Text>
          <View style={styles.logContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Add Training Log")}
              style={styles.buttonItem}
            >
              <MaterialIcons name="note-add" size={40} color="blue" />
              <Text style={styles.logText}>Add New Log</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Add Training Log")}
              style={styles.buttonItem}
            >
              <MaterialCommunityIcons
                name="file-document"
                size={40}
                color="blue"
              />
              <Text style={styles.logText}>View All Logs</Text>
            </TouchableOpacity>

            {/* <LogButton text="Add New Log" icon={uploadNew}></LogButton>
            <LogButton text="View All Logs" icon={viewAll}></LogButton> */}
          </View>

          {/* animal cards */}
          <Text style={styles.label}>Health Information</Text>
          <HealthCard></HealthCard>
        </View>
      }
    ></NormalOverlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
  },

  label: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },

  dashboardHeader: {
    flexDirection: "row",
  },

  profileName: {
    flexGrow: 1,
    paddingLeft: 5,
    paddingTop: 1,
    fontFamily: "DMSans-Bold",
  },

  announcementContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 10,
    padding: 10,
  },

  announcementText: {
    color: "grey",
    fontSize: 12,
  },

  progressContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 10,
    padding: 10,
  },

  progressBar: {
    marginTop: 10,
    padding: 1.5,
    height: 1,
    backgroundColor: "#A9A9A9",
    borderRadius: 10,
    justifyContent: "center",
  },

  progressBarFilled: {
    position: "relative",
    padding: 1.5,
    width: 90,
    height: 1,
    backgroundColor: "blue",
    borderRadius: 10,
  },

  logContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  logText: {
    paddingTop: 5,
    fontFamily: "DMSans-Bold",
  },

  buttonItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
