import React, { ReactElement } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../IconButton";

interface UserOverlayProps {
  pageBody: ReactElement;
  footer?: ReactElement;
  navigationProp?: any;
  noPaginatedButtons?: boolean;
  headerTitle?: string;
}
export default function UserOverlay({
  pageBody,
  navigationProp,
  noPaginatedButtons,
  headerTitle,
  footer
}: UserOverlayProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <IconButton
            icon={
              <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
            }
            callbackFunction={() => {
              if (navigationProp) {
                navigationProp.goBack();
              }
            }}
          ></IconButton>
          <Text style={styles.headerText}>{headerTitle}</Text>
          <View></View>
        </View>
        <ScrollView>{pageBody}</ScrollView>
        <View style={styles.footerContainer}>
          {!noPaginatedButtons && (
            <IconButton
              icon={
                <View style={styles.backgroundCircle}>
                  <Ionicons name="chevron-back" size={40} color="white" />
                </View>
              }
            ></IconButton>
          )}
          {!noPaginatedButtons && (
            <IconButton
              icon={
                <View style={styles.backgroundCircle}>
                  <Ionicons name="chevron-forward" size={40} color="white" />
                </View>
              }
            ></IconButton>
          )}
        </View>
        {footer && <View>{footer}</View>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    paddingVertical: 40,
    paddingHorizontal: 34,
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },

  circles: {
    marginTop: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 3,
  },
  iconCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    backgroundColor: "#D9D9D9",
  },
  selected: {
    backgroundColor: "#666666",
  },
  failedContainer: {
    marginTop: 12,
    alignItems: "center",
    marginBottom: 12,
    padding: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    minWidth: "85%",
    backgroundColor: "#D9D9D9",
  },
  failedText: {
    fontSize: 12,
    fontWeight: "300",
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText:{
    fontFamily: "DMSans-Bold",
    color: "grey",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  backgroundCircle: {
    backgroundColor: "black",
    borderRadius: 1000,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
