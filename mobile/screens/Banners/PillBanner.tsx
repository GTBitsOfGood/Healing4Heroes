import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import shadowStyle from '../../utils/styles';

const PillBanner = () => {
  return (
    <View style={[styles.pillBanner, shadowStyle.shadow]}>
        <Text style={styles.title}>Pill Reminder</Text>
        <Text style={styles.text}>
            Monthly reminder to get your pup their heartworm preventative and flea intake pill.
        </Text>
        <MaterialCommunityIcons
            name="bug"
            size={20}
            color={"grey"}
            style={styles.icon}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    pillBanner: {
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: "white",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 5,
        opacity: 0.9
      },
      title: {
        color: "black",
        fontSize: 14,
        fontWeight: "700",
        textAlign: "center"
      },
      text: {
        color: "black",
        fontSize: 12,
        fontWeight: "400",
        textAlign: "center"
      },
      icon: {
        color: "black",
        fontSize: 20,
        fontWeight: "400",
        margin: "auto"
      }
});

export default PillBanner;
