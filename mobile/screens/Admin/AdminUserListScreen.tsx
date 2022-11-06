import React, { useEffect } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import UserEntry from "../../components/UserEntry";
import UserOverlay from "../../components/Overlays/UserOverlay";

export default function AdminUserList(props: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("Admin Dashboard");
      return true;
    });
  }, []);

  return (
    <UserOverlay
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
    ></UserOverlay>
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
