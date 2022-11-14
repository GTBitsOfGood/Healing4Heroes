import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, BackHandler } from "react-native";
import LogCard from "../../components/LogCard";
import { Screens } from "../../utils/types";
import UserOverlay from "../../components/Overlays/UserOverlay";

export default function ViewAllLogsScreen(props: any) {
  const logs = props?.route?.params?.trainingLogs;
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.goBack();
      return true;
    });
  }, []);
  return (
    <UserOverlay
      noPaginatedButtons={true}
      headerTitle={"View All Training Logs"}
      navigationProp={props.navigation}
      pageBody={
        <View>
          {logs?.map((log: any, index: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(Screens.VIEW_SINGLE_LOG_SCREEN, {
                    date: log.date,
                    skills: log.skills,
                    trainingHours: log.trainingHours,
                    behavior: log.behavior,
                    behaviorNote: log.behaviorNote,
                    description: log.description,
                    video: log.video,
                    videoThumbnail: log.videoThumbnail,
                  });
                }}
                key={index}
              >
                <LogCard
                  date={log.date}
                  skills={log.skills}
                  trainingHours={log.trainingHours}
                  behaviors={log.behavior}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      }
    />
    // <View style={styles.container}>
    //   <View style={styles.headerContainer}>
    //           <IconButton
    //         icon={
    //           <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
    //         }
    //         callbackFunction={() => {
    //             props.navigation.goBack();
    //         }}
    //       ></IconButton>

    //   <Text style={styles.header}>Training Log Overview</Text>
    //   </View>
    //   <ScrollView>
    // {logs?.map((log: any, index: number) => {
    //   return (
    //     <TouchableOpacity
    //       onPress={() => {
    //         props.navigation.navigate(Screens.VIEW_SINGLE_LOG_SCREEN, {
    //           date: log.date,
    //           skills: log.skills,
    //           trainingHours: log.trainingHours,
    //           behavior: log.behavior,
    //           behaviorNote: log.behaviorNote,
    //           description: log.description,
    //           video: log.video,
    //           videoThumbnail: log.videoThumbnail,
    //         });
    //       }}
    //       key={index}
    //     >
    //       <LogCard
    //         date={log.date}
    //         skills={log.skills}
    //         trainingHours={log.trainingHours}
    //         behaviors={log.behavior}
    //       />
    //     </TouchableOpacity>
    //   );
    // })}
    //   </ScrollView>
    // </View>
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
  headerContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
