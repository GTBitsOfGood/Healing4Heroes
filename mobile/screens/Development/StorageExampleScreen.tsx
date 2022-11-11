import React, { useState } from "react";
import { Button, View, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { getFile, uploadFile, uploadVideo } from "../../utils/storage";
import { StorageLocation } from "../../utils/types";
export default function StorageExampleScreen() {
  const [image, setImage] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      // Usually shouldn't upload until a submit button or next button is pressed
      // This is the result you will want to save in the database
      // const res = await uploadFile(
      //   "icon.png",
      //   StorageLocation.HANDLER_PICTURES,
      //   result.uri
      // );

      const videoSize = (await FileSystem.getInfoAsync(result.uri)).size;
      const res = await uploadVideo(
        uuidv4() as string,
        StorageLocation.TRAINING_LOG_VIDEOS,
        result.uri
      );

      // Use the download URL as the source
      // const res2 = await getFile(res as string);
      // setImage(res2 as string);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick a video from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
