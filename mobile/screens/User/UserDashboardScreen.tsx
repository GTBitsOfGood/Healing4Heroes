import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DashboardOverlay from "../../components/Overlays/DashboardOverlay";
import HealthCard from "../../components/HealthCard";
import LogButton from "../../components/LogButton";
import ProgressBar from "../../components/ProgressBar";
import { userGetUserInfo } from "../../actions/User";
import { userGetAnimal } from "../../actions/Animal";
import { ServiceAnimal, User } from "../../utils/types";
import { calculateAge } from "../../utils/helper";
import { getFile } from "../../utils/storage";
import { userGetTrainingLogs } from "../../actions/TrainingLog";
import DashboardButton from "../../components/DashboardButton";

export default function UserDashboardScreen(props: any) {
  const [hoursCompleted, setHoursCompleted] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [animalInfo, setAnimalInfo] = useState<ServiceAnimal | null>(null);
  const [animalImage, setAnimalImage] = useState<string>("");
  useEffect(() => {
    async function getUserDashboardInformation() {
      const user: User = (await userGetUserInfo()) as User;
      const animal: ServiceAnimal = (await userGetAnimal()) as ServiceAnimal;

      setUserInfo(user);
      setAnimalInfo(animal);
      setHoursCompleted(animal?.totalHours);
      const imageData = await getFile(animal?.profileImage as string);
      setAnimalImage(imageData as string);
    }

    getUserDashboardInformation().then().catch();

    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("User Dashboard");
      return true;
    });

    const unsubscribe = props.navigation.addListener("focus", () => {
      getUserDashboardInformation().then().catch();
    });
    return unsubscribe;
  }, []);

  return (
    <DashboardOverlay
      headerComponent={
        <View style={styles.dashboardHeader}>
          <FontAwesome name="user-circle" size={26} color="blue" />
          <Text style={styles.profileName}>
            {userInfo?.firstName} {userInfo?.lastName}
          </Text>
          <DashboardButton
            icon={
              <MaterialCommunityIcons
                name="bell-badge"
                size={26}
                color="blue"
              />
            }
          ></DashboardButton>
        </View>
      }
      pageBody={
        <View style={styles.container}>
          {/* announcment */}
          <View style={styles.announcementContainer}>
            <Text style={styles.announcementTitle}>New Announcements</Text>
            <Text style={styles.announcementText}>No New Announcements</Text>
          </View>

          {/* training bar status */}
          <Text style={styles.label}>Training Progress</Text>
          <ProgressBar
            filled={
              Math.min(Math.round((hoursCompleted / 800) * 100), 100) + " %"
            }
            complete={hoursCompleted}
            total={800}
            unit={"Hours"}
          />

          {/* training log */}
          <Text style={styles.label}>Training Log</Text>
          <View style={styles.logContainer}>
            <LogButton
              text="Add New Log"
              icon={<MaterialIcons name="note-add" size={40} color="blue" />}
              navigation={props.navigation}
              callbackFunction={() =>
                props.navigation.navigate("Add Training Log")
              }
            />
            <LogButton
              text="View All Logs"
              icon={
                <MaterialCommunityIcons
                  name="file-document"
                  size={40}
                  color="blue"
                />
              }
              navigation={props.navigation}
              callbackFunction={async () => {
                const trainingLogs = await userGetTrainingLogs();
                props.navigation.navigate("View All Logs Screen", {
                  trainingLogs,
                });
              }}
            />
          </View>

          {/* animal cards */}
          <Text style={styles.label}>Health Information</Text>
          <HealthCard
            handlerName={userInfo?.firstName + " " + userInfo?.lastName}
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
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
  },

  label: {
    marginTop: 20,
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },

  dashboardHeader: {
    flexDirection: "row",
  },

  profileName: {
    flexGrow: 1,
    paddingLeft: 10,
    alignSelf: "center",
    fontFamily: "DMSans-Bold",
  },

  announcementContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 10,
    padding: 10,
  },
  announcementTitle: {
    color: "black",
    fontSize: 12,
    fontWeight: "500",
  },
  announcementText: {
    color: "grey",
    fontSize: 12,
    fontWeight: "400",
  },

  logContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
