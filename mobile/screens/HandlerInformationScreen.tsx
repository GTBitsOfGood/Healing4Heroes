import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Keyboard } from "react-native";
import { HandlerType, Role, User } from "../utils/types";
import { userGetUserInfo, userUpdateUser } from "../actions/User";
import StepOverlay from "../components/StepOverlay";
import { Ionicons } from "@expo/vector-icons";

const dropDownItems = [
  { label: "Veteran", value: HandlerType.HANDLER_VETERAN },
  { label: "Civilian", value: HandlerType.HANDLER_CIVILIAN },
  { label: "Child", value: HandlerType.HANDLER_CHILD },
  { label: "Volunteer", value: "volunteer" },
];

export default function HandlerInformationScreen(props: any) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User>();
  useEffect(() => {
    DropDownPicker.setListMode("SCROLLVIEW");
    async function getUser() {
      const user = await userGetUserInfo();
      return user;
    }
    getUser().then((result) => setUser(result));

    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("Handler Information");
      return true;
    });
  }, []);

  const updateUserInfo = async () => {
    const user = await userUpdateUser(
      undefined,
      firstName,
      lastName,
      dropDownValue as unknown as HandlerType
    );
    return user;
  };

  const validateInput = () => {
    if (!firstName || !lastName) {
      setError("Please enter your first and last name.");
      return;
    } else if (!dropDownValue) {
      setError("Please choose what describes you best.");
      return;
    }

    setError("");
    return true;
  };

  const submitHandlerInformation = async () => {
    const validInput = validateInput();
    if (validInput) {
      const userUpdate = await updateUserInfo();
      if (userUpdate) {
        if ((user as User).roles?.includes(Role.NONPROFIT_ADMIN)) {
          props.navigation.navigate("Admin Dashboard");
        } else {
          props.navigation.navigate("Animal Information", {
            params: {
              handlerId: (user as User)._id,
            },
          });
        }
        return;
      } else {
        setError("Something went wrong! Please try again");
        return;
      }
    }
  };

  return (
    <StepOverlay
      circleCount={3}
      numberSelected={1}
      headerName="Getting Started"
      buttonFunction={submitHandlerInformation}
      error={error}
      pageIcon={<Ionicons name="person" size={24} color="black" />}
      pageBody={
        <View style={styles.container}>
          <Text style={styles.label}>What is your first name?*</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#999999"
            value={firstName}
            onChangeText={setFirstName}
          />

          <Text style={styles.label}>What is your last name?*</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#999999"
            value={lastName}
            onChangeText={setLastName}
          />

          <Text style={styles.label}>What describes you best?*</Text>
          <DropDownPicker
            open={dropDownOpen}
            setOpen={setDropDownOpen}
            items={dropDownItems}
            value={dropDownValue}
            setValue={setDropDownValue}
            style={styles.input}
            dropDownDirection="AUTO"
            placeholderStyle={{
              color: "#999999",
            }}
            dropDownContainerStyle={styles.dropDownContainer}
            onOpen={() => {
              Keyboard.dismiss();
            }}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: 20,
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
  },
  label: {
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    marginBottom: 40,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
  },
  dropDownContainer: {
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    paddingHorizontal: 6,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#666666",
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
});
