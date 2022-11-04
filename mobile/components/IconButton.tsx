import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const IconButton = (props: any) => {
  return (
    <TouchableOpacity onPress={undefined} style={styles.button}>
      {props.icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 5,
  },
});

export default IconButton;
