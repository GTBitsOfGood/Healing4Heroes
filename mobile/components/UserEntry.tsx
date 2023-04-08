import React, { useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import IconButton from "./IconButton";
import { adminDeleteUser, adminVerifyUser } from "../actions/Admin";
import { endOfExecutionHandler, ErrorWrapper } from "../utils/error";
import shadowStyle from "../utils/styles";
import UserDeletionModal from "./UserDeletionModal";

const UserEntry = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.callbackFunction) {
          props.callbackFunction();
        }
      }}
      style={[styles.userEntryContainer, shadowStyle.shadow]}
    >
      <UserDeletionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        username={props.username}
        userEmail={props.userEmail}
        callback={async () => {
          try {
            await ErrorWrapper({
              functionToExecute: adminDeleteUser,
              errorHandler: props.verifyCallback,
              parameters: [props.userId],
              errorFunctionParams: [props.userId],
            });
            if (props.verifyCallback) {
              props.verifyCallback("", props.userId);
            }
          } catch (error) {
            endOfExecutionHandler(error as Error);
          }
        }}
      />
      <View style={styles.userEntry}>
        <View style={styles.nameIconContainer}>
          <FontAwesome
            name="user-circle"
            size={24}
            color="blue"
            style={styles.userIcon}
          />
          {props.username ? (
            <Text style={[styles.userLogText, styles.username]}>
              {props.isVerification ? props.userEmail : props.username}
            </Text>
          ) : (
            <Text style={[styles.userLogText, styles.username]}>
              No username found
            </Text>
          )}
        </View>
        <View style={styles.userLogIcon}>
          {props.isVerification ? (
            <IconButton
              icon={
                <Ionicons name="checkmark-circle" size={30} color="#28B305" />
              }
              callbackFunction={async () => {
                try {
                  await ErrorWrapper({
                    functionToExecute: adminVerifyUser,
                    errorHandler: props.verifyCallback,
                    parameters: [props.userId],
                    errorFunctionParams: [props.userId],
                  });
                  if (props.verifyCallback) {
                    props.verifyCallback("", props.userId);
                  }
                } catch (error) {
                  endOfExecutionHandler(error as Error);
                }
              }}
            />
          ) : props.userEmail ? (
            <Text style={styles.userLogText}>{props.userEmail}</Text>
          ) : (
            <Text style={styles.userLogText}>No email found</Text>
          )}

          {props.isVerification || props.canDeleteUser ? (
            <>
              <IconButton
                icon={
                  <Ionicons name="close-circle" size={30} color="#FF3939" />
                }
                callbackFunction={() => setModalVisible(true)}
              />
            </>
          ) : null}
        </View>
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
    flexShrink: 1,
  },

  username: {
    marginRight: 10,
  },

  userLogIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 0,
    alignItems: "center",
    flexShrink: 1,
  },
  nameIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default UserEntry;
