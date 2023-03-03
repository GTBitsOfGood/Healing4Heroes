import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View, Text } from "react-native";
import { Screens } from "../../utils/types";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import ErrorBox from "../../components/ErrorBox";
import GenericHeader from "../../components/GenericHeader";
import { VictoryAxis, VictoryLine, VictoryChart } from "victory-native";

export default function AnalyticsDashboardScreen(props: any) {
  const [error, setError] = useState("");

  const fakeData = {
    totalUsers: 150,
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
          headerTitle="Analytics Dashboard"
          navigationProp={props.navigation}
        />
      }
      body={
        <View style={styles.container}>
          <View style={styles.analyticsContainer}>
            <Text style={styles.boxTitle}>Active Users</Text>
            <View style={styles.sideBySideText}>
              <Text style={styles.bigBlueText}>{fakeData.activeUsers}</Text>
              <Text style={styles.mediumGrayText}>/{fakeData.totalUsers}</Text>
            </View>
            <View style={styles.bottomRightText}>
              <Text style={styles.bottomRightTextFont}>Last two weeks</Text>
            </View>
          </View>

          <View style={styles.graphContainer}>
            <Text style={styles.boxTitle}>Negative Behavior</Text>
            <View>
              <VictoryChart
                height={140}
                width={200}
                domain={{
                  y: [
                    Math.min(...fakeData.negativeBehaviorLogGraph) - 2,
                    Math.max(...fakeData.negativeBehaviorLogGraph) + 2,
                  ],
                }}
              >
                <VictoryLine
                  interpolation="natural"
                  style={{
                    data: { stroke: "blue" },
                  }}
                  data={fakeData.negativeBehaviorLogGraph}
                />
                <VictoryAxis
                  style={{
                    axis: { stroke: "transparent" },
                    ticks: { stroke: "transparent" },
                    tickLabels: { fill: "transparent" },
                    grid: { stroke: "transparent" },
                  }}
                />
              </VictoryChart>
            </View>
          </View>
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
    backgroundColor: "#f2f2f2",
    flexDirection: "row",
  },
  analyticsContainer: {
    flex: 1,
    marginRight: 3,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    height: 130,
    flexDirection: "column",
  },
  graphContainer: {
    flex: 1,
    marginLeft: 3,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    height: 130,
  },
  boxTitle: {
    fontFamily: "DMSans-Bold",
    color: "grey",
    fontSize: 10,
  },
  sideBySideText: {
    paddingTop: 10,
    flexDirection: "row",
  },
  bigBlueText: {
    fontFamily: "DMSans-Bold",
    color: "blue",
    fontSize: 22,
    justifyContent: "flex-start",
  },
  mediumGrayText: {
    fontFamily: "DMSans-Bold",
    color: "grey",
    fontSize: 16,
    justifyContent: "flex-start",
    paddingTop: 5,
    bottom: 0,
    right: 0,
  },
  bottomRightTextFont: {
    fontFamily: "DMSans",
    color: "grey",
    fontSize: 7,
    marginTop: 45,
    marginLeft: 40,
  },
});
