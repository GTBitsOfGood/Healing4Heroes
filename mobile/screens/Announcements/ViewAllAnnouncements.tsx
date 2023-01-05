import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { userGetAnnouncements } from "../../actions/Announcement";
import {
  userCreateReadLog,
  userGetReadAnnouncements,
} from "../../actions/ReadLog";
import AnnouncementCard from "../../components/AnnouncementCard";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import { Announcement, Screens } from "../../utils/types";
import GenericHeader from "../../components/GenericHeader";
import { endOfExecutionHandler, ErrorWrapper } from "../../utils/error";
import ErrorBox from "../../components/ErrorBox";

export default function ViewAllAnnouncementsScreen(props: any) {
  const [readAnnouncements, setReadAnnouncements] = useState<Announcement[]>(
    []
  );
  const [unreadAnnouncements, setUnreadAnnouncements] =
    useState<Announcement[]>();

  const [error, setError] = useState("");
  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const announcements: Announcement[] = (await ErrorWrapper({
          functionToExecute: userGetAnnouncements,
          errorHandler: setError,
        })) as Announcement[];
        const readLogs = await ErrorWrapper({
          functionToExecute: userGetReadAnnouncements,
          errorHandler: setError,
        });
        const announcementIds = readLogs.map(
          (value: any) => value.announcement
        );
        const read = announcements.filter((announcement) =>
          announcementIds.includes(announcement._id.toString())
        );
        const unread = announcements.filter(
          (announcement) => !announcementIds.includes(announcement._id)
        );

        setReadAnnouncements(read);
        setUnreadAnnouncements(unread);
      } catch (error) {
        endOfExecutionHandler(error as Error);
      }
    }
    loadAnnouncements().then().catch();
  }, []);

  const processRead = async (announcement: Announcement) => {
    try {
      readAnnouncements.push(announcement);
      const newUnread = unreadAnnouncements?.filter(
        (ann) => ann._id !== announcement._id
      );
      await ErrorWrapper({
        functionToExecute: userCreateReadLog,
        errorHandler: setError,
        parameters: [announcement._id, new Date()],
      });
      setReadAnnouncements(readAnnouncements);
      setUnreadAnnouncements(newUnread);
      processViewDetail(announcement);
    } catch (error) {
      endOfExecutionHandler(error as Error);
    }
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
      footer={<ErrorBox errorMessage={error} />}
    />
  );
}
