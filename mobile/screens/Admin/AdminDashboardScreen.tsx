import React, { useEffect } from "react";
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 


export default function AdminDashboardScreen(props: any) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("Admin Dashboard");
      return true;
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={36} color="black" />
        <Text style={styles.label}>Admin</Text>
      </View>
      <Text style={styles.label2}>Announcements</Text>
      <View style={styles.announcementContainer}>
        <View style={styles.announcement}>
          <Text style={styles.announcementText}>This is an announcement</Text>
        </View>
        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => props.navigation.navigate("Create Announcement")}
        >
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label2}>User Summary</Text>
      <TouchableOpacity style={styles.bigButton}>
        <Text style={styles.bigButtonText}>View All Users</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bigButton}>
        <Text style={styles.bigButtonText}>Users with Negative Behavior</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bigButton}>
        <Text style={styles.bigButtonText}>New User Verification Portal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bigButton}>
        <Text style={styles.bigButtonText}>Users with 800 Hours</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 35,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  label: {
    marginLeft: 20,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  label2: {
    marginTop: 30,
    marginBottom: 16,
    fontSize: 18,
    color: "#666666",
    fontFamily: "DMSans-Bold",
  },
  announcementContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  announcement: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flex: 1,
  },
  announcementText: {
    size: 12,
    color: "#666666"
  },
  fab: {
    backgroundColor: "#666666",
    width: 48,
    height: 48,
    borderRadius: 48,
    padding: 12,
    marginLeft: 12,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6,
    elevation: 10,
    alignSelf: "center",
  },
  bigButton: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bigButtonText: {
    fontWeight: "700",
    fontSize: 12,
    color: "#9A9A9A"
  }
});
