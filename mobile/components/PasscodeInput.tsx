import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
export default function PasscodeInput() {
    const [passcode, setPasscode] = useState<Array<string>>(['','','','','','']);
    return (
    <View style={styles.container}>
      <TextInput style={styles.passcodeDigit}/>
      <TextInput style={styles.passcodeDigit}/>
      <TextInput style={styles.passcodeDigit}/>
      <TextInput style={styles.passcodeDigit}/>
      <TextInput style={styles.passcodeDigit}/>
      <TextInput style={styles.passcodeDigit}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  passcodeDigit: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#D9D9D9",
    borderRadius: 10
  },
});
