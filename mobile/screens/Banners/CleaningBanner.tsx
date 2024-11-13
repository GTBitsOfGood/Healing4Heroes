import React from "react";
import { View, Text, StyleSheet } from "react-native";
import shadowStyle from "../../utils/styles";

const CleaningBanner = () => {
  return (
    <View style={[styles.pillBanner, shadowStyle.shadow]}>
      <Text style={styles.title}>Teeth Cleaning Reminder</Text>
      <Text style={styles.text}>
        February is National Pet Dental Health Month! Make sure to clean your
        dog&apos;s teeth or get their teeth cleaned by the vet!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pillBanner: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    opacity: 0.9,
  },
  title: {
    color: "black",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  text: {
    color: "black",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  },
  icon: {
    color: "black",
    fontSize: 20,
    fontWeight: "400",
    margin: "auto",
  },
});

export default CleaningBanner;
