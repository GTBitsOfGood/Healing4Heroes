import React, { useEffect } from "react";
import { View, StyleSheet, Text, BackHandler } from "react-native";
import GenericHeader from "../../components/GenericHeader";
import BaseOverlay from "../../components/Overlays/BaseOverlay";
import { getFormattedDate } from "../../utils/helper";

export default function ViewSingleAnnouncementScreen(props: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.goBack();
      return true;
    });
  });

  const { announcement } = props.route.params;
  return (
    <BaseOverlay
      header={
        <GenericHeader
          navigationProp={props.navigation}
          headerTitle={getFormattedDate(new Date(announcement.date))}
        />
      }
      body={
        <View>
          <View style={styles.textCard}>
            <Text style={styles.title}>{announcement.title}</Text>
          </View>
          <View style={styles.bigTextCard}>
            <Text style={styles.title}>{announcement.description}</Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  textCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
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
    minHeight: 300,
  },
});
