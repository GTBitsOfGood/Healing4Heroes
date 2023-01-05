import React, { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Announcement, Screens, User, UserFilter } from "../../utils/types";
import { adminGetAnnouncements } from "../../actions/Announcement";
import { userGetUserInfo } from "../../actions/User";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import DashboardHeader from "../../components/DashboardHeader";
import { endOfExecutionHandler, ErrorWrapper } from "../../utils/error";
import ErrorBox from "../../components/ErrorBox";

export default function AdminDashboardScreen(props: any) {
  const [userInfo, setUserInfo] = useState<User>();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getAdminDashboardInfo() {
      try {
        const user: User = (await ErrorWrapper({
          functionToExecute: userGetUserInfo,
          errorHandler: setError,
        })) as User;
        const announcementList: Announcement[] = (await ErrorWrapper({
          functionToExecute: adminGetAnnouncements,
          errorHandler: setError,
        })) as Announcement[];
        announcementList.sort((first: Announcement, second: Announcement) => {
          return (
            new Date(second.date).getTime() - new Date(first.date).getTime()
          );
        });
        setAnnouncements(announcementList);
        setUserInfo(user);
      } catch (error) {
        endOfExecutionHandler(error as Error);
      }
    }

    getAdminDashboardInfo().then().catch();
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });

    const unsubscribe = props.navigation.addListener("focus", () => {
      getAdminDashboardInfo().then().catch();
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
          <Text style={styles.label}>Announcements</Text>
          <View style={styles.announcementContainer}>
            <TouchableOpacity
              style={styles.announcementBox}
              onPress={() => {
                props.navigation.navigate(
                  Screens.VIEW_ALL_ANNOUNCEMENTS_SCREEN
                );
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
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                props.navigation.navigate(Screens.CREATE_ANNOUNCEMENT_SCREEN)
              }
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>User Summary</Text>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => {
              props.navigation.navigate(Screens.ADMIN_USER_LIST_SCREEN, {
                filter: UserFilter.NONPROFIT_USERS,
              });
            }}
          >
            <Text style={styles.bigButtonText}>View All Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => {
              props.navigation.navigate(Screens.ADMIN_USER_LIST_SCREEN, {
                filter: UserFilter.NONPROFIT_ADMINS,
              });
            }}
          >
            <Text style={styles.bigButtonText}>View Admin Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => {
              props.navigation.navigate(Screens.ADMIN_USER_LIST_SCREEN, {
                filter: UserFilter.UNVERIFIED_USERS,
              });
            }}
          >
            <Text style={styles.bigButtonText}>
              New User Verification Portal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => {
              props.navigation.navigate(Screens.ADMIN_USER_LIST_SCREEN, {
                filter: UserFilter.WITH_800_HOURS_USERS,
              });
            }}
          >
            <Text style={styles.bigButtonText}>Users with 800 Hours</Text>
          </TouchableOpacity>
        </View>
      }
      footer={<ErrorBox errorMessage={error} />}
    />
  );
}

const styles = StyleSheet.create({
  profileName: {
    flexGrow: 1,
    paddingLeft: 10,
    alignSelf: "center",
    fontFamily: "DMSans-Bold",
  },
  dashboardHeader: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    margin: 3,
  },
  label: {
    marginBottom: 16,
    fontSize: 16,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  announcementContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  announcementBox: {
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    flex: 1,
  },
  announcement: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flex: 1,
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
  addButton: {
    backgroundColor: "#3F3BED",
    alignSelf: "center",
    width: 48,
    height: 48,
    borderRadius: 48,
    padding: 12,
    marginLeft: 12,
  },
  bigButton: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 36,
    marginBottom: 20,
    borderRadius: 8,
  },
  bigButtonText: {
    fontWeight: "700",
    fontSize: 12,
    color: "#9A9A9A",
  },
});
