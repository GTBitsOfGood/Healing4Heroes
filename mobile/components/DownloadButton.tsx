import React from "react";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";
import {DownloadState} from "../utils/types";

const DownloadButton = (props: any) => {

  switch (props.state) {
    case (DownloadState.InProgress):

      return (
        <TouchableOpacity
          onPress={props.callbackFunction}
          style={[styles.button, styles.btnDisabled]}
          disabled={true}
        >
          <Text style={[styles.text, styles.textDisabled]}>Downloading...   <FontAwesome5 style={[styles.text]} name="download"/></Text>
        </TouchableOpacity>
      );

    case (DownloadState.Complete):

      return (
        <TouchableOpacity
          onPress={props.callbackFunction}
          style={[styles.button, styles.btnDisabled]}
          disabled={true}
        >
          <Text style={[styles.text, styles.textDisabled]}>Downloaded!   <FontAwesome5 style={[styles.text]} name="check"/></Text>
        </TouchableOpacity>
      );

    case (DownloadState.NotStarted):
    default:

      return (
        <TouchableOpacity
          onPress={props.callbackFunction}
          style={[styles.button, styles.btnEnabled]}
        >
          <Text style={[styles.text, styles.textEnabled]}>Download Video   <FontAwesome5 style={[styles.text]} name="download"/></Text>
        </TouchableOpacity>
      );

  }
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#403BED",
  },

  btnEnabled: {
    backgroundColor: "#403BED",
  },

  btnDisabled: {
    backgroundColor: "#EEEEFD",
  },

  textEnabled: {
    color: "white",
  },

  textDisabled: {
    color: "#403BED",
  },

  text: {
    marginTop: 5,
    fontFamily: "DMSans-Bold",
    textAlign: "center",
    fontSize: 15,
  },
});

export default DownloadButton;
