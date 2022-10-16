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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode } from "expo-av";
import { ImageInfo } from "expo-image-picker";
import StepOverlay from "../../components/StepOverlay";
import { calculateAge, convertToMegabytes } from "../../utils/helper";
import { StorageLocation } from "../../utils/types";
import { uploadFile } from "../../utils/storage";
import { Image } from "react-native";
import { userGetUserInfo, userUpdateUser } from "../../actions/User";
import { userUpdateAnimal } from "../../actions/Animal";

export default function UploadProfileImageScreen(props: any) {
  const [error, setError] = useState("");
  const [animalImageUri, setAnimalImageUri] = useState<string>("");
  const [handlerImageUri, setHandlerImageUri] = useState<string>("");
  const [userAge, setUserAge] = useState<number>(0);

  const updateProfileInformation = async () => {
    if (handlerImageUri) {
      const handlerFileName: string = uuidv4() + ".png";
      const handlerUpload = await uploadFile(
        handlerFileName,
        StorageLocation.HANDLER_PICTURES,
        handlerImageUri
      );

      await userUpdateUser(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        handlerUpload as string
      );
    }

    const animalFileName: string = uuidv4() + ".png";

    if (animalImageUri) {
      const animalUpload = await uploadFile(
        animalFileName,
        StorageLocation.SERVICE_ANIMAL_PICTURES,
        animalImageUri
      );
      await userUpdateAnimal(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        animalUpload as string
      );
    }

    // Update these methods after sprint 3
    // userUpdateUser()
    // userUpdateAnimal()

    props.navigation.navigate("User Dashboard");
  };

  useEffect(() => {
    const setUserInfo = async () => {
      const user = await userGetUserInfo();
      const age = calculateAge(new Date(user.birthday));
      setUserAge(age);
    };

    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("Animal Information");
      return true;
    });

    setUserInfo().then().catch();
  }, []);

  const animalPickImage = async () => {
    setError("");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    const imageLocation = (result as ImageInfo).uri;
    const imageSize = (await FileSystem.getInfoAsync(imageLocation)).size;
    // All images must be smaller than 1GB
    if (convertToMegabytes(imageSize as number) > 1024) {
      setError(
        "Image is too large -- consider uploading a lower quality image."
      );
      return;
    }
    setAnimalImageUri(imageLocation);
  };

  const handlerPickImage = async () => {
    setError("");
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    const imageLocation = (result as ImageInfo).uri;
    const imageSize = (await FileSystem.getInfoAsync(imageLocation)).size;
    // All images must be smaller than 1GB
    if (convertToMegabytes(imageSize as number) > 1024) {
      setError(
        "Image is too large -- consider uploading a lower quality image."
      );
      return;
    }
    setHandlerImageUri(imageLocation);
  };

  return (
    <StepOverlay
      headerName="Create Training Log"
      circleCount={3}
      error={error}
      buttonFunction={updateProfileInformation}
      numberSelected={3}
      pageBody={
        <View style={styles.container}>
          {/* Handler Image Upload */}
          {userAge >= 18 && (
            <Text style={styles.label}>Upload Handler Picture</Text>
          )}
          {userAge >= 18 && (
            <View style={styles.videoUploadContainer}>
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={handlerPickImage}
              >
                <Ionicons name="add-circle-outline" size={30} color="grey" />
                {!handlerImageUri ? (
                  <Text style={styles.uploadText}> Upload Handler Picture</Text>
                ) : (
                  <Text style={styles.uploadText}>
                    {" "}
                    Upload A Different File
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {handlerImageUri && (
            <Image
              style={styles.video}
              source={{
                uri: handlerImageUri,
              }}
              resizeMode={ResizeMode.COVER}
            />
          )}
          {/* Animal Image Upload */}
          <Text style={styles.label}>Upload Animal Picture</Text>
          <View style={styles.videoUploadContainer}>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={animalPickImage}
            >
              <Ionicons name="add-circle-outline" size={30} color="grey" />
              {!animalImageUri ? (
                <Text style={styles.uploadText}> Upload Animal Picture</Text>
              ) : (
                <Text style={styles.uploadText}> Upload A Different File</Text>
              )}
            </TouchableOpacity>
          </View>

          {animalImageUri && (
            <Image
              style={styles.video}
              source={{
                uri: animalImageUri,
              }}
              resizeMode={ResizeMode.COVER}
            />
          )}
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    marginBottom: 0,
  },
});
