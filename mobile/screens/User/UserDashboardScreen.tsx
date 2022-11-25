import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HealthCard from "../../components/HealthCard";
import LogButton from "../../components/LogButton";
import ProgressBar from "../../components/ProgressBar";
import { userGetUserInfo } from "../../actions/User";
import { userGetAnimal } from "../../actions/Animal";
import { Announcement, Screens, ServiceAnimal, User } from "../../utils/types";
import { calculateAge } from "../../utils/helper";
import { getFile } from "../../utils/storage";
import { userGetTrainingLogs } from "../../actions/TrainingLog";
import IconButton from "../../components/IconButton";
import { userGetAnnouncements } from "../../actions/Announcement";
import { auth } from "../../utils/firebase";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import DashboardHeader from "../../components/DashboardHeader";

export default function UserDashboardScreen(props: any) {
  const [hoursCompleted, setHoursCompleted] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [animalInfo, setAnimalInfo] = useState<ServiceAnimal | null>(null);
  const [animalImage, setAnimalImage] = useState<string>("");
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  useEffect(() => {
    async function getUserDashboardInformation() {
      const user: User = (await userGetUserInfo()) as User;
      const animal: ServiceAnimal = (await userGetAnimal()) as ServiceAnimal;
      const announcementList: Announcement[] =
        (await userGetAnnouncements()) as Announcement[];

      announcementList.sort((first: Announcement, second: Announcement) => {
        return new Date(second.date).getTime() - new Date(first.date).getTime();
      });

      setAnnouncements(announcementList);
      setUserInfo(user);
      setAnimalInfo(animal);
      setHoursCompleted(animal?.totalHours);
      const imageData = await getFile(animal?.profileImage as string);
      setAnimalImage(imageData as string);
      setEnabled(user?.emailVerified && user?.verifiedByAdmin);
    }

    getUserDashboardInformation().then().catch();
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.USER_DASHBOARD_SCREEN);
      return true;
    });

    const unsubscribe = props.navigation.addListener("focus", () => {
      getUserDashboardInformation().then().catch();
    });
    return unsubscribe;
  }, []);

  return (
    <BaseOverlay
      header={
        <DashboardHeader
          userInfo={userInfo as User}
          navigationProp={props.navigation}
        />
      }
      body={
        <View style={styles.container}>
          {/* announcment */}
          <TouchableOpacity
            style={styles.announcementContainer}
            onPress={() => {
              props.navigation.navigate(Screens.VIEW_ALL_ANNOUNCEMENTS_SCREEN);
            }}
          >
            <Text style={styles.announcementTitle} numberOfLines={1}>
              {announcements && announcements.length
                ? announcements[0].title
                : "Announcements"}
            </Text>
            <Text style={styles.announcementText} numberOfLines={1}>
              {announcements && announcements.length
                ? announcements[0].description
                : "No New Announcements"}
            </Text>
          </TouchableOpacity>

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
              icon={
                <MaterialIcons
                  name="note-add"
                  size={40}
                  color={isEnabled ? "#3F3BED" : "gray"}
                />
              }
              navigation={props.navigation}
              disabled={!isEnabled}
              callbackFunction={() =>
                props.navigation.navigate(Screens.ADD_TRAINING_LOG_SCREEN)
              }
            />
            <LogButton
              text="View All Logs"
              disabled={!isEnabled}
              icon={
                <MaterialCommunityIcons
                  name="file-document"
                  size={40}
                  color={isEnabled ? "#3F3BED" : "gray"}
                />
              }
              navigation={props.navigation}
              callbackFunction={async () => {
                const trainingLogs = await userGetTrainingLogs();
                props.navigation.navigate(Screens.VIEW_ALL_LOGS_SCREEN, {
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
    marginTop: 10,
    marginBottom: 25,
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
