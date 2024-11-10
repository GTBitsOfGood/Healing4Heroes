import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { User } from "../../utils/types";
import { userGetUserInfo } from "../../actions/User";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { endOfExecutionHandler, ErrorWrapper } from "../../utils/error";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Balloons } from "react-native-fiesta";

dayjs.extend(dayOfYear);

const BirthdayBanner = () => {
  const [birthdayBanner, setBirthdayBanner] = useState<{
    header: string;
    message: string;
  } | null>(null);
  const [error, setError] = useState("Could not get user");

  const checkForBirthday = async () => {
    try {
      const user: User = (await ErrorWrapper({
        functionToExecute: userGetUserInfo,
        errorHandler: setError,
      })) as User;

      const today = new Date();
      const birthday = user.birthday;

      if (
        birthday &&
        dayjs(today).dayOfYear() === dayjs(birthday).dayOfYear()
      ) {
        setBirthdayBanner({
          header: `Happy Birthday, ${user.firstName}`,
          message: `Wishing you an amazing day and a fantastic year ahead!`,
        });
      } else {
        setBirthdayBanner(null);
      }
    } catch (error) {
      endOfExecutionHandler(error as Error);
    }
  };

  useEffect(() => {
    checkForBirthday();
  }, []);

  if (!birthdayBanner) return null;

  return (
    <>
      <View style={styles.balloonsOverlay}>
        {birthdayBanner && <Balloons />}
      </View>
      <View style={styles.birthdayBanner}>
        <FontAwesome
          name="birthday-cake"
          size={20}
          color="#807efb"
          justify-content="center"
        />
        <Text style={styles.birthdayTitle}>{birthdayBanner.header}!</Text>
        {birthdayBanner.message ? (
          <Text style={styles.birthdayMessage}>{birthdayBanner.message}</Text>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  balloonsOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: "none",
  },
  birthdayBanner: {
    borderRadius: 10,
    backgroundColor: "#3F3BED",
    marginBottom: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    opacity: 0.9,
    alignItems: "center",
    zIndex: 1,
  },
  birthdayTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  birthdayMessage: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  },
});

export default BirthdayBanner;
