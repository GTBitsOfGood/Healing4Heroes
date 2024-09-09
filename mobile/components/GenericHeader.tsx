import React from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import { Ionicons } from "@expo/vector-icons";

interface GenericHeaderProps {
  headerTitle: string;
  navigationProp: any;
}
export default function GenericHeader({
  headerTitle,
  navigationProp,
}: GenericHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <IconButton
        icon={<Ionicons name="chevron-back-sharp" size={26} color="grey" />}
        callbackFunction={() => {
          if (navigationProp) {
            navigationProp.goBack();
          }
        }}
      ></IconButton>
      <Text style={styles.header}>{headerTitle}</Text>
      <View style={styles.spacer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 10,
    marginBottom: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  header: {
    fontFamily: "DMSans-Bold",
    color: "grey",
    fontSize: 16,
  },
  spacer: {
    width: 26,
  },
});
