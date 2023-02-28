import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View, Text } from "react-native";
import { Screens } from "../../utils/types";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import ErrorBox from "../../components/ErrorBox";
import GenericHeader from "../../components/GenericHeader";
import { VictoryPie } from "victory-native";

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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });
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
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.title}>Users Who Completed Training</Text>
            <Text style={styles.subtitle}>800 hours</Text>
          </View>
          <VictoryPie
            name={"Hi"}
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 },
            ]}
            width={370}
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
    margin: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#727272",
  },
  subtitle: {
    fontSize: 15,
    color: "#9eb3bf",
    fontWeight: "500",
  },
});
