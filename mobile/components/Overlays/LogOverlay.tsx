import React, { ReactElement, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface LogOverlayProps {
  circleCount: number;
  numberSelected: number;
  error: string;
  buttonFunction: ((event: GestureResponderEvent) => void) | undefined;
  pageBody: ReactElement;
  pageIcon?: ReactElement;
  parentProps: any;
}
export default function LogOverlay({
  circleCount,
  numberSelected,
  buttonFunction,
  pageBody,
  error,
  pageIcon,
  parentProps,
}: LogOverlayProps) {
  const [disableButton, setDisableButton] = useState(false);
  const [processedDate, setProcessedDate] = useState<Date | null>();

  useEffect(() => {
    setProcessedDate(new Date());
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              onPress={() => {
                parentProps.navigation.goBack();
              }}
            >
              <Ionicons name="ios-chevron-back-sharp" size={26} color="grey" />
            </TouchableOpacity>

            <View style={styles.textTitle}>
              <Text style={styles.header}>Add New Log</Text>
            </View>

            <TouchableOpacity
            // onPress={() => props.navigation.navigate("Add Training Log")}
            >
              <Ionicons name="ios-chevron-back-sharp" size={26} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerDate}>
            {`${processedDate?.getMonth()}-${processedDate?.getDate()}-${processedDate?.getFullYear()}`}
          </Text>
          {pageIcon && <View style={styles.iconCircle}>{pageIcon}</View>}
        </View>
        <ScrollView>{pageBody}</ScrollView>

        {error && (
          <View style={styles.failedContainer}>
            <Text style={styles.failedText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity
          disabled={disableButton}
          style={[
            styles.button,
            disableButton ? styles.disabledButton : styles.button,
          ]}
          onPress={async (e) => {
            setDisableButton(true);
            if (buttonFunction) {
              await buttonFunction(e);
            }

            setDisableButton(true);
          }}
        >
          {circleCount > numberSelected ? (
            <Text style={styles.buttonText}>Next</Text>
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>

        <View style={styles.circles}>
          {[...Array(numberSelected).keys()].map((i) => (
            <View key={i} style={[styles.circle, styles.selected]} />
          ))}
          {[...Array(circleCount - numberSelected).keys()].map((i) => (
            <View key={numberSelected + i} style={[styles.circle]} />
          ))}
        </View>
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

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 10,
    marginBottom: 10,
  },
  headerDate: {
    color: "blue",
    fontWeight: "bold",
  },
  backIcon: {
    flex: 0.5,
  },
  textTitle: {
    flex: 10,
  },

  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  button: {
    paddingVertical: 16,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
