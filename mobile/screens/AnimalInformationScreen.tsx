import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { validateDate } from "../utils/string";

function updateDatabase() {
  return;
}

export default function AnimalInformationScreen(props: any) {
  const { handlerName, handlerRole } = props.route.params;

  const [animalName, setAnimalName] = useState("");
  const [animalBirth, setAnimalBirth] = useState("");
  const [animalAdoption, setAnimalAdoption] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Getting Started</Text>
        <Text style={styles.label}>What is your dog&apos;s name? *</Text>
        <TextInput
          style={styles.input}
          placeholder="First / Last Name"
          placeholderTextColor="#999999"
          value={animalName}
          onChangeText={setAnimalName}
        />
        <Text style={styles.label}>
          Date of Birth? <Text style={styles.optional}>(Optional)</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="MM-DD-YYYY"
          placeholderTextColor="#999999"
          value={animalBirth}
          onChangeText={setAnimalBirth}
        />
        <Text style={styles.label}>
          Date of Adoption? <Text style={styles.optional}>(Optional)</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="MM-DD-YYYY"
          placeholderTextColor="#999999"
          value={animalAdoption}
          onChangeText={setAnimalAdoption}
        />
      </View>
      <View style={{ flex: 1 }} />
      <View>
        {error && (
          <View style={styles.failedContainer}>
            <Text style={styles.failedText}>{error}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!animalName) {
              setError("Please enter your dog's name.");
            } else if (animalBirth && !validateDate(animalBirth)) {
              setError("Animal birth date is invalid.");
            } else if (animalAdoption && !validateDate(animalAdoption)) {
              setError("Animal adoption date is invalid.");
            } else {
              setError("");
              updateDatabase();

              props.navigation.navigate("User Dashboard");
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.circles}>
          <View style={[styles.circle, styles.selected]} />
          <View style={[styles.circle, styles.selected]} />
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
