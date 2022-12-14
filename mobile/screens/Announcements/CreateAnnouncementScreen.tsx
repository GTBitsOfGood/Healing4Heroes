import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
  Platform,
} from "react-native";
import { getFormattedDate } from "../../utils/helper";
import { adminCreateAnnouncement } from "../../actions/Announcement";
import { Screens } from "../../utils/types";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import GenericHeader from "../../components/GenericHeader";
import { endOfExecutionHandler, ErrorWrapper } from "../../utils/error";
import ErrorBox from "../../components/ErrorBox";

export default function CreateAnnouncementScreen(props: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const sendAnnouncement = async () => {
    try {
      if (!title || !description) {
        setError("Announcement title and description cannot be empty!");
        return;
      }
      await ErrorWrapper({
        functionToExecute: adminCreateAnnouncement,
        errorHandler: setError,
        parameters: [title, description, new Date()],
      });
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
    } catch (error) {
      endOfExecutionHandler(error as Error);
    }
  };
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
          headerTitle={getFormattedDate(new Date())}
          navigationProp={props.navigation}
        />
      }
      body={
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>Announcement</Text>
            <TextInput
              style={styles.input}
              placeholder={"Announcement Title"}
              onChangeText={setTitle}
            ></TextInput>
            <View style={styles.multilineInput}>
              <TextInput
                style={styles.textInput}
                multiline={true}
                placeholder={"Announcement Description"}
                onChangeText={setDescription}
              />
            </View>
          </View>
        </View>
      }
      footer={
        <View>
          <View style={styles.errorBox}>
            <ErrorBox errorMessage={error} />
          </View>
          <TouchableOpacity style={styles.button} onPress={sendAnnouncement}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "DMSans-Bold",
    marginBottom: 10,
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  input: {
    backgroundColor: "white",
    fontSize: 12,
    color: "#666666",
    fontFamily: "DMSans-Bold",
    paddingVertical: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },

  multilineInput: {
    fontSize: 12,
    color: "#666666",
    fontFamily: "DMSans-Bold",
    minHeight: 200,
    backgroundColor: "white",
    paddingBottom: 12,
    paddingTop: Platform.OS === "ios" ? 8 : 0,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  textInput: {
    fontSize: 12,
    color: "#666666",
    fontFamily: "DMSans-Bold",
    paddingVertical: 8,
  },
  button: {
    marginBottom: 32,
    width: "100%",
    paddingVertical: 13,
    borderRadius: 8,
    backgroundColor: "#3F3BED",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorBox: {
    marginBottom: 10,
  },
});
