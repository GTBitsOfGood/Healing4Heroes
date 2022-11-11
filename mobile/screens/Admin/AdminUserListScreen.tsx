import React, { useEffect } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import UserEntry from "../../components/UserEntry";
import LogOverlay from "../../components/Overlays/UserOverlay";
import { Screens } from "../../utils/types";

export default function AdminUserList(props: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });
  }, []);

  return (
    <LogOverlay
      pageBody={
        <View style={styles.container}>
          <Text style={styles.title}>All Users</Text>
          <UserEntry
            username={"dummy"}
            userEmail={"dummy@gmail.com"}
          ></UserEntry>
          <UserEntry></UserEntry>
        </View>
      }
    ></LogOverlay>
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
