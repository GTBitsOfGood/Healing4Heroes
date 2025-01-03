import React, { useEffect, useReducer, useState } from "react";
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
import { userGetUserInfo, userUpdateUser } from "../../actions/User";
import { userGetAnimal, userUpdateAnimal } from "../../actions/Animal";
import {
  Announcement,
  ModalContent,
  Screens,
  ServiceAnimal,
  TrainingLog,
  User,
} from "../../utils/types";
import { calculateAge } from "../../utils/helper";
import { getFile } from "../../utils/storage";
import { userGetTrainingLogs } from "../../actions/TrainingLog";
import { userGetAnnouncements } from "../../actions/Announcement";
import BirthdayBanner from "../Banners/BirthdayBanner";
import HolidayBanner from "../Banners/HolidayBanner";
import DonationBanner from "../Banners/DonationBanner";
import PillBanner from "../Banners/PillBanner";
import CleaningBanner from "../Banners/CleaningBanner";
import CampGraceBanner from "../Banners/CampGraceBanner";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import DashboardHeader from "../../components/DashboardHeader";
import { endOfExecutionHandler, ErrorWrapper } from "../../utils/error";
import ErrorBox from "../../components/ErrorBox";
import shadowStyle from "../../utils/styles";
import { userSendEmail } from "../../actions/Email";
import DashboardModal from "../../components/DashboardModal";

type ModalQueueState = {
  birthdayQueued: boolean;
  prescriptionQueued: boolean;
  shotQueued: boolean;

  modals: ModalContent[];
};

function modalQueueReducer(
  state: ModalQueueState,
  action: ModalContent | "close"
): ModalQueueState {
  if (action === "close") {
    return { ...state, modals: state.modals.slice(1) };
  }

  switch (action.type) {
    case "birthday":
      if (state.birthdayQueued) return state;
      return {
        ...state,
        modals: [...state.modals, action],
        birthdayQueued: true,
      };
    case "prescription":
      if (state.prescriptionQueued) return state;
      return {
        ...state,
        modals: [...state.modals, action],
        prescriptionQueued: true,
      };
    case "shot":
      if (state.shotQueued) return state;
      return {
        ...state,
        modals: [...state.modals, action],
        shotQueued: true,
      };
    default:
      return state;
  }
}

