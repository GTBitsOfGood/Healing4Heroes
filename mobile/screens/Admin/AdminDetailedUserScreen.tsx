import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View, Image } from "react-native";
import DashboardOverlay from "../../components/Overlays/DashboardOverlay";
import IconButton from "../../components/IconButton";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LogButton from "../../components/LogButton";
import ProgressBar from "../../components/ProgressBar";
import HealthCard from "../../components/HealthCard";
import { Screens, ServiceAnimal, TrainingLog } from "../../utils/types";
import { adminGetAnimalInfo, adminGetTrainingLogs } from "../../actions/Admin";
import { calculateAge } from "../../utils/helper";
import { getFile } from "../../utils/storage";

export default function AdminDetailedUserScreen(props: any) {
  const [hoursCompleted, setHoursCompleted] = useState(0);
  const [animalInfo, setAnimalInfo] = useState<ServiceAnimal | null>(null);
  const [trainingLogs, setTrainingLogs] = useState<TrainingLog[]>([]);
  const [animalImage, setAnimalImage] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");

  const { user } = props.route.params;
  useEffect(() => {
    async function loadDetails() {
      const animal: ServiceAnimal = (await adminGetAnimalInfo(
        user._id
      )) as ServiceAnimal;
      setHoursCompleted(animal.totalHours);
      const trainingLogs: TrainingLog[] = await adminGetTrainingLogs(user._id);
      const animalImageData: string = (await getFile(
        animal?.profileImage as string
      )) as string;
      const userImageData: string = (await getFile(
        user?.profileImage as string
      )) as string;
      setAnimalInfo(animal);
      setAnimalImage(animalImageData);
      setUserImage(userImageData);
      setTrainingLogs(trainingLogs);
    }

    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.goBack();
      return true;
    });

    loadDetails().then().catch();
  }, []);

  return (
    <DashboardOverlay
      headerComponent={
        <IconButton
          icon={
            <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
          }
        ></IconButton>
      }
      pageBody={
        <View style={styles.container}>
          {/* profile picture  */}
          <View style={styles.profileContainer}>
            {userImage ? (
              <Image
                source={{
                  uri: userImage,
                }}
                style={styles.userImage}
              />
            ) : (
              <FontAwesome name="user-circle" size={80} color="blue" />
            )}
            <Text style={styles.usernameText}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
          {/* training progress bar */}
          <Text style={styles.label}>Training Progress</Text>
          <ProgressBar
            filled={
              Math.min(Math.round((hoursCompleted / 800) * 100), 100) + " %"
            }
            complete={hoursCompleted}
            total={800}
            unit={"Hours"}
          />
          {/* training log section */}
          <Text style={styles.label}>Training Log</Text>
          <View style={styles.logContainer}>
            <LogButton
              text="View All Logs"
              icon={
                <MaterialCommunityIcons
                  name="file-document"
                  size={40}
                  color="blue"
                />
              }
              callbackFunction={async () => {
                props.navigation.navigate(Screens.VIEW_ALL_LOGS_SCREEN, {
                  trainingLogs,
                });
              }}
              navigation={props.navigation}
            ></LogButton>
            <LogButton
              text="Negative Behavior Logs"
              icon={
                <MaterialCommunityIcons
                  name="file-document"
                  size={40}
                  color="blue"
                />
              }
              navigation={props.navigation}
            ></LogButton>
          </View>
          {/* health information section */}
          <Text style={styles.label}>Health Information</Text>
          <HealthCard
            handlerName={user?.firstName + " " + user?.lastName}
            animalName={animalInfo?.name as string}
            animalAge={
              animalInfo?.dateOfBirth
                ? calculateAge(new Date(animalInfo?.dateOfBirth)) + " years old"
                : "Age Not Specified"
            }
            animalImage={animalImage as string}
          />
        </View>
      }
    ></DashboardOverlay>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
  },

  dashboardHeader: {
    flexDirection: "row",
  },

  profileName: {
    flexGrow: 1,
    paddingLeft: 10,
    alignSelf: "center",
    color: "grey",
    fontFamily: "DMSans-Bold",
  },

  title: {
    color: "grey",
    fontFamily: "DMSans-Bold",
  },

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  usernameText: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    fontFamily: "DMSans-Bold",
    color: "grey",
  },

  label: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 15,
    color: "grey",
    fontFamily: "DMSans-Bold",
  },

  logContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userImage: {
    borderRadius: 100,
    width: 80,
    height: 80,
  },
});
