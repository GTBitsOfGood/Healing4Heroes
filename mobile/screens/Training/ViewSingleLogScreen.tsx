import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View, Image } from "react-native";
import LogCard from "../../components/LogCard";
import { FontAwesome5 } from "@expo/vector-icons";
import { userGetUserInfo } from "../../actions/User";
import { Role } from "../../utils/types";
import { getFile, getVideo } from "../../utils/storage";
import { ResizeMode, Video } from "expo-av";
import IconButton from "../../components/IconButton";
import { Ionicons } from "@expo/vector-icons";

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

  const [processedDate, setProcessedDate] = useState<Date | null>();
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
    setProcessedDate(new Date(date));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* Invisible edit for positioning purposes */}
        <IconButton
          icon={
            <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
          }
          callbackFunction={() => {
            props.navigation.goBack();
          }}
        ></IconButton>

        <Text style={styles.header}>
          {`${
            (processedDate?.getMonth() as number) + 1
          }-${processedDate?.getDate()}-${processedDate?.getFullYear()}`}
        </Text>
        {/* <Text style={styles.edit}>Edit</Text> */}
        <View></View>
      </View>
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
      <View style={styles.logCard}>
        <LogCard
          date={date}
          skills={skills}
          trainingHours={trainingHours}
          behaviors={behavior}
        />
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
  top: {
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
    marginBottom: 74,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
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
    marginHorizontal: 40,
    marginBottom: 33,
    borderRadius: 12,
    height: 186,
    alignItems: "center",
    justifyContent: "center",
  },
  textCard: {
    flexDirection: "column",
    backgroundColor: "white",
    marginHorizontal: 40,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
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
  logCard: {
    marginHorizontal: 40,
  },
  regularText: {
    fontFamily: "DMSans-Regular",
  },
});