export default function UserDashboardScreen(props: any) {
  const [hoursCompleted, setHoursCompleted] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [animalInfo, setAnimalInfo] = useState<ServiceAnimal | null>(null);
  const [animalImage, setAnimalImage] = useState<string>("");
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState("");
  const [calculatedShotDate, setCalculatedShotDate] = useState<Date>();

  const [modalQueue, modalQueueDispatch] = useReducer(modalQueueReducer, {
    modals: [],

    birthdayQueued: false,
    prescriptionQueued: false,
    shotQueued: false,
  });

  const checkPrescriptionReminder = async (
    userInformation: User,
    animalInformation: ServiceAnimal
  ) => {
    if (modalQueue.prescriptionQueued) return;

    if (!userInformation) {
      userInformation = (await ErrorWrapper({
        functionToExecute: userGetUserInfo,
        errorHandler: setError,
      })) as User;
    }

    if (!animalInformation) {
      animalInformation = (await ErrorWrapper({
        functionToExecute: userGetAnimal,
        errorHandler: setError,
      })) as ServiceAnimal;
    }

    const today = new Date();
    const annualVisitDate = new Date(userInformation.annualPetVisitDay);
    const updatedDate = new Date(
      today.getFullYear() + 1,
      annualVisitDate.getMonth(),
      annualVisitDate.getDate()
    );

    if (!userInformation.nextPrescriptionReminder) {
      await userUpdateUser(
        userInformation.roles,
        userInformation.birthday,
        userInformation.firstName,
        userInformation.lastName,
        userInformation.handlerType,
        userInformation.address,
        userInformation.annualPetVisitDay,
        userInformation.profileImage,
        updatedDate,
        false
      );
      return;
    }

    if (today >= new Date(userInformation?.nextPrescriptionReminder)) {
      modalQueueDispatch({
        type: "prescription",
        content: `This is a reminder to fill your prescription for ${animalInformation.name}'s heartworm preventative pill.`,
      });

      await userUpdateUser(
        userInformation.roles,
        userInformation.birthday,
        userInformation.firstName,
        userInformation.lastName,
        userInformation.handlerType,
        userInformation.address,
        userInformation.annualPetVisitDay,
        userInformation.profileImage,
        updatedDate,
        false
      );
    }
  };

  const checkRabiesShot = async (
    animalInformation: ServiceAnimal,
    userInformation: User
  ) => {
    if (modalQueue.shotQueued) return;

    if (!animalInformation) {
      animalInformation = (await ErrorWrapper({
        functionToExecute: userGetAnimal,
        errorHandler: setError,
      })) as ServiceAnimal;
    }

    if (!userInformation) {
      userInformation = (await ErrorWrapper({
        functionToExecute: userGetUserInfo,
        errorHandler: setError,
      })) as User;
    }

    if (
      !animalInformation?.dateOfRabiesShot ||
      !animalInformation?.rabiesShotTimeInterval
    )
      return;

    const newDate = new Date(animalInformation?.dateOfRabiesShot);
    newDate.setFullYear(
      newDate.getFullYear() + (animalInformation?.rabiesShotTimeInterval ?? 0)
    );
    setCalculatedShotDate(newDate);

    if (newDate > new Date()) return;

    modalQueueDispatch({
      type: "shot",
      content: `${animalInformation?.name} needs their rabies shot.`,
      additionalContent: `${animalInformation?.name} was due on ${newDate.toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )}`,
    });

    const newAnimal = await userUpdateAnimal(
      animalInformation?.name,
      animalInformation?.totalHours,
      animalInformation?.subHandler,
      animalInformation?.dateOfBirth,
      animalInformation?.dateOfAdoption,
      newDate,
      animalInformation?.rabiesShotTimeInterval,
      animalInformation?.dateOfTrainingClass,
      animalInformation?.microchipExpiration,
      animalInformation?.checkUpDate,
      animalInformation?.profileImage
    );

    // Change content for deploy preview
    const emailData: { [key: string]: string } = {
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      animalName: animalInformation.name,
      shotDate: calculatedShotDate?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) as string,
    };
    if (userInformation.unsubscribeEmail === false) {
      await userSendEmail(
        userInformation.email,
        "Rabies Shot Reminder for Your Service Animal",
        "shot-reminder",
        emailData
      );
    }

    if (newAnimal) {
      setAnimalInfo(newAnimal);
    } else {
      setError("Failed to update animal rabies shot date.");
    }
  };

  const checkBirthday = (animal: ServiceAnimal) => {
    if (modalQueue.birthdayQueued) return;

    if (
      new Date(animal?.dateOfBirth as Date).getMonth() ===
        new Date().getMonth() &&
      new Date(animal?.dateOfBirth as Date).getDate() === new Date().getDate()
    ) {
      modalQueueDispatch({
        type: "birthday",
        content: `Happy birthday ${animal.name}!!! \uE312`,
        additionalContent: `${animal.name} turned ${calculateAge(
          new Date(animal.dateOfBirth ?? "")
        )} year${
          calculateAge(new Date(animal.dateOfBirth ?? "")) !== 1 ? "s" : ""
        } old today!`,
      });
    }
  };

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

        // Check all reminders
        checkBirthday(animal);
        await checkRabiesShot(animal, user);
        await checkPrescriptionReminder(user, animal);

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

    getUserDashboardInformation().catch();

    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.USER_DASHBOARD_SCREEN);
      return true;
    });

    const unsubscribe = props.navigation.addListener("focus", () => {
      getUserDashboardInformation().catch();
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
          <BirthdayBanner />
          <HolidayBanner />
          <DonationBanner />
          <CampGraceBanner />
          {new Date().getDate() === 1 ? <PillBanner /> : null}
          {new Date().getMonth() === 1 ? <CleaningBanner /> : null}

          <DashboardModal
            content={modalQueue.modals.length ? modalQueue.modals[0] : null}
            onClose={() => {
              modalQueueDispatch("close");
            }}
          />

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
