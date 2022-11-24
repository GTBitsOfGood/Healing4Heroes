import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { userGetAnnouncements } from "../../actions/Announcement";
import {
  userCreateReadLog,
  userGetReadAnnouncements,
} from "../../actions/ReadLog";
import AnnouncementCard from "../../components/AnnouncementCard";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import { Announcement, Screens } from "../../utils/types";
import GenericHeader from "../../components/GenericHeader";

export default function ViewAllAnnouncementsScreen(props: any) {
  const [readAnnouncements, setReadAnnouncements] = useState<Announcement[]>(
    []
  );
  const [unreadAnnouncements, setUnreadAnnouncements] =
    useState<Announcement[]>();

  useEffect(() => {
    async function loadAnnouncements() {
      const announcements = await userGetAnnouncements();
      const readLogs = await userGetReadAnnouncements();
      const announcementIds = readLogs.map((value) => value.announcement);
      const read = announcements.filter((announcement) =>
        announcementIds.includes(announcement._id.toString())
      );
      const unread = announcements.filter(
        (announcement) => !announcementIds.includes(announcement._id)
      );

      setReadAnnouncements(read);
      setUnreadAnnouncements(unread);
    }
    loadAnnouncements().then().catch();
  }, []);

  const processRead = async (announcement: Announcement) => {
    readAnnouncements.push(announcement);
    const newUnread = unreadAnnouncements?.filter(
      (ann) => ann._id !== announcement._id
    );
    const log = await userCreateReadLog(announcement._id, new Date());
    setReadAnnouncements(readAnnouncements);
    setUnreadAnnouncements(newUnread);
    processViewDetail(announcement);
  };

  const processViewDetail = (announcement: Announcement) => {
    props.navigation.navigate(Screens.VIEW_SINGLE_ANNOUNCEMENT_SCREEN, {
      announcement: announcement,
    });
  };

  return (
    <BaseOverlay
      header={
        <GenericHeader
          headerTitle="All Announcements"
          navigationProp={props.navigation}
        />
      }
      body={
        <View>
          {unreadAnnouncements?.map((announcement, index) => {
            return (
              <AnnouncementCard
                dateOfAnnouncement={new Date(announcement.date)}
                title={announcement.title}
                announcement={announcement}
                isRead={false}
                key={index}
                callbackFunction={processRead}
              />
            );
          })}
          {readAnnouncements?.map((announcement, index) => {
            return (
              <AnnouncementCard
                dateOfAnnouncement={new Date(announcement.date)}
                title={announcement.title}
                isRead={true}
                announcement={announcement}
                callbackFunction={processViewDetail}
                key={index}
              />
            );
          })}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontFamily: "DMSans-Bold",
    color: "grey",
    fontSize: 16,
  },
});
