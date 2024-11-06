import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";
import { FontAwesome } from "@expo/vector-icons";

export default function PartnershipsScreen({ navigation }: any) {
  return (
    <OnboardingOverlay
      showBackDrop={true}
      footerSubText={""}
      footerMainText={""}
      headerText={""}
      pageBody={
        <View style={styles.bodyContainer}>
          <View style={styles.partnersContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <FontAwesome name="arrow-left" size={24} color="#3F3BED" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Our Partnerships</Text>
            </View>

            <View style={styles.partnersSection}>
              <Text style={styles.sectionHeader}>
                Support Us While Walking Your Dog!
              </Text>
              <Text style={styles.descriptionText}>
                Use WoofTrax to track your walks and earn money for
                Healing4Heroes at no cost to you! Simply select Healing4Heroes
                when creating your account.
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL("https://wooftrax.com/")}
                style={styles.partnerButton}
              >
                <Text style={styles.partnerButtonText}>
                  Track Walks on WoofTrax
                </Text>
              </TouchableOpacity>

              <Text style={[styles.sectionHeader, { marginTop: 20 }]}>
                Volunteer Opportunities
              </Text>
              <Text style={styles.descriptionText}>
                Find and sign up for volunteer opportunities through our Golden
                Volunteer portal.
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://portal.goldenvolunteer.com/")
                }
                style={styles.partnerButton}
              >
                <Text style={styles.partnerButtonText}>View Opportunities</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 0,
    flex: 3,
  },
  partnersContainer: {
    marginTop: 0,
    padding: 16,
    paddingBottom: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginRight: 44,
  },
  partnersSection: {
    width: "100%",
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  partnerButton: {
    backgroundColor: "#3F3BED",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  partnerButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});
