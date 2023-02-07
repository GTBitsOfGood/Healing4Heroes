import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Announcement } from "../utils/types";
import { getFormattedDate } from "../utils/helper";
import shadowStyle from "../utils/styles"

interface AnnouncementCardProps {
  isRead: boolean;
  announcement: Announcement;
  callbackFunction?: (announcement: Announcement) => void;
  dateOfAnnouncement?: Date;
  title?: string;
}
const AnnouncementCard = ({
  isRead,
  callbackFunction,
  dateOfAnnouncement,
  title,
  announcement,
}: AnnouncementCardProps) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        if (callbackFunction) {
          await callbackFunction(announcement);
        }
      }}
      style={[styles.userEntryContainer, shadowStyle.shadow]}
    >
      <View style={styles.userEntry}>
        <View style={styles.titleDateContainer}>
          <View style={styles.nameIconContainer}>
            <Text style={styles.userLogText}>
              {getFormattedDate(dateOfAnnouncement as Date)}
            </Text>
          </View>
          <View style={styles.nameIconContainer}>
            <Text
              style={styles.announcementTitleText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>
        </View>
        {isRead ? (
          <Ionicons name="md-mail-open-outline" size={24} color="#666666" />
        ) : (
          <Ionicons name="mail-unread-outline" size={24} color="#3F3BED" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userEntryContainer: {
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  userIcon: {
    marginHorizontal: 15,
  },
  userEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
    alignItems: "center",
  },

  userLogText: {
    color: "black",
    fontFamily: "DMSans-Bold",
    paddingLeft: 15,
    fontSize: 10,
  },
  announcementTitleText: {
    color: "gray",
    fontFamily: "DMSans-Bold",
    paddingLeft: 15,
    fontSize: 10,
  },

  userLogIcon: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: 0,
  },
  nameIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  titleDateContainer: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "65%",
  },
});

export default AnnouncementCard;
