import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import IconButton from "../../components/IconButton";
import { Ionicons } from "@expo/vector-icons";

export default function CreateAnnouncementScreen(props: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.goBack();
      return true;
    });

    setDate(new Date());
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <IconButton
            icon={
              <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
            }
          />
          <Text style={styles.label}>
            {`${
              (date?.getMonth() as number) + 1
            }-${date?.getDate()}-${date?.getFullYear()}`}
          </Text>
          {/* Hidden View for Styling */}
          <View style={{ width: 26, height: 26 }}></View>
        </View>
        <Text style={styles.label2}>Announcement</Text>
        <TextInput
          style={styles.input}
          placeholder="Announcement Title"
          placeholderTextColor="#999999"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.multilineInput}
          multiline={true}
          placeholder="Announcement Description"
          placeholderTextColor="#999999"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    color: "#666666",
    fontFamily: "DMSans-Bold",
  },
  label2: {
    marginTop: 30,
    marginBottom: 16,
    fontSize: 18,
    color: "#666666",
    fontFamily: "DMSans-Bold",
  },
  header: {
    flexDirection: "row",
    marginTop: 35,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  multilineInput: {
    height: 200,
    backgroundColor: "white",
    paddingTop: 12,
    paddingBottom: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  button: {
    marginBottom: 32,
    paddingVertical: 13,
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
});
