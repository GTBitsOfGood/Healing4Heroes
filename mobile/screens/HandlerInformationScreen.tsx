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
import { getUserInfo, updateUser } from "../actions/User";

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
    async function getUser() {
      const user = await getUserInfo();
      return user;
    }
    getUser().then((result) => setUser(result));

    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate("Handler Information");
      return true;
    });
  }, []);

  const updateUserInfo = async () => {
    const user = await updateUser(
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

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Getting Started</Text>
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
          dropDownContainerStyle={styles.dropDownContainer}
          onOpen={() => {
            Keyboard.dismiss();
          }}
        />
      </View>
      <View>
        {error && (
          <View style={styles.failedContainer}>
            <Text style={styles.failedText}>{error}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
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
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <View style={styles.circles}>
          <View style={[styles.circle, styles.selected]} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  header: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "DMSans-Medium",
    color: "#666666",
    marginTop: 35,
  },
  label: {
    marginTop: 60,
    marginBottom: 16,
    fontSize: 20,
    color: "#333333",
    fontFamily: "DMSans-Bold",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
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
