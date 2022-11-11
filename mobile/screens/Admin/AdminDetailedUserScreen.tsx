import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import DashboardOverlay from "../../components/Overlays/DashboardOverlay";
import IconButton from "../../components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LogButton from "../../components/LogButton";
import ProgressBar from "../../components/ProgressBar";
import HealthCard from "../../components/HealthCard";
import { Screens } from "../../utils/types";

export default function AdminDetailedUserScreen(props: any) {
  const [hoursCompleted, setHoursCompleted] = useState(348);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });
  }, []);

  return (
    <DashboardOverlay
      headerComponent={
        <IconButton
          icon={
            <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
          }
        ></IconButton>
      }
      pageBody={
        <View style={styles.container}>
          {/* profile picture  */}
          <View style={styles.profileContainer}>
            <FontAwesome name="user-circle" size={80} color="grey" />
            <Text style={styles.usernameText}>User name</Text>
          </View>
          {/* training progress bar */}
          <Text style={styles.label}>Training Progress</Text>
          <ProgressBar
            filled={Math.round((hoursCompleted / 800) * 100) + " %"}
            complete={hoursCompleted}
            total={800}
            unit={"Hours"}
          />
          {/* training log section */}
          <Text style={styles.label}>Training Log</Text>
          <View style={styles.logContainer}>
            <LogButton
              text="View All Logs"
              icon={
                <MaterialCommunityIcons
                  name="file-document"
                  size={40}
                  color="grey"
                />
              }
              navigation={props.navigation}
            ></LogButton>
            <LogButton
              text="Negative Behavior Logs"
              icon={
                <MaterialCommunityIcons
                  name="file-document"
                  size={40}
                  color="grey"
                />
              }
              navigation={props.navigation}
            ></LogButton>
          </View>
          {/* health information section */}
          <Text style={styles.label}>Health Information</Text>
          <HealthCard
            handlerName={"Jason Statham"}
            animalName={"Tobby"}
            animalAge={"2 years old"}
            animalImage={""}
          />
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

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  usernameText: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    fontFamily: "DMSans-Bold",
    color: "grey",
  },

  label: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 15,
    color: "grey",
    fontFamily: "DMSans-Bold",
  },

  logContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
