import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Vibration,
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
import HolidayBanner from "../Banners/HolidayBanner";
import DonationBanner from "../Banners/DonationBanner";
import PillBanner from "../Banners/PillBanner";
import CleaningBanner from "../Banners/CleaningBanner";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import DashboardHeader from "../../components/DashboardHeader";
import { endOfExecutionHandler, ErrorWrapper } from "../../utils/error";
import ErrorBox from "../../components/ErrorBox";
import shadowStyle from "../../utils/styles";
import { userUpdateAnimal } from "../../actions/Animal";
import { Data } from "victory-native";
import { userSendEmail } from "../../actions/Email";

export default function UserDashboardScreen(props: any) {
  const [hoursCompleted, setHoursCompleted] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [animalInfo, setAnimalInfo] = useState<ServiceAnimal | null>(null);
  const [animalImage, setAnimalImage] = useState<string>("");
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState("");
  const [birthdayModalVisible, setBirthdayModalVisible] = useState<boolean>(false);
  const [shotReminderVisible, setShotReminderVisible] = useState<boolean>(false);
  const [prescriptionReminderVisible, setPrescriptionReminderVisible] = useState<boolean>(false);
  const [calculatedShotDate, setCalculatedShotDate] = useState<Date>();

  const checkRabiesShot = async (animalInformation: ServiceAnimal) => {
    if (birthdayModalVisible)
      return

    if (!animalInformation)
      animalInformation = (await ErrorWrapper({
        functionToExecute: userGetAnimal,
        errorHandler: setError,
      })) as ServiceAnimal;

    if (!animalInformation?.dateOfRabiesShot || !animalInformation?.rabiesShotTimeInterval)
      return

    const newDate = new Date(animalInformation?.dateOfRabiesShot);
    newDate.setFullYear(newDate.getFullYear() + (animalInformation?.rabiesShotTimeInterval ?? 0));
    setCalculatedShotDate(newDate as Date);

    if (newDate > new Date())
      return

    setShotReminderVisible(true);
    const newAnimal = await userUpdateAnimal(animalInformation?.name,
      animalInformation?.totalHours,
      animalInformation?.subHandler,
      animalInformation?.dateOfBirth,
      animalInformation?.dateOfAdoption,
      newDate,
      animalInformation?.rabiesShotTimeInterval,
      animalInformation?.dateOfTrainingClass,
      animalInformation?.microchipExpiration,
      animalInformation?.checkUpDate,
      animalInformation?.profileImage);

    if (newAnimal) {
      setAnimalInfo(newAnimal);
    } else {
      setError("Failed to update animal rabies shot date.");
    }
  }

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

        // If there is both the birthday modal and the rabies shot modal, show the birthday one first, once that one is closed we
        // use a use effect to reactively show the rabies shot modal.
        if ((new Date(animal?.dateOfBirth as Date)).getMonth() == new Date().getMonth() && new Date(animal?.dateOfBirth as Date).getDate() == new Date().getDate()) {
          setBirthdayModalVisible(true);
        } else if (user && user.annualPetVisitDay
          && (new Date(user?.annualPetVisitDay as Date)).getMonth() == new Date().getMonth()
          && (new Date(user?.annualPetVisitDay as Date)).getDate() == new Date().getDate()) {
          setPrescriptionReminderVisible(true);
        } else {
          await checkRabiesShot(animal)
        }

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


  useEffect(() => {
    async function checkUser(userInfo: User) {
      try {
        if (!userInfo) {
          userInfo = (await ErrorWrapper({
            functionToExecute: userGetUserInfo,
            errorHandler: setError,
          })) as User;
        }
        if (userInfo && userInfo.annualPetVisitDay
          && (new Date(userInfo?.annualPetVisitDay as Date)).getMonth() == new Date().getMonth()
          && (new Date(userInfo?.annualPetVisitDay as Date)).getDate() == new Date().getDate()) {
          setPrescriptionReminderVisible(true);
        } else {
          checkRabiesShot(animalInfo as ServiceAnimal).then().catch()
        }
      } catch (error) {
        endOfExecutionHandler(error as Error);
      }
    }
    checkUser(userInfo as User).then().catch();
  }, [birthdayModalVisible]);

  useEffect(() => {
    checkRabiesShot(animalInfo as ServiceAnimal).then().catch()
  }, [prescriptionReminderVisible]);

  useEffect(() => {
    async function sendEmailReminder(userInfo: User, animalInfo: ServiceAnimal) {
      if (!userInfo) {
        userInfo = (await ErrorWrapper({
          functionToExecute: userGetUserInfo,
          errorHandler: setError,
        })) as User;
      }
      if (!animalInfo) {
        animalInfo = (await ErrorWrapper({
          functionToExecute: userGetAnimal,
          errorHandler: setError,
        })) as ServiceAnimal;
      }
      const emailData = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        animalName: animalInfo.name,
        shotDate: calculatedShotDate?.toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        ) as string,
      };
      if (userInfo.email) {
        try {
          await userSendEmail(
            "gt.engineering@hack4impact.org",
            "Rabies Shot Reminder for Your Service Animal",
            "shot-reminder",
            emailData
          );
          console.log("Email sent");
        } catch (error) {
          console.log("Error sending email:", error);
        }
      }
    }
    if (shotReminderVisible) {
      console.log("sendEmail");
      sendEmailReminder(userInfo as User, animalInfo as ServiceAnimal).then().catch(error => {
        console.log(error.message);
      });
    }
  }, [shotReminderVisible]);


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
          {/* birthday reminder */}
          <HolidayBanner />
          <DonationBanner />
          {new Date().getDate() === 1 ? <PillBanner /> : null}
          {new Date().getMonth() === 1 ? <CleaningBanner /> : null}
          <Modal
            animationType="fade"
            transparent={true}
            visible={birthdayModalVisible}
            onRequestClose={() => {
              setBirthdayModalVisible(!birthdayModalVisible);
            }}
            onShow={() => {
              Vibration.vibrate(10000);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setBirthdayModalVisible(!birthdayModalVisible)}>
                  <MaterialIcons
                    name="close"
                    size={20}
                    color={"grey"}
                  />
                </Pressable>
                <Text style={styles.modalText}>Happy birthday {animalInfo?.name}!!! {'\uE312'}</Text>
                <Text style={styles.modalText}>{
                  animalInfo?.dateOfBirth ?
                    `${animalInfo?.name} turned ${calculateAge(new Date(animalInfo?.dateOfBirth))} year${calculateAge(new Date(animalInfo?.dateOfBirth)) !== 1 ? "s" : ""} old today!`
                    : ""}
                </Text>
              </View>
            </View>
          </Modal>

          {/* prescription reminder */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={prescriptionReminderVisible}
            onRequestClose={() => {
              setPrescriptionReminderVisible(false);
            }}
            onShow={() => {
              Vibration.vibrate(10000);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setPrescriptionReminderVisible(false)}>
                  <MaterialIcons
                    name="close"
                    size={20}
                    color={"grey"}
                  />
                </Pressable>
                <Text style={styles.modalText}>This is a reminder to fill your prescription for {animalInfo?.name}'s heartworm preventative pill.</Text>
              </View>
            </View>
          </Modal>

          {/* shot reminder */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={shotReminderVisible}
            onRequestClose={() => {
              setShotReminderVisible(false);
            }}
            onShow={() => {
              Vibration.vibrate(10000);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setShotReminderVisible(false)}>
                  <MaterialIcons
                    name="close"
                    size={20}
                    color={"grey"}
                  />
                </Pressable>
                <Text style={styles.modalText}>{animalInfo?.name} needs their rabies shot.</Text>
                <Text style={styles.modalText}>{animalInfo?.name} was due on {calculatedShotDate?.toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )}</Text>
              </View>
            </View>
          </Modal>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: .25,
    borderColor: '#B6D0E2',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#B6D0E2',
    shadowOffset: {
      width: .5,
      height: .5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 5,
  },

  button: {
    position: 'absolute',
    right: '1.5%',
    top: '5%',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: 'transparent',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    paddingTop: 10,
    textAlign: 'center',
    display: 'flex',
  },

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
  pillText: {
    marginBottom: 10,
  }
});