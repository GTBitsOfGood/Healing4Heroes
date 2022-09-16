import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Keyboard } from "react-native";

const dropDownItems = [
  {label: "Veteran", value: "veteran"},
  {label: "Civilian", value: "civilian"},
  {label: "Child", value: "child"},
  {label: "Volunteer, etc", value: "volunteer"},
];

function updateDatabase() {

}

export default function HandlerInformationScreen(props: any) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Getting Started</Text>
        <Text style={styles.label}>What is your name? *</Text>
        <TextInput
          style={styles.input}
          placeholder="First / Last Name"
          placeholderTextColor="#999999"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>What describes you best? *</Text>
        <DropDownPicker 
          open={dropDownOpen}
          setOpen={setDropDownOpen}
          items={dropDownItems}
          value={dropDownValue}
          setValue={setDropDownValue}
          style={styles.input}
          dropDownContainerStyle={styles.dropDownContainer}
          onOpen={() => {
            Keyboard.dismiss();
          }}
        />
      </View>
      <View>
        { error && 
          <View style={styles.failedContainer}>
            <Text style={styles.failedText}>{ error }</Text>
          </View>
        }
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {
            if (!name) {
              setError("Please enter your name.");
            } else if (!dropDownValue) {
              setError("Please choose what describes you best.");
            } else {
              setError("");
              updateDatabase();
              props.navigation.navigate("Animal Information", {
                params: {
                  handlerName: name,
                  handlerRole: dropDownValue,
                }
              });
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.circles}>
          <View style={[styles.circle, styles.selected]} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingVertical: 40,
    paddingHorizontal: 24,
    // fontFamily: "DM Sans"
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666",
  },
  label: {
    marginTop: 60,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
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
    backgroundColor: "#666666"
  },
  failedContainer: {
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
