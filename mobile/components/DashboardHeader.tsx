import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../utils/firebase";
import { Screens, User } from "../utils/types";
import IconButton from "./IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface DashboardHeaderProps {
  userInfo: User;
  navigationProp: any;
}

const DashboardHeader = ({
  userInfo,
  navigationProp,
}: DashboardHeaderProps) => {
  return (
    <View style={styles.dashboardHeader}>
      <FontAwesome name="user-circle" size={26} color="#3F3BED" />
      <Text style={styles.profileName}>
        {userInfo?.firstName} {userInfo?.lastName}
      </Text>
      <IconButton
        callbackFunction={async () => {
          await auth.signOut().then().catch();
          navigationProp.navigate(Screens.LANDING_SCREEN);
        }}
        icon={
          <MaterialCommunityIcons name="logout" size={26} color="#3F3BED" />
        }
      ></IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  cardImgContainer: {
    flexGrow: 1,
    paddingLeft: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  cardInfoContainer: {
    paddingVertical: 20,
    flexGrow: 2,
    justifyContent: "space-around",
    alignContent: "center",
  },
  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "DMSans-Bold",
  },

  linkText: {
    fontWeight: "200",
  },
  dashboardHeader: {
    flexDirection: "row",
    marginBottom: 25,
    marginTop: 10,
  },
  profileName: {
    flexGrow: 1,
    paddingLeft: 10,
    alignSelf: "center",
    fontFamily: "DMSans-Bold",
  },
});

export default DashboardHeader;
