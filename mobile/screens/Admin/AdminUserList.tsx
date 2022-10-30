import React, { useEffect } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import UserEntry from "../../components/UserEntry";
import LogOverlay from "../../components/Overlays/UserOverlay";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../../components/IconButton";

export default function AdminUserList(props: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("Admin Dashboard");
      return true;
    });
  }, []);

  return (
    <LogOverlay
      headerComponent={
        <View>
          <IconButton
            icon={
              <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
            }
          ></IconButton>
        </View>
      }
      pageBody={
        <View style={styles.container}>
          <Text style={styles.title}>All Users</Text>
          <UserEntry></UserEntry>
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
