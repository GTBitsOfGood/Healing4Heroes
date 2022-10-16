import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface LogCardProps {
  date: Date,
  skills: Array<string>,
  trainingHours: number
}
export default function LogCard({
  date,
  skills,
  trainingHours
}: LogCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text>Date</Text>
        <Text>{`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text>Skill</Text>
        <ScrollView
          style={styles.skills}
          contentContainerStyle={styles.skillsContent}
          horizontal={true}
        >
          {skills.map((skill: string) => {
            return (
              <View style={styles.cardValue}>
                <Text>{skill}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.cardRow}>
        <Text>Training Hours</Text>
        <View style={styles.cardValue}>
          <Text>{`${trainingHours} Hour${trainingHours == 1 ? '' : 's'}`}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: "white",
    marginHorizontal: 40,
    marginVertical: 8,
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  cardRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
  },
  cardValue: {
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 16,
    paddingVertical: 1,
    borderRadius: 20,
    marginLeft: 5,
  },
  skills: {
    maxWidth: 100,
  },
  skillsContent: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});