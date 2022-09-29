import React, { useState } from "react";
import { Button, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getFile, uploadFile } from "../utils/storage";
import { StorageLocation } from "../utils/types";
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
      const res = await uploadFile(
        "test.jpg",
        StorageLocation.HANDLER_PICTURES,
        result.uri
      );
      console.log(res);

      // Use the download URL as the source
      const res2 = await getFile(res as string);
      setImage(res2 as string);
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
