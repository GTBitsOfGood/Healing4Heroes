import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from "react-native";
import LogCard from "../../components/LogCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { userGetUserInfo } from "../../actions/User";
import { Role } from "../../utils/types";
import { getFile, getVideo } from "../../utils/storage";
import { ResizeMode, Video } from "expo-av";
import GenericHeader from "../../components/GenericHeader";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import BubbleList from "../../components/BubbleList";
import { getFormattedDate } from "../../utils/helper";

export default function ViewSingleLogScreen(props: any) {
  const {
    date,
    skills,
    trainingHours,
    behavior,
    description,
    behaviorNote,
    video,
    videoThumbnail,
  } = props.route.params;

  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  useEffect(() => {
    async function loadLogInformation() {
      const user = await userGetUserInfo();
      if (user.roles?.includes(Role.NONPROFIT_ADMIN)) {
        if (video) {
          const videoLog = await getVideo(video);
          setVideoUrl(videoLog);
        }
      } else {
        if (videoThumbnail) {
          const thumbnail = (await getFile(videoThumbnail)) as string;
          setThumbnailUrl(thumbnail);
        }
      }
    }
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.goBack();
      return true;
    });
    loadLogInformation().then().catch();
  }, []);

  return (
    <BaseOverlay
      header={
        <GenericHeader
          headerTitle={getFormattedDate(new Date(date))}
          navigationProp={props.navigation}
        />
      }
      body={
        <Pressable>
          <View style={styles.container}>
            {videoUrl && (
              <Video
                style={styles.animalCard}
                source={{
                  uri: videoUrl,
                }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                isLooping
              />
            )}
            {thumbnailUrl && (
              <View style={styles.animalCard}>
                <Image
                  style={styles.thumbnailCard}
                  source={{
                    uri: thumbnailUrl,
                  }}
                />
              </View>
            )}
            {!thumbnailUrl && !videoUrl && (
              <View style={styles.animalCard}>
                <FontAwesome5 name="dog" size={50} color="black" />
                <Text style={styles.videoText}>Video Unavailable</Text>
              </View>
            )}
            <LogCard
              date={date}
              skills={skills}
              trainingHours={trainingHours}
              behaviors={behavior}
            />
            <View style={styles.bubbleCard}>
              <Text style={[styles.regularText, { marginBottom: 5 }]}>
                Skills
              </Text>
              <BubbleList items={skills}></BubbleList>
              <Text style={[styles.regularText, { marginBottom: 5 }]}>
                Behavior
              </Text>
              <BubbleList items={behavior}></BubbleList>
            </View>

            {behaviorNote && (
              <View style={styles.textCard}>
                <Text style={[styles.regularText, { marginBottom: 5 }]}>
                  Behavior
                </Text>
                <Text style={styles.regularText}>{behaviorNote}</Text>
              </View>
            )}
            {description && (
              <View style={styles.textCard}>
                <Text style={[styles.regularText, { marginBottom: 5 }]}>
                  Additional Notes
                </Text>
                <Text style={styles.regularText}>{description}</Text>
              </View>
            )}
          </View>
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
  },
  top: {
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
    marginBottom: 74,
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginBottom: 26,
    borderRadius: 12,
    height: 186,
    alignItems: "center",
    justifyContent: "center",
  },
  textCard: {
    flexDirection: "column",
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
  },
  bubbleCard: {
    flexDirection: "column",
    backgroundColor: "white",
    marginVertical: 8,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
  },

  videoText: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "DMSans-Regular",
  },
  thumbnailCard: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  regularText: {
    fontFamily: "DMSans-Regular",
  },
});
