import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
interface DateInputProps {
  autofill: boolean;
  callbackFunction: (date: Date) => void;
}
export default function SolidDropDown({
  autofill,
  callbackFunction,
}: DateInputProps) {
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const dayRef = useRef(null);
  const yearRef = useRef(null);
  useEffect(() => {
    if (autofill) {
      const today = new Date();
      setMonth((today.getMonth() + 1).toString());
      setDay(today.getDay().toString());
      setYear(today.getFullYear().toString());
    }
  }, []);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.monthField}
        placeholder={"MM"}
        placeholderTextColor={"#999999"}
        textAlign={"center"}
        keyboardType="numeric"
        maxLength={2}
        value={month}
        onChangeText={(value) => {
          setMonth(value);
          if (value.length === 2 && dayRef?.current) {
            (dayRef.current as any).focus();
          }
          const monthIndex = parseInt(value) - 1;
          if (monthIndex > 11) {
            value = "12";
          } else if (monthIndex < 0 && value.length === 2) {
            value = "1";
          }
          setMonth(value);
          callbackFunction(
            new Date(parseInt(year), parseInt(value) - 1, parseInt(day))
          );
        }}
      />
      <TextInput
        style={styles.dayField}
        ref={dayRef}
        placeholder={"DD"}
        placeholderTextColor={"#999999"}
        textAlign={"center"}
        keyboardType="numeric"
        maxLength={2}
        value={day}
        onChangeText={(value) => {
          setDay(value);
          if (value.length === 2 && dayRef?.current) {
            (yearRef.current as any).focus();
          }

          let maxDays;
          if (month) {
            maxDays = new Date(
              new Date().getFullYear(),
              parseInt(month),
              0
            ).getDate();
          } else {
            maxDays = new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              0
            ).getDate();
          }

          const day = parseInt(value);
          if (day < 1 && value.length === 2) {
            value = "1";
          } else if (day > maxDays) {
            value = maxDays?.toString();
          }
          setDay(value);
          callbackFunction(
            new Date(parseInt(year), parseInt(month) - 1, parseInt(value))
          );
        }}
      />
      <TextInput
        style={styles.yearField}
        ref={yearRef}
        placeholder={"YYYY"}
        placeholderTextColor={"#999999"}
        textAlign={"center"}
        keyboardType="numeric"
        maxLength={4}
        value={year}
        onChangeText={(value) => {
          setYear(value);
          if (parseInt(value) < 0) {
            value = "0000";
          }
          callbackFunction(
            new Date(parseInt(value), parseInt(month) - 1, parseInt(day))
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  dayField: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  monthField: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  yearField: {
    flex: 2,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
});
