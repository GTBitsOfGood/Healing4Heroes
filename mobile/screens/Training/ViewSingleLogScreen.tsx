import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LogCard from "../../components/LogCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function ViewSingleLogScreen(props: any) {
  const { date, skills, trainingHours, behavior, description } =
    props.route.params;

  const [processedDate, setProcessedDate] = useState<Date | null>();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.goBack();
      return true;
    });

    setProcessedDate(new Date(date));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* Invisible edit for positioning purposes */}
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
        </TouchableOpacity>
        <Text style={styles.header}>
          {`${processedDate?.getMonth()}-${processedDate?.getDate()}-${processedDate?.getFullYear()}`}
        </Text>
        {/* <Text style={styles.edit}>Edit</Text> */}
        <TouchableOpacity
        // onPress={() => props.navigation.navigate("View All Logs Screen")}
        >
          <Feather name="edit-3" size={22} color="grey" />
        </TouchableOpacity>
      </View>
      <View style={styles.animalCard}>
        <FontAwesome5 name="dog" size={50} color="black" />
        <Text style={styles.videoText}>
          Video Logs are Only Available to Nonprofit Admins
        </Text>
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
    fontFamily: "DMSans-Regular",
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
  videoText: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "DMSans-Regular",
  },
});
