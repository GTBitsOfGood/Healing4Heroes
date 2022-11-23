import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import StepOverlay from "../../components/Overlays/StepOverlay";

export default function BaseOverlayExample(props: { navigation: any }) {
  const [disableButton, setDisableButton] = useState(false);
  return (
    // Uses Base Overlay
    <StepOverlay
      circleCount={2}
      numberSelected={2}
      headerName={"Hello World"}
      error={""}
      navigationProp={props.navigation}
      buttonFunction={undefined}
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
    paddingHorizontal: 34,
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  button: {
    paddingVertical: 16,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#3F3BED",
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
  iconCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    backgroundColor: "#D9D9D9",
  },
  selected: {
    backgroundColor: "#666666",
  },
  failedContainer: {
    marginTop: 12,
    alignItems: "center",
    marginBottom: 12,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: "85%",
    backgroundColor: "#FF8E8E50",
    borderColor: "#C63636",
  },
  failedText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#C63636",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
