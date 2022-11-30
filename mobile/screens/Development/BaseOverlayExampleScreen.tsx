import React from "react";
import { Text, View } from "react-native";
import StepOverlay from "../../components/Overlays/StepOverlay";

export default function BaseOverlayExample(props: { navigation: any }) {
  return (
    // Uses Base Overlay
    <StepOverlay
      circleCount={2}
      numberSelected={2}
      headerTitle={"Hello World"}
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
