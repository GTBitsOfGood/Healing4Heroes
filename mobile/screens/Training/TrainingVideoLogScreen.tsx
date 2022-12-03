import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { userCreateTrainingLog } from "../../actions/TrainingLog";
import { ResizeMode, Video } from "expo-av";
import StepOverlay from "../../components/Overlays/StepOverlay";
import { convertToMegabytes } from "../../utils/helper";
import { uploadFile, uploadVideo } from "../../utils/storage";
import {
  Screens,
  ServiceAnimal,
  StorageLocation,
  TrainingLog,
} from "../../utils/types";
import { userGetAnimal, userUpdateAnimal } from "../../actions/Animal";
import * as VideoThumbnails from "expo-video-thumbnails";
import { endOfExecutionHandler, errorWrapper } from "../../utils/error";

export default function TrainingVideoLogScreen(props: any) {
  const [error, setError] = useState("");
  const [videoUri, setVideoUri] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  const [additionalNotes, setAdditionalNotes] = React.useState("");

  //input propagated from addTrainingLogPage
  const {
    totalHours,
    skillValuesSelected,
    behavior,
    behaviorNote,
    trainingLogDate,
  } = props.route.params;

  const createTrainingLog = async () => {
    try {
      let upload = undefined;
      let videoThumbnail = undefined;

      if (thumbnail) {
        videoThumbnail = await uploadFile(
          uuidv4() + ".png",
          StorageLocation.TRAINING_LOG_THUMBNAILS,
          thumbnail
        );
      }

      if (videoUri) {
        const fileName: string = uuidv4();
        upload = await uploadVideo(
          fileName + ".mp4",
          StorageLocation.TRAINING_LOG_VIDEOS,
          videoUri
        );
      }
      const animal: ServiceAnimal = await errorWrapper(userGetAnimal, setError);

      const trainingLog: TrainingLog = await errorWrapper(
        userCreateTrainingLog,
        setError,
        [
          new Date(trainingLogDate),
          skillValuesSelected,
          totalHours,
          behavior,
          behaviorNote,
          (animal as ServiceAnimal)._id,
          additionalNotes,
          upload as string,
          videoThumbnail as string,
        ]
      );

      const updateServiceAnimal = (await errorWrapper(
        userUpdateAnimal,
        setError,
        [undefined, (animal as ServiceAnimal).totalHours + parseInt(totalHours)]
      )) as ServiceAnimal;

      if (!updateServiceAnimal) {
        setError("Failed to add hours to service animal");
      }
      props.navigation.navigate(Screens.USER_DASHBOARD_SCREEN);
      return trainingLog;
    } catch (error) {
      endOfExecutionHandler(error as Error);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADD_TRAINING_LOG_SCREEN);
      return true;
    });
  }, []);

  const pickImage = async () => {
    setError("");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });
    const assets = result?.assets as ImagePicker.ImagePickerAsset[];
    if (assets?.length > 0) {
      const videoLocation = (assets[0] as ImagePicker.ImagePickerAsset).uri;
      const videoSize = (await FileSystem.getInfoAsync(videoLocation)).size;
      // All Videos must be smaller than 1GB
      if (convertToMegabytes(videoSize as number) > 1024) {
        setError(
          "Video is too large -- consider shortening the video or compressing it."
        );
        return;
      }
      setVideoUri(videoLocation);
      const data = await VideoThumbnails.getThumbnailAsync(assets[0].uri);
      setThumbnail(data.uri);
    }
  };

  return (
    <StepOverlay
      headerTitle="Create Training Log"
      circleCount={2}
      error={error}
      buttonFunction={createTrainingLog}
      numberSelected={2}
      pageBody={
        <View style={styles.container}>
          <Text style={styles.label}>Video Log</Text>
          <View style={styles.videoUploadContainer}>
            <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
              <Ionicons name="add-circle-outline" size={30} color="grey" />
              {!videoUri ? (
                <Text style={styles.uploadText}>
                  {" "}
                  Upload Training Video Log
                </Text>
              ) : (
                <Text style={styles.uploadText}> Upload A Different File</Text>
              )}
            </TouchableOpacity>
          </View>

          {videoUri && (
            <Pressable>
              <Video
                style={styles.video}
                source={{
                  uri: videoUri,
                }}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                isLooping
              />
            </Pressable>
          )}
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={styles.input}
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            placeholder="Additional Notes"
            placeholderTextColor={"#D9D9D9"}
            multiline={true}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
  headerContainer: {
    flexDirection: "row",
  },
  backArrow: {
    flex: 0.5,
  },

  arrowIcon: {
    marginTop: 30,
  },
  videoUploadContainer: {
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  uploadBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 350,
  },
  uploadText: {
    fontWeight: "300",
  },
  label: {
    marginTop: 0,
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  failedContainer: {
    marginTop: 12,
    alignItems: "center",
    marginBottom: 12,
    padding: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    minWidth: "85%",
    backgroundColor: "#D9D9D9",
  },
  failedText: {
    fontSize: 12,
    fontWeight: "300",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#666666",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  circles: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 3,
  },
  selected: {
    backgroundColor: "#666666",
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  input: {
    backgroundColor: "white",
    paddingBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    marginBottom: 0,
  },
});
