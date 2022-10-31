import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import IconButton from "./IconButton";

const UserEntry = (props: any) => {
  return (
    <TouchableOpacity onPress={undefined} style={styles.userEntryContainer}>
      <View style={styles.userEntry}>
        <FontAwesome name="user-circle" size={24} color="grey" />
        {props.username ? (
          <Text style={styles.userLogText}>{props.username}</Text>
        ) : (
          <Text style={styles.userLogText}>No username found</Text>
        )}
        {props.isVerification ? (
          <View style={styles.userLogIcon}>
            <IconButton
              icon={<Ionicons name="checkmark-circle" size={30} color="grey" />}
            ></IconButton>
            <IconButton
              icon={<Ionicons name="close-circle" size={30} color="grey" />}
            ></IconButton>
          </View>
        ) : (
          <View>
            {props.userEmail ? (
              <Text style={styles.userLogText}>{props.userEmail}</Text>
            ) : (
              <Text style={styles.userLogText}>No email found</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userEntryContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 15,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
  },

  userEntry: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  userLogText: {
    color: "grey",
    fontFamily: "DMSans-Bold",
    fontSize: 10,
  },

  userLogIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 0,
  },
});

export default UserEntry;
