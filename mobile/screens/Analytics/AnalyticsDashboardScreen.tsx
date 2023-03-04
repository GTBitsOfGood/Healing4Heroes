import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View, Text, Platform } from "react-native";
import { Screens } from "../../utils/types";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import ErrorBox from "../../components/ErrorBox";
import GenericHeader from "../../components/GenericHeader";
import { VictoryLegend, VictoryPie } from "victory-native";

export default function AnalyticsDashboardScreen(props: any) {
  const [error, setError] = useState("");

  const fakeData = {
    totalUsers: 148,
    activeUsers: 27,
    negativeBehaviorLogGraph: [10, 2, 3, 4, 7, 9, 20, 9, 0, 1, 2, 3, 1],
    usersCompletedTraining: 16,
    cumulativeTrainingHours: [
      10, 20, 40, 30, 50, 60, 10, 90, 100, 250, 400, 600,
    ],
  };
  const [completedUsers, setCompletedUsers] = useState(0);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });
    setCompletedUsers(fakeData.usersCompletedTraining);
  }, []);

  return (
    <BaseOverlay
      header={
        <GenericHeader
          headerTitle='Analytics'
          navigationProp={props.navigation}
        />
      }
      body={
        <View style={styles.container}>
          <View style={{ alignItems: "flex-end", marginBottom: -60 }}>
            <Text style={styles.title}>Users Who Completed Training</Text>
            <Text style={styles.subtitle}>800 hours</Text>
          </View>
          <VictoryPie
            name={"Hi"}
            startAngle={(completedUsers / fakeData.totalUsers) * 360}
            endAngle={(completedUsers / fakeData.totalUsers) * 360 + 360}
            animate={{
              duration: 500,
            }}
            data={[
              { x: "Completed", y: completedUsers },
              { x: "Not Done", y: fakeData.totalUsers },
            ]}
            width={350}
            height={400}
            style={{
              labels: { display: "none" },
              parent: {
                marginBottom: -70,
              },
            }}
            colorScale={["#d0ceed", "#403bf6"]}
          />
          <VictoryLegend
            x={118}
            y={0}
            height={50}
            centerTitle
            orientation='horizontal'
            gutter={20}
            style={{
              title: { fontSize: 0 },
              labels: {
                fill: "#868686",
                fontWeight: 600,
              },
            }}
            data={[
              { name: "Not yet", symbol: { fill: "#403bf6" } },
              { name: "Completed", symbol: { fill: "#d0ceed" } },
            ]}
          />
        </View>
      }
      footer={<ErrorBox errorMessage={error} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 6,
    marginBottom: 9,
    padding: 10,
    ...(Platform.OS === "ios"
      ? {
          shadowOffset: { width: 0, height: 3 },
          shadowColor: "gray",
          shadowOpacity: 1,
        }
        :
        { elevation: 5 }),
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#727272",
  },
  subtitle: {
    fontSize: 15,
    color: "#9eb3bf",
    fontWeight: "500",
  },
});
