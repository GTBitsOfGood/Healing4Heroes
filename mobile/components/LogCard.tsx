import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BehaviorTypes } from "../utils/types";
import shadowStyle from "../utils/styles"

interface LogCardProps {
  date: Date;
  skills: Array<string>;
  behaviors: Array<BehaviorTypes>;
  trainingHours: number;
  showDetailed?: boolean;
}
export default function LogCard({
  date,
  skills,
  trainingHours,
  behaviors,
  showDetailed,
}: LogCardProps) {
  const [processedDate, setProcessedDate] = useState<Date | null>();
  useEffect(() => {
    setProcessedDate(new Date(date));
  }, []);

  return (
    <View style={[styles.card, shadowStyle.shadow]}>
      <View style={styles.cardRow}>
        <Text style={styles.regularText}>Date</Text>
        <Text style={styles.regularText}>{`${(processedDate?.getMonth() as number) + 1
          }/${processedDate?.getDate()}/${processedDate?.getFullYear()}`}</Text>
      </View>
      {showDetailed && (
        <View style={styles.cardRow}>
          <Text style={styles.regularText}>Skill</Text>
          <ScrollView
            style={styles.skills}
            contentContainerStyle={styles.skillsContent}
            horizontal={true}
          >
            {skills.map((skill: string, index: number) => {
              return (
                <View style={styles.cardValue} key={index}>
                  <Text style={styles.bubbleText}>{skill}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
      {showDetailed && (
        <View style={styles.cardRow}>
          <Text style={styles.regularText}>Negative Behaviors</Text>
          <ScrollView
            style={styles.skills}
            contentContainerStyle={styles.skillsContent}
            horizontal={true}
          >
            {behaviors.map((behavior: string, index: number) => {
              return (
                <View style={styles.cardValue} key={index}>
                  <Text style={styles.bubbleText}>{behavior}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
      <View style={styles.cardRow}>
        <Text style={styles.regularText}>Training Hours</Text>
        <View style={styles.cardValue}>
          <Text style={styles.bubbleText}>{`${trainingHours} Hour${trainingHours == 1 ? "" : "s"
            }`}</Text>
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
    marginVertical: 8,
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  regularText: {
    fontFamily: "DMSans-Regular",
  },
  cardRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
  },
  cardValue: {
    backgroundColor: "#E6E6FA",
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
    justifyContent: "flex-end",
  },
  bubbleText: {
    color: "#3F3BED",
    fontFamily: "DMSans-Regular",
  },
});
