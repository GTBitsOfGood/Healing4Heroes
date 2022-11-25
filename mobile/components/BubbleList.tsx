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
            <View style={styles.bubble}>
              <Text key={index} style={styles.bubbleText}>
                {item}
              </Text>
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
    backgroundColor: "transparent",
    flexDirection: "column",
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  bubbleContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bubbleText: {
    color: "blue",
  },
  bubble: {
    backgroundColor: "#E6E6FA",
    color: "blue",
    marginRight: 10,
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
});
