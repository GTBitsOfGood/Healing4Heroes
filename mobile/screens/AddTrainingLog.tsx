import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderDate from "../components/HeaderDate";

export default function AddTrainingLogScreen(props: any) {
  const [totalHours, setTotalHours] = useState("");
  const [skills, setSkills] = useState([
    { id: 1, skill: "post", selected: "false" },
    { id: 2, skill: "heel", selected: "false" },
    { id: 3, skill: "jump", selected: "false" },
  ]);
  const [error, setError] = useState("");
  const [skillsPlayed, setSkillPlayed] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <HeaderDate />
        <View>
          <View>
            <Text style={styles.label}>Total hrs*</Text>
            <TextInput style={styles.input} onChangeText={setTotalHours} />
          </View>
          <View>
            <Text style={styles.label}>Note</Text>
            <TextInput style={styles.input} />
          </View>
          <View>
            <Text style={styles.label}>Skill Played*</Text>
            <FlatList
              horizontal
              data={skills}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.multiSelectButton}
                  onPress={() => {
                    setSkillPlayed(item.skill);
                  }}
                >
                  <Text>{item.skill}</Text>
                </TouchableOpacity>
              )}
            ></FlatList>
          </View>
          <View>
            <Text style={styles.label}>Behavior Note</Text>
            <TextInput style={styles.behaviorInput} placeholder="Note" />
          </View>
        </View>
      </View>
      <View>
        {error && (
          <View style={styles.failedContainer}>
            <Text style={styles.failedText}>{error}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!totalHours) {
              setError("Please enter your total hours.");
            } else if (!skillsPlayed) {
              setError("Please select at least one skill played.");
            } else {
              setError("");
              props.navigation.navigate("Upload Video Log");
            }
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.circles}>
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
    justifyContent: "space-between",
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
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  buttonRowContainer: {
    flexDirection: "row",
  },
  multiSelectButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 45,
    borderRadius: 8,
    margin: 10,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    marginBottom: 0,
  },
  behaviorInput: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 90,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    alignContent: "center",
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
});
