import React from "react";
import { Text, View } from "react-native";
import StepOverlay from "../../components/Overlays/StepOverlay";

export default function StepOverlayExampleScreen() {
  return (
    <StepOverlay
      circleCount={3}
      numberSelected={3}
      buttonFunction={() => {
        console.log("Hello World");
      }}
      error=""
      headerTitle="Example Overlay Page"
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
