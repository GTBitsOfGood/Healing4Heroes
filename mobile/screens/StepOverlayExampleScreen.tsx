import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StepOverlay from "../components/StepOverlay";

export default function StepOverlayExampleScreen() {
  return (
    <StepOverlay
      circleCount={3}
      numberSelected={3}
      buttonFunction={() => {
        console.log("Hello World");
      }}
      error=""
      headerName="Example Overlay Page"
      pageBody={
        <View>
          {[...Array(100).keys()].map((i) => (
            <Text key={i}>Hello World</Text>
          ))}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
  },
  label: {
    marginTop: 60,
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  dropDownContainer: {
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    paddingHorizontal: 6,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#666666",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  circles: {
    marginTop: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 3,
  },
  selected: {
    backgroundColor: "#666666",
  },
  optional: {
    color: "#999999",
    fontWeight: "normal",
    fontSize: 14,
  },
  datePicker: {
    alignSelf: "flex-start",
  },
  failedContainer: {
    marginTop: 12,
    alignItems: "center",
    marginBottom: 12,
    padding: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    minWidth: "85%",
    backgroundColor: "#D9D9D9",
  },
  failedText: {
    fontSize: 12,
    fontWeight: "300",
  },
});
