import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

const UserEntry = () => {
  return (
    <TouchableOpacity onPress={undefined} style={styles.userInfoContainer}>
      <View style={styles.userInfo}>
        <FontAwesome name="user-circle" size={24} color="grey" />
        <Text style={styles.userLogText}>User Name</Text>
        <Text style={styles.userLogText}>test@gmail.com</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },

  userInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  userLogText: {
    color: "grey",
    fontFamily: "DMSans-Bold",
    fontSize: 10,
  },
});

export default UserEntry;
