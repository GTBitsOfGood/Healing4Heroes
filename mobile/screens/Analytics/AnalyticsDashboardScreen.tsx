import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View, Text } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryGroup,
} from "victory-native";
import { Screens } from "../../utils/types";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import ErrorBox from "../../components/ErrorBox";
import GenericHeader from "../../components/GenericHeader";

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

  const month: string[] = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const maxdata: number[] = [0];
  for (let i = 0; i < fakeData.cumulativeTrainingHours.length; i++) {
    maxdata.push(Math.max(...fakeData.cumulativeTrainingHours));
  }

  return (
    <BaseOverlay
      header={
        <GenericHeader
          headerTitle="Analytics"
          navigationProp={props.navigation}
        />
      }
      body={
        <View style={styles.container}>
          <View style={{ alignItems: "flex-end", marginVertical: 10 }}>
            <Text style={styles.title}>Cumulative Training Hours</Text>
          </View>

          <View style={styles.box}>
            <VictoryChart
              padding={{ top: 30, bottom: 30, left: 40, right: 90 }}
              domainPadding={{ x: 20 }}
              theme={VictoryTheme.material}
              height={250}
            >
              <VictoryAxis
                domain={{ x: [0, 12] }}
                style={{
                  axis: {
                    stroke: "white",
                  },
                  ticks: { stroke: "white", size: 5 },
                  tickLabels: {
                    fontSize: 7,
                  },
                }}
              />
              <VictoryAxis
                dependentAxis
                orientation="left"
                style={{
                  axis: {
                    stroke: "white",
                  },
                  grid: {
                    stroke: "white",
                  },
                  ticks: { stroke: "white", size: 5 },
                  tickLabels: { fontSize: 10 },
                }}
              />
              <VictoryGroup>
                <VictoryBar
                  style={{ data: { fill: "#D3D3D3" } }}
                  barWidth={5}
                  alignment="start"
                  cornerRadius={{top:3, bottom:3}}
                  data={maxdata}
                  labelComponent={
                    <VictoryLabel y={250} verticalAnchor={"start"} />
                  }
                />
                <VictoryBar
                  style={{ data: { fill: "#0096FF" } }}
                  barWidth={5}
                  alignment="start"
                  cornerRadius={{top:3, bottom:3}}
                  data={month.map(function (e, i) {
                    return [e, fakeData.cumulativeTrainingHours[i]];
                  })}
                  x={0}
                  y={1}
                  labelComponent={
                    <VictoryLabel y={250} verticalAnchor={"start"} />
                  }
                />
              </VictoryGroup>
            </VictoryChart>
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
    alignItems: "flex-start",
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    width: 500,
  },
  box: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 10,
    width: 320
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#727272",
  }
});
