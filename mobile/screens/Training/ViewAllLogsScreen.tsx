import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import LogCard from "../../components/LogCard";

export default function ViewAllLogsScreen(props: any) {

  const logs = props?.route?.params?.trainingLogs;
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.goBack();
      return true;
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Training Log Overview</Text>
      <ScrollView>
        {logs?.map((log: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("View Single Log Screen", {
                  date: log.date,
                  skills: log.skills,
                  trainingHours: log.trainingHours,
                  behavior: log.behavior,
                  description: log.description,
                });
              }}
              key={index}
            >
              <LogCard
                date={log.date}
                skills={log.skills}
                trainingHours={log.trainingHours}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
    marginBottom: 20,
  },
});
