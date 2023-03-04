import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View, Text, Dimensions } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryGroup,
  VictoryArea,
} from "victory-native";
import { Screens } from "../../utils/types";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import ErrorBox from "../../components/ErrorBox";
import GenericHeader from "../../components/GenericHeader";
import { VictoryLegend, VictoryPie } from "victory-native";

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
  const [completedUsers, setCompletedUsers] = useState(0);
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });
    setCompletedUsers(fakeData.usersCompletedTraining);
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
  const tickValuesArray: number[] = [];
  for (let i = 0; i < fakeData.cumulativeTrainingHours.length; i++) {
    maxdata.push(Math.max(...fakeData.cumulativeTrainingHours));
  }
  for (
    let i = 0;
    i <= Math.max(...fakeData.cumulativeTrainingHours);
    i += 100
  ) {
    tickValuesArray.push(i);
  }

  return (
    <BaseOverlay
      header={
        <GenericHeader
          headerTitle="Analytics Dashboard"
          navigationProp={props.navigation}
        />
      }
      body={
        <View>
          <View style={styles.totalUsers}>
            <Text style={styles.smallBlueText}>Total Users: </Text>
            <Text style={styles.bigBlueText}>{fakeData.totalUsers}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.analyticsContainer}>
              <Text style={styles.boxTitle}>Active Users</Text>
              <View style={styles.sideBySideText}>
                <Text style={styles.bigBlueText}>{fakeData.activeUsers}</Text>
                <Text style={styles.mediumGrayText}>
                  /{fakeData.totalUsers}
                </Text>
              </View>
              <View style={styles.bottomRightText}>
                <Text style={styles.bottomRightTextFont}>Last two weeks</Text>
              </View>
            </View>

            <View style={styles.graphContainer}>
              <Text style={styles.boxTitle}>Negative Behavior</Text>
              <View style={styles.chart}>
                <VictoryChart
                  height={130}
                  width={200}
                  domain={{
                    y: [
                      Math.min(...fakeData.negativeBehaviorLogGraph) - 2,
                      Math.max(...fakeData.negativeBehaviorLogGraph) + 2,
                    ],
                  }}
                >
                  <VictoryArea
                    interpolation="natural"
                    style={{
                      data: {
                        stroke: "blue",
                        strokeWidth: 2,
                        fill: "#0000FF10",
                      },
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
          <View style={styles.pieChartContainer}>
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
              x={90}
              y={0}
              height={50}
              orientation="horizontal"
              gutter={20}
              style={{
                title: { fontSize: 0 },
                labels: {
                  fill: "#868686",
                  fontWeight: 600,
                },
              }}
              data={[
                { name: "Uncompleted", symbol: { fill: "#403bf6" } },
                { name: "Completed", symbol: { fill: "#d0ceed" } },
              ]}
            />
          </View>
          <View style={{ marginTop: 15, marginBottom: 8 }}>
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
                    stroke: "transparent",
                  },
                  ticks: { stroke: "transparent" },
                  tickLabels: {
                    fontSize: 7,
                    fill: "#A1A6AB",
                  },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickValues={tickValuesArray}
                orientation="left"
                style={{
                  axis: {
                    stroke: "transparent",
                  },
                  grid: {
                    stroke: "transparent",
                  },
                  ticks: { stroke: "transparent" },
                  tickLabels: { fontSize: 10, fill: "#A1A6AB" },
                }}
              />
              <VictoryGroup>
                <VictoryBar
                  style={{ data: { fill: "#D3D3D3" } }}
                  barWidth={5}
                  alignment="start"
                  cornerRadius={{ top: 3, bottom: 3 }}
                  data={maxdata}
                  labelComponent={
                    <VictoryLabel y={250} verticalAnchor={"start"} />
                  }
                />
                <VictoryBar
                  style={{ data: { fill: "blue" } }}
                  barWidth={5}
                  alignment="start"
                  cornerRadius={{ top: 3, bottom: 3 }}
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
    flexDirection: "row",
  },
  analyticsContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    height: 120,
    flexDirection: "column",
  },
  subtitle: {
    fontSize: 15,
    color: "#9eb3bf",
    fontWeight: "500",
  },
  graphContainer: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#fff",
    height: 120,
    flexDirection: "column",
  },
  boxTitle: {
    fontFamily: "DMSans-Bold",
    color: "grey",
    fontSize: 12,
    justifyContent: "flex-start",
  },
  sideBySideText: {
    paddingTop: 10,
    flexDirection: "row",
  },
  bigBlueText: {
    fontFamily: "DMSans-Bold",
    color: "blue",
    fontSize: 24,
    justifyContent: "flex-start",
  },
  mediumGrayText: {
    fontFamily: "DMSans-Bold",
    color: "grey",
    fontSize: 18,
    justifyContent: "flex-start",
    paddingTop: 5,
    bottom: 0,
    right: 0,
  },
  bottomRightText: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  bottomRightTextFont: {
    fontFamily: "DMSans",
    color: "grey",
    fontSize: 11,
  },
  chart: {
    alignItems: "center",
    margin: 0,
    justifyContent: "flex-start",
    bottom: 0,
  },
  box: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 10,
    width: Dimensions.get("window").width - 75,
  },
  title: {
    fontFamily: "DMSans-Bold",
    fontSize: 16,
    fontWeight: "800",
    color: "#727272",
  },
  pieChartContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 3,
    padding: 10,
    borderRadius: 20,
  },
  smallBlueText: {
    color: "blue",
    fontWeight: "600",
  },
  totalUsers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
});
