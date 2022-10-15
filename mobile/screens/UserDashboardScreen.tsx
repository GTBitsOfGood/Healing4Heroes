import React, { useEffect, useState } from "react";
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
import ProgressBar from "../components/ProgressBar";

export default function UserDashboardScreen(props: any) {
  const [hoursCompleted, setHoursCompleted] = useState(348);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("User Dashboard");
      return true;
    });
  }, []);

  return (
    <NormalOverlay
      headerComponent={
        <View style={styles.dashboardHeader}>
          <FontAwesome name="user-circle" size={26} color="blue" />
          <Text style={styles.profileName}>Jason Statham</Text>
          <MaterialCommunityIcons name="bell-badge" size={26} color="blue" />
        </View>
      }
      pageBody={
        <View style={styles.container}>
          {/* announcment */}
          <View style={styles.announcementContainer}>
            <Text style={styles.announcementText}>New Announcement</Text>
            <Text style={styles.announcementText}>#####################</Text>
          </View>

          {/* training bar status */}
          <Text style={styles.label}>Training Progress</Text>
          <ProgressBar
            filled={Math.round((hoursCompleted / 800) * 100) + " %"}
            complete={hoursCompleted}
            total={800}
            unit={"Hours"}
          />

          {/* training log */}
          <Text style={styles.label}>Training Log</Text>
          <View style={styles.logContainer}>
            <LogButton
              text="Add New Log"
              icon={<MaterialIcons name="note-add" size={40} color="blue" />}
              navigation={props.navigation}
            ></LogButton>
            <LogButton
              text="View All Logs"
              icon={
                <MaterialCommunityIcons
                  name="file-document"
                  size={40}
                  color="blue"
                />
              }
              navigation={props.navigation}
            ></LogButton>
          </View>

          {/* animal cards */}
          <Text style={styles.label}>Health Information</Text>
          <HealthCard />
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
    paddingLeft: 10,
    alignSelf: "center",
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

  logContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
