import React, { useEffect } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import LogCard from "../../components/LogCard";
import { Screens } from "../../utils/types";
import GenericHeader from "../../components/GenericHeader";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import shadowStyle from "../../utils/styles";

export default function ViewAllLogsScreen(props: any) {
  const logs = props?.route?.params?.trainingLogs;
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.goBack();
      return true;
    });
  }, []);
  return (
    <BaseOverlay
      header={
        <GenericHeader
          navigationProp={props.navigation}
          headerTitle={"View All Training Logs"}
        />
      }
      body={
        <View>
          {logs?.map((log: any, index: number) => {
            return (
              <TouchableOpacity
                style={shadowStyle.shadow}
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
                  showDetailed={true}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      }
    />
  );
}
