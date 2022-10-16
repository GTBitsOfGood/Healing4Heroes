import React, { Children } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const LogButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("Add Training Log")}
      style={styles.buttonItem}
    >
      {props.icon}
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  text: {
    fontFamily: "DMSans-Bold",
  },
});

export default LogButton;
