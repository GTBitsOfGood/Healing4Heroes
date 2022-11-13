import React from "react";
import { View, StyleSheet, Text } from "react-native";
import UserOverlay from "../../components/Overlays/UserOverlay";
import { getFormattedDate } from "../../utils/helper";

export default function ViewSingleAnnouncementScreen(props: any) {
  const {announcement} = props.route.params;
  return <UserOverlay
    noPaginatedButtons={true}
    navigationProp={props.navigation}
    headerTitle={getFormattedDate(new Date(announcement.date))}
    pageBody={<View>
      <View style={styles.textCard}>
        <Text style={styles.title}>{announcement.title}</Text>
      </View>
      <View style={styles.bigTextCard}>
        <Text style={styles.title}>{announcement.description}</Text>
      </View>

    </View>}

  />;
}

const styles = StyleSheet.create({  textCard: {
  backgroundColor: "white",
  borderRadius: 12,
  padding: 20,
  display: "flex",
  justifyContent: "center",
  marginBottom: 20
},
title: {
  fontFamily: "DMSans-Medium",
  color: "grey",
},
bigTextCard: {
  backgroundColor: "white",
  borderRadius: 12,
  padding: 20,
  display: "flex",
  marginBottom: 20,
  minHeight: 300
}
})