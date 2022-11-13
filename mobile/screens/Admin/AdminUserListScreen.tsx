import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import UserEntry from "../../components/UserEntry";
import UserOverlay from "../../components/Overlays/UserOverlay";
import { Screens, User, UserFilter } from "../../utils/types";
import { adminGetUsers } from "../../actions/Admin";
import { Types } from "mongoose";

const PAGE_SIZE = 7;

export default function AdminUserList(props: any) {
  const { filter } = props.route.params;
  const [allUsers, setAllUsers] = useState<User[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const removeUserFromList = (userId: Types.ObjectId) => {
    const newUserList = allUsers[currentPage].filter(
      (user) => user._id !== userId
    );
    allUsers[currentPage] = newUserList;
    setAllUsers(allUsers);
  };
  useEffect(() => {
    async function loadUsers() {
      const users = await adminGetUsers(PAGE_SIZE, undefined, filter);
      setAllUsers([users]);
    }

    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });

    loadUsers().catch().then();
  }, []);

  return (
    <UserOverlay
      navigationProp={props.navigation}
      pageBody={
        <View style={styles.container}>
          <Text style={styles.title}>All Users</Text>
          {allUsers.length > 0 &&
            allUsers[currentPage].map((user, index) => {
              return (
                <UserEntry
                  userId={user._id}
                  username={user.firstName + " " + user.lastName}
                  userEmail={user.email}
                  key={index}
                  isVerification={filter === UserFilter.UNVERIFIED_USERS}
                  verifyCallback={removeUserFromList}
                  callbackFunction={() => {
                    props.navigation.navigate(
                      Screens.ADMIN_DETAILED_USER_SCREEN,
                      {
                        user,
                      }
                    );
                  }}
                />
              );
            })}
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
  },

  dashboardHeader: {
    flexDirection: "row",
  },

  profileName: {
    flexGrow: 1,
    paddingLeft: 10,
    alignSelf: "center",
    color: "grey",
    fontFamily: "DMSans-Bold",
  },

  title: {
    color: "grey",
    fontFamily: "DMSans-Bold",
  },
});
