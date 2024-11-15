import React from "react";
import { View, Text } from "react-native";
import { StyleSheet, Switch } from "react-native";
import { useEffect, useState } from "react";
import { User } from "../../utils/types";
import { userGetUserInfo } from "../../actions/User";
import { ErrorWrapper, endOfExecutionHandler } from "../../utils/error";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import ErrorBox from "../../components/ErrorBox";
import IconButton from "../../components/IconButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Screens } from "../../utils/types";
import { userUpdateUser } from "../../actions/User";

export default function UserSettings(props: any) {
  const [error, setError] = useState<string>("");
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const user: User = (await ErrorWrapper({
          functionToExecute: userGetUserInfo,
          errorHandler: setError,
        })) as User;
        if (user.unsubscribeEmail === undefined) {
          user.unsubscribeEmail = false;
          await userUpdateUser(
            user.roles,
            user.birthday,
            user.firstName,
            user.lastName,
            user.handlerType,
            user.address,
            user.annualPetVisitDay,
            user.profileImage,
            user.nextPrescriptionReminder,
            false,
            user.unsubscribeEmail
          );
        }
        setUserInfo(user);
      } catch (error) {
        endOfExecutionHandler(error as Error);
      }
    }
    getUserInfo().catch();
  }, []);

  const toggleSwitch = async () => {
    // Change userInfo on this page and change in database
    const updatedUserInfo = {
      ...userInfo,
      unsubscribeEmail: !userInfo?.unsubscribeEmail,
    };
    setUserInfo(updatedUserInfo as User);
    await userUpdateUser(
      updatedUserInfo.roles,
      updatedUserInfo.birthday,
      updatedUserInfo.firstName,
      updatedUserInfo.lastName,
      updatedUserInfo.handlerType,
      updatedUserInfo.address,
      updatedUserInfo.annualPetVisitDay,
      updatedUserInfo.profileImage,
      updatedUserInfo.nextPrescriptionReminder,
      false,
      updatedUserInfo.unsubscribeEmail
    );
  };

  return (
    <BaseOverlay
      header={
        <View style={styles.header}>
          <Text>{/* This is just to align the text */}</Text>
          <Text style={styles.headerText}>User Settings</Text>
          <IconButton
            callbackFunction={() => {
              props.navigation.navigate(Screens.USER_DASHBOARD_SCREEN);
            }}
            icon={
              <MaterialCommunityIcons name="home" size={26} color="#3F3BED" />
            }
          />
        </View>
      }
      body={
        <View style={styles.container}>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Unsubscribe from Emails?</Text>
            <Switch
              trackColor={{ false: "#EBEBE4", true: "#32CD32" }}
              thumbColor={"#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={userInfo?.unsubscribeEmail}
            />
          </View>
        </View>
      }
      footer={<ErrorBox errorMessage={error} />}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    paddingRight: 15,
  },
});
