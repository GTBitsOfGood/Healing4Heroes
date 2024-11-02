import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
  ScrollView,
} from "react-native";
import OnboardingOverlay from "../../components/Overlays/OnboardingOverlay";
import { Screens } from "../../utils/types";
import { Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function LandingScreen(props: any) {
  return (
    <OnboardingOverlay
      showBackDrop={true}
      footerSubText={""}
      footerMainText={""}
      headerText={""}
      pageBody={
        <View style={styles.bodyContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.headerText}>Welcome to Healing 4 Heroes!</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate(Screens.LOGIN_SCREEN)}
                style={styles.loginBtn}
              >
                <Text style={styles.loginBtnText}>Log In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(Screens.SIGN_UP_SCREEN)
                }
                style={styles.signupBtn}
              >
                <Text style={styles.signupBtnText}>Sign Up</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                // onPress={() =>
                //   props.navigation.navigate(Screens.DONATE_SCREEN)
                // }
                style={styles.signupBtn}
              >
                <Text style={styles.signupBtnText}>Donate</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.partnersContainer}>
            <Text style={styles.sectionHeader}>
              Support Us While Walking Your Dog!
            </Text>
            <Text style={styles.descriptionText}>
              Use WoofTrax to track your walks and earn money for Healing4Heroes
              at no cost to you! Simply select Healing4Heroes when creating your
              account.
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
          {Platform.OS === "web" ? (
            <View style={styles.netlifyContainer}>
              <TouchableOpacity
                style={styles.netlifyButton}
                onPress={() => Linking.openURL("https://www.netlify.com")}
              >
                <Image
                  style={styles.netlify}
                  source={require("./../../assets/images/netlify.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.quoteContainer}>
            <Text
              style={styles.quoteText}
            >{`"Not all wounds are visible"`}</Text>
            <Text style={styles.sponsorText}>Sponsors</Text>
            <ScrollView
              contentContainerStyle={styles.sponsorsContainer}
              horizontal={true}
            >
              <Image
                style={styles.sponsorLogo}
                source={require("./../../assets/images/Zaxby.png")}
                resizeMode="contain"
              />
              <Image
                style={styles.sponsorLogo}
                source={require("./../../assets/images/Signal_Security.png")}
                resizeMode="contain"
              />
            </ScrollView>
          </View>
          <View style={styles.socialMediaContainer}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://m.youtube.com/@healing4heroes916")
              }
              style={styles.socialIcon}
            >
              <FontAwesome name="youtube" size={30} color="#FF0000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.instagram.com/healing4heroes?igsh=eTlxOTZxazlsaDl0&utm_source=qr"
                )
              }
              style={styles.socialIcon}
            >
              <FontAwesome name="instagram" size={30} color="#C13584" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://m.facebook.com/healing4heroes.org/")
              }
              style={styles.socialIcon}
            >
              <FontAwesome name="facebook" size={30} color="#4267B2" />
            </TouchableOpacity>
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

  logoContainer: {
    marginTop: 50,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    width: 120,
    height: 120,
    backgroundColor: "#666666",
  },

  loginContainer: {
    marginTop: 0,
    padding: 16,
    paddingBottom: 32,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  headerText: {
    margin: 10,
    fontSize: 18,
    paddingTop: 20,
    fontWeight: "bold",
  },

  buttonContainer: {
    width: "90%",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  loginBtn: {
    marginTop: 20,
    backgroundColor: "#3F3BED",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  signupBtn: {
    marginTop: 20,
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#3F3BED",
    borderWidth: 1,
  },

  loginBtnText: {
    color: "white",
    fontSize: 16,
  },

  signupBtnText: {
    color: "#3F3BED",
    fontSize: 16,
  },

  netlifyContainer: {
    width: "100%",
    height: 80,
    marginTop: 20,
    alignItems: "center",
  },

  netlifyButton: {
    width: "100%",
    height: "100%",
  },

  netlify: {
    width: "100%",
    height: "100%",
  },
  quoteContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
  },
  quoteText: {
    fontFamily: "Baskerville",
    fontStyle: "italic",
    fontSize: 22,
  },
  sponsorText: {
    fontWeight: "800",
    fontSize: 15,
  },
  sponsorsContainer: {
    display: "flex",
    width: Dimensions.get("window").width - 68,
    flexDirection: "row",
    justifyContent: "space-evenly",
    overflow: "scroll",
    gap: 10,
  },
  sponsorLogo: {
    width: (Dimensions.get("window").width - 68) / 3,
    maxHeight: 100,
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  socialIcon: {
    marginHorizontal: 15,
    padding: 10,
  },
  partnersContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
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
