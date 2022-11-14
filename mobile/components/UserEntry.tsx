import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import IconButton from "./IconButton";
import { adminDeleteUser, adminVerifyUser } from "../actions/Admin";

const UserEntry = (props: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.callbackFunction) {
          props.callbackFunction();
        }
      }}
      style={styles.userEntryContainer}
    >
      <View style={styles.userEntry}>
        <View style={styles.nameIconContainer}>
          <FontAwesome
            name="user-circle"
            size={24}
            color="blue"
            style={styles.userIcon}
          />
          {props.username ? (
            <Text style={styles.userLogText}>
              {props.isVerification ? props.userEmail : props.username}
            </Text>
          ) : (
            <Text style={styles.userLogText}>No username found</Text>
          )}
        </View>
        {props.isVerification ? (
          <View style={styles.userLogIcon}>
            <IconButton
              icon={
                <Ionicons name="checkmark-circle" size={30} color="#28B305" />
              }
              callbackFunction={async () => {
                await adminVerifyUser(props.userId);
                if (props.verifyCallback) {
                  props.verifyCallback(props.userId);
                }
              }}
            />
            <IconButton
              icon={<Ionicons name="close-circle" size={30} color="#FF3939" />}
              callbackFunction={async () => {
                await adminDeleteUser(props.userId);
                if (props.verifyCallback) {
                  props.verifyCallback(props.userId);
                }
              }}
            />
          </View>
        ) : (
          <View>
            {props.userEmail ? (
              <Text style={[styles.userLogText]}>{props.userEmail}</Text>
            ) : (
              <Text style={[styles.userLogText]}>No email found</Text>
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
  userIcon: {
    marginHorizontal: 15,
  },
  userEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
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
  nameIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default UserEntry;
