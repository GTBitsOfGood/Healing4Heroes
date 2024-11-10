import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import dayjs from "dayjs";

const CampGraceBanner = () => {
    const isCampGraceDay = new Date().getMonth() === 3 && new Date().getDate() === 13;
    
    if (!isCampGraceDay) return null;

    return (
        <View style={styles.banner}>
        <Text style={styles.title}>Countdown to Camp Grace!</Text>
        <Text style={styles.message}>
            Get ready for a 4-Day advanced training at Camp Grace in Mobile, Alabama! Enjoy free cabin accommodations, fishing, kayaking, and group cooking sessions. Just bring bedding for a twin bed. See you soon!
        </Text>
        </View>
    );
};
  
const styles = StyleSheet.create({
  banner: {
    borderRadius: 10,
    backgroundColor: "#3F3BED",
    marginBottom: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    opacity: 0.9,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  message: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  }
});

export default CampGraceBanner;
