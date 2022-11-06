import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BubbleListProps {
  items: string[];
}
export default function BubbleList({ items }: BubbleListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        {items.map((item, index) => {
          return (
            <View key={index} style={styles.bubble}>
              <Text style={styles.bubbleText}>{item}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  bubbleContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bubble: {
    backgroundColor: "#E6E6FA",
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },

  bubbleText: {
    color: "blue",
  },
});
