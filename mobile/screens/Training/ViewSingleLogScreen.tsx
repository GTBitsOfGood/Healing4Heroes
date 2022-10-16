import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LogCard from "../../components/LogCard";
import { FontAwesome5 } from "@expo/vector-icons";

export default function ViewSingleLogScreen(props: any) {
  const { date, skills, trainingHours, behavior, description } =
    props.route.params;

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* Invisible edit for positioning purposes */}
        <Text style={{ ...styles.edit, color: "#f2f2f2" }}>Edit</Text>
        <Text style={styles.header}>
          {`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`}
        </Text>
        <Text style={styles.edit}>Edit</Text>
      </View>
      <View style={styles.animalCard}>
        <FontAwesome5 name="dog" size={50} color="black" />
      </View>
      <LogCard date={date} skills={skills} trainingHours={trainingHours} />
      <View style={styles.textCard}>
        <Text style={{ marginBottom: 5 }}>Behavior</Text>
        <Text>{behavior}</Text>
      </View>
      {description && (
        <View style={styles.textCard}>
          <Text style={{ marginBottom: 5 }}>Additional Notes</Text>
          <Text>{description}</Text>
        </View>
      )}
    </View>
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
  top: {
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
    marginBottom: 74,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    color: "#666666",
  },
  edit: {
    textAlign: "right",
    alignSelf: "flex-end",
    fontSize: 16,
    color: "#666666",
  },
  animalCard: {
    backgroundColor: "#D9D9D9",
    marginHorizontal: 40,
    marginBottom: 33,
    borderRadius: 12,
    height: 186,
    alignItems: "center",
    justifyContent: "center",
  },
  textCard: {
    flexDirection: "column",
    backgroundColor: "white",
    marginHorizontal: 40,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
  },
});
