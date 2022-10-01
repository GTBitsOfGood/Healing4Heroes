import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { userCreateAnimal } from "../actions/Animal";
import StepOverlay from "../components/StepOverlay";
import { validateBirthday } from "../utils/helper";
import { FontAwesome5 } from "@expo/vector-icons";
import DateInput from "../components/DateInput";

export default function AnimalInformationScreen(props: any) {
  const [animalName, setAnimalName] = useState("");
  const [animalBirth, setAnimalBirth] = useState<Date>();
  const [trainingClassDate, setTrainingClassDate] = useState<Date>();
  const [animalAdoption, setAnimalAdoption] = useState<Date>();
  const [error, setError] = useState("");

  const addAnimal = async () => {
    const animal = await userCreateAnimal(
      animalName,
      0,
      undefined,
      trainingClassDate,
      animalBirth,
      animalAdoption,
      undefined,
      undefined
    );

    return animal;
  };

  const submitAnimalInformation = async () => {
    if (!animalName) {
      setError("Please enter your dog's name.");
    } else if (animalBirth && !validateBirthday(animalBirth)) {
      setError("Animal birth date is invalid.");
    } else if (animalAdoption && !validateBirthday(animalAdoption)) {
      setError("Animal adoption date is invalid.");
    } else if (trainingClassDate && !validateBirthday(trainingClassDate)) {
      setError("Animal training class date is invalid.");
    } else {
      setError("");
      const result = await addAnimal();
      if (result) {
        props.navigation.navigate("User Dashboard");
      } else {
        setError("Failed to create service animal!");
      }
    }
  };
  return (
    <StepOverlay
      circleCount={3}
      numberSelected={2}
      headerName="Getting Started"
      buttonFunction={submitAnimalInformation}
      error={error}
      pageIcon={<FontAwesome5 name="dog" size={37.5} color="black" />}
      pageBody={
        <View style={styles.container}>
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
          <View style={styles.dateInput}>
            <DateInput
              autofill={false}
              callbackFunction={(newDate) => {
                setAnimalBirth(newDate);
              }}
            />
          </View>
          <Text style={styles.label}>
            Date of Adoption? <Text style={styles.optional}>(Optional)</Text>
          </Text>
          <View style={styles.dateInput}>
            <DateInput
              autofill={false}
              callbackFunction={(newDate) => {
                setAnimalAdoption(newDate);
              }}
            />
          </View>

          <Text style={styles.label}>
            Date of Training Class?{" "}
            <Text style={styles.optional}>(Optional)</Text>
          </Text>
          <View style={styles.dateInput}>
            <DateInput
              autofill={false}
              callbackFunction={(newDate) => {
                setTrainingClassDate(newDate);
              }}
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    marginTop: 20,
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
  },
  label: {
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    marginBottom: 40,
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
  dateInput: {
    marginBottom: 40,
  },
});
