import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const HeaderDate = () => {
  const [currentDate, setcurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    setcurrentDate(day + "-" + month + "-" + year);
  }, []);

  return (
    <View>
      <Text style={styles.dateText}>{currentDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dateText: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
    marginBottom: 20,
  },
});

export default HeaderDate;
