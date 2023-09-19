import React, { ReactElement } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../IconButton";
import { ButtonDirection } from "../../utils/types";
import BaseOverlay from "./BaseOverlay";
import GenericHeader from "../GenericHeader";
import ErrorBox from "../ErrorBox";

interface PaginatedOverlayProps {
  pageBody: ReactElement;
  footer?: ReactElement;
  headerTitle: string;
  navigationProp?: any;
  currentPage: number;
  errorMessage?: string;
  paginationButtonFunction?: (direction: ButtonDirection) => void;
}
export default function PaginatedOverlay({
  pageBody,
  navigationProp,
  headerTitle,
  currentPage,
  paginationButtonFunction,
  errorMessage,
}: PaginatedOverlayProps) {
  return (
    <BaseOverlay
      header={
        <GenericHeader
          headerTitle={headerTitle}
          navigationProp={navigationProp}
        />
      }
      body={pageBody}
      footer={
        <>
          <View style={styles.footerContainer}>
            <IconButton
              icon={
                <View style={styles.backgroundCircle}>
                  <Ionicons name="chevron-back" size={40} color="black" />
                </View>
              }
              callbackFunction={() => {
                if (paginationButtonFunction) {
                  paginationButtonFunction(ButtonDirection.BUTTON_BACKWARD);
                }
              }}
            ></IconButton>
            <Text style={styles.pageText}>{currentPage}</Text>
            <IconButton
              icon={
                <View style={styles.backgroundCircle}>
                  <Ionicons name="chevron-forward" size={40} color="black" />
                </View>
              }
              callbackFunction={() => {
                if (paginationButtonFunction) {
                  paginationButtonFunction(ButtonDirection.BUTTON_FORWARD);
                }
              }}
            ></IconButton>
          </View>
          <ErrorBox errorMessage={errorMessage} />
        </>
      }
    />
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
    // marginTop: 20,
    marginBottom: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "DMSans-Bold",
    color: "grey",
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  backgroundCircle: {
    backgroundColor: "white",
    borderRadius: 1000,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pageText: {
    fontFamily: "DMSans-Bold",
    fontSize: 16,
    marginTop: 15,
  },
});
