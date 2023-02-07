import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import UserEntry from "../../components/UserEntry";
import { ButtonDirection, Screens, User, UserFilter } from "../../utils/types";
import { adminGetUsers } from "../../actions/Admin";
import { Types } from "mongoose";
import PaginatedOverlay from "../../components/Overlays/PaginatedOverlay";
import { ErrorWrapper } from "../../utils/error";

const PAGE_SIZE = 6;

export default function AdminUserList(props: any) {
  const { filter } = props.route.params;
  const [allUsers, setAllUsers] = useState<User[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState("");

  const removeUserFromList = (errorMessage: string, userId: Types.ObjectId) => {
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    const newUserList = allUsers[currentPage].filter(
      (user) => user._id !== userId
    );
    allUsers[currentPage] = newUserList;
    setAllUsers([...allUsers]);
  };

  useEffect(() => {
    async function loadUsers() {
      const users = await ErrorWrapper({
        functionToExecute: adminGetUsers,
        errorHandler: setError,
        parameters: [PAGE_SIZE, undefined, filter],
      });
      setAllUsers([users]);
    }
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });

    loadUsers().catch().then();
  }, []);
  const processNext = async (direction: ButtonDirection) => {
    if (direction === ButtonDirection.BUTTON_BACKWARD) {
      setCurrentPage(Math.max(currentPage - 1, 0));
    }

    if (direction === ButtonDirection.BUTTON_FORWARD) {
      // If we are on last page and have a full page of users, we want to load more users
      const lastPage = allUsers.length - 1;
      if (currentPage === lastPage && allUsers[lastPage].length === PAGE_SIZE) {
        const afterId = allUsers[lastPage][PAGE_SIZE - 1]._id;

        const newUsers = await ErrorWrapper({
          functionToExecute: adminGetUsers,
          errorHandler: setError,
          parameters: [PAGE_SIZE, afterId, filter],
        });
        if (newUsers && newUsers.length > 0) {
          allUsers.push(newUsers);
          setAllUsers(allUsers);
          setCurrentPage(currentPage + 1);
        }
      } else if (currentPage !== lastPage) {
        // We are in a page in the middle
        setCurrentPage(currentPage + 1);
      }
    }
  };
  return (
    <PaginatedOverlay
      navigationProp={props.navigation}
      paginationButtonFunction={processNext}
      headerTitle={"View Users"}
      errorMessage={error}
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
