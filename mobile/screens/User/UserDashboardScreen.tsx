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
import {
  Announcement,
  Screens,
  ServiceAnimal,
  TrainingLog,
  User,
} from "../../utils/types";
import { calculateAge } from "../../utils/helper";
import { getFile } from "../../utils/storage";
import { userGetTrainingLogs } from "../../actions/TrainingLog";
import { userGetAnnouncements } from "../../actions/Announcement";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import DashboardHeader from "../../components/DashboardHeader";
import { endOfExecutionHandler, ErrorWrapper } from "../../utils/error";
import ErrorBox from "../../components/ErrorBox";
import shadowStyle from "../../utils/styles";

export default function UserDashboardScreen(props: any) {
  const [hoursCompleted, setHoursCompleted] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [animalInfo, setAnimalInfo] = useState<ServiceAnimal | null>(null);
  const [animalImage, setAnimalImage] = useState<string>("");
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUserDashboardInformation() {
      try {
        const user: User = (await ErrorWrapper({
          functionToExecute: userGetUserInfo,
          errorHandler: setError,
        })) as User;
        const animal: ServiceAnimal = (await ErrorWrapper({
          functionToExecute: userGetAnimal,
          errorHandler: setError,
        })) as ServiceAnimal;
        const announcementList: Announcement[] = (await ErrorWrapper({
          functionToExecute: userGetAnnouncements,
          errorHandler: setError,
        })) as Announcement[];
        announcementList.sort((first: Announcement, second: Announcement) => {
          return (
            new Date(second.date).getTime() - new Date(first.date).getTime()
          );
        });

        setAnnouncements(announcementList);
        setUserInfo(user);
        setAnimalInfo(animal);
        setHoursCompleted(animal?.totalHours);
        if (animal.profileImage) {
          const imageData = await ErrorWrapper({
            functionToExecute: getFile,
            errorHandler: setError,
            parameters: [animal.profileImage as string],
          });
          setAnimalImage(imageData as string);
        }
        setEnabled(user?.emailVerified && user?.verifiedByAdmin);
      } catch (error) {
        endOfExecutionHandler(error as Error);
      }
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
          {/* announcement */}
          <TouchableOpacity
            style={[styles.announcementContainer, shadowStyle.shadow]}
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
          <View style={shadowStyle.shadow}>
            <ProgressBar
              filled={
                Math.min(Math.round((hoursCompleted / 800) * 100), 100) + " %"
              }
              complete={hoursCompleted}
              total={800}
              unit={"Hours"}
            />
          </View>
          {/* training log */}
          <Text style={styles.label}>Training Log</Text>
          <View style={[styles.logContainer, shadowStyle.shadow]}>
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
                props.navigation.navigate(Screens.ADD_TRAINING_LOG_SCREEN, {
                  hoursCompleted: hoursCompleted,
                })
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
                try {
                  const trainingLogs: TrainingLog[] = (await ErrorWrapper({
                    functionToExecute: userGetTrainingLogs,
                    errorHandler: setError,
                  })) as TrainingLog[];
                  props.navigation.navigate(Screens.VIEW_ALL_LOGS_SCREEN, {
                    trainingLogs,
                  });
                } catch (error) {
                  endOfExecutionHandler(error as Error);
                }
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
      footer={<ErrorBox errorMessage={error} />}
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
