import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const HeaderDate = (prop: any) => {
  const [currentDate, setcurrentDate] = useState("");

  useEffect(() => {
    var date = new Date();
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();

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
