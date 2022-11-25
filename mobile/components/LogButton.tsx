import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const LogButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={props.callbackFunction}
      disabled={props.disabled}
      style={[styles.buttonItem]}
    >
      {props.icon}
      <Text style={[styles.text]}>{props.text}</Text>
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
  },

  text: {
    marginTop: 5,
    fontFamily: "DMSans-Bold",
    textAlign: "center",
    fontSize: 10,
  },
});

export default LogButton;
