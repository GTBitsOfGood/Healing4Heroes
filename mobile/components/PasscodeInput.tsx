import React, { useRef, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

export default function PasscodeInput(props: any) {
  const [passcode, setPasscode] = useState<Array<string>>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const two = useRef(null);
  const three = useRef(null);
  const four = useRef(null);
  const five = useRef(null);
  const six = useRef(null);

  const setAndJump = (
    ref: React.MutableRefObject<null>,
    index: number,
    value: string
  ) => {
    passcode[index] = value;
    setPasscode(passcode);
    if (value !== "") {
      (ref.current as any).focus();
    }

    if (props.callbackFunction) {
      props.callbackFunction(passcode.join(""));
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        maxLength={1}
        keyboardType="numeric"
        style={[styles.digit, styles.rightMargin]}
        onChangeText={(value) => {
          setAndJump(two, 0, value);
        }}
      />
      <TextInput
        ref={two}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.digit, styles.rightMargin]}
        onChangeText={(value) => {
          setAndJump(three, 1, value);
        }}
      />
      <TextInput
        ref={three}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.digit, styles.rightMargin]}
        onChangeText={(value) => {
          setAndJump(four, 2, value);
        }}
      />
      <TextInput
        ref={four}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.digit, styles.rightMargin]}
        onChangeText={(value) => {
          setAndJump(five, 3, value);
        }}
      />
      <TextInput
        ref={five}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.digit, styles.rightMargin]}
        onChangeText={(value) => {
          setAndJump(six, 4, value);
        }}
      />
      <TextInput
        ref={six}
        maxLength={1}
        keyboardType="numeric"
        style={[styles.digit]}
        onChangeText={(value) => {
          setAndJump(six, 5, value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  digit: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    textAlign: "center",
    borderColor: "#3F3BED",
    borderWidth: 1,
    fontFamily: "DMSans-Bold",
    fontSize: 15,
  },
  rightMargin: {
    marginRight: 0,
  },
});
