import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory';
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

  const month: string[] = [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  
  return (
    <BaseOverlay
      header={
        <GenericHeader
          headerTitle="Analytics"
          navigationProp={props.navigation}
        />
        
      }
      body={
      <div> 
          <View style={styles.container}>
        <VictoryChart
        padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
        domainPadding={{ x: 20 }}
        theme={VictoryTheme.material}
        height={250}
        >
        <VictoryAxis

          domain={{x: [0, 12]}}
            style={{
              tickLabels: {
                fontSize: 10
              }
            }}
          />
          <VictoryAxis
            dependentAxis

            domain={{x: [0, 700]}}
            orientation="left"
            style={{ tickLabels: { fontSize: 10 } }}
          />
        <VictoryBar
          style={{ data: { fill: "#00FFFF" }}}
          barWidth={5}
          alignment="start"

          data={month.map(function(e, i) {
            return [e, fakeData.cumulativeTrainingHours[i]];
          })}
          x={0}
          y={1}

          labelComponent={<VictoryLabel y={250} verticalAnchor={"start"} />}

        />
      </VictoryChart>
      </View>

        
        

      </div>
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
    width: 400
  }
});
