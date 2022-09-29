import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import HeaderDate from "../components/HeaderDate";

import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AddTrainingLogScreen(props: any) {
  const [image, setImage] = useState();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("User Dashboard");
      return true;
    });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Add Training Log")}
            style={styles.backArrow}
          >
            <Ionicons
              name="chevron-back-circle"
              size={45}
              style={styles.arrowIcon}
              color="grey"
            />
          </TouchableOpacity>
          <View>
            <HeaderDate />
          </View>
        </View>

        <Text style={styles.label}>Video Log</Text>
        <View style={styles.videoUploadContainer}>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Ionicons name="add-circle-outline" size={30} color="grey" />
            <Text style={styles.uploadText}> Training Video Log</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} />}
        </View>
        <View style={styles.videoUploadContainer}>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
            <Ionicons name="add-circle-outline" size={30} color="grey" />
            <Text style={styles.uploadText}> Training Video Log</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} />}
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
        <View style={styles.circles}>
          <View style={styles.circle} />
          <View style={[styles.circle, styles.selected]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingVertical: 40,
    paddingHorizontal: 24,
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
    marginTop: 20,
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
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
});
