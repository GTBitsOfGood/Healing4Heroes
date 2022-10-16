import React, { ReactElement } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface StepOverlayProps {
  headerComponent: ReactElement;
  pageBody: ReactElement;
  pageIcon?: ReactElement;
}
export default function DashboardOverlay({
  headerComponent,
  pageBody,
  pageIcon,
}: StepOverlayProps) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View>{headerComponent}</View>
          {pageIcon && <View style={styles.iconCircle}>{pageIcon}</View>}
        </View>

        <ScrollView>{pageBody}</ScrollView>
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
    marginBottom: 35,
  },
});
