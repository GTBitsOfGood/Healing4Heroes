import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const IconButton = (props: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (props.callbackFunction) {
          await props.callbackFunction();
        }
      }}
      style={styles.button}
    >
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
