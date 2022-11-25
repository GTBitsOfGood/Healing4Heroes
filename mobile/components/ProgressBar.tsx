import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProgressBar = (props: any) => {
  return (
    <View style={styles.progressContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.regularText}>
          {props.complete}/{props.total}
        </Text>
        <Text style={styles.regularText}>{props.unit}</Text>
      </View>
      <View>
        <View style={styles.progressBar}>
          <View
            style={{
              position: "relative",
              padding: 1.5,
              width: props.filled,
              height: 1,
              backgroundColor: "#3F3BED",
              borderRadius: 10,
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 10,
  },

  progressBar: {
    marginTop: 10,
    padding: 1.5,
    height: 1,
    backgroundColor: "#A9A9A9",
    borderRadius: 10,
    justifyContent: "center",
  },
  regularText: {
    fontFamily: "DMSans-Regular",
  },

  progressBarFilled: {
    // position: "relative",
    // padding: 1.5,
    // width: 1,
    // height: 1,
    // backgroundColor: "blue",
    // borderRadius: 10,
  },
});

export default ProgressBar;
