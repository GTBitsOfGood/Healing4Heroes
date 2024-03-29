import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import UserEntry from "../../components/UserEntry";
import { ButtonDirection, Screens, User, UserFilter } from "../../utils/types";
import { adminGetUsers } from "../../actions/Admin";
import PaginatedOverlay from "../../components/Overlays/PaginatedOverlay";
import { ErrorWrapper } from "../../utils/error";

const PAGE_SIZE = 6;

export default function AnalyticsUserList(props: any) {
  const { completed, totalUsers, usersCompletedTraining } = props.route.params;
  const [allUsers, setAllUsers] = useState<User[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState<number>(0);

  const filter = completed
    ? UserFilter.WITH_800_HOURS_USERS
    : UserFilter.WITHOUT_800_HOURS_USERS;

  useEffect(() => {
    async function loadUsers() {
      const result = await ErrorWrapper({
        functionToExecute: adminGetUsers,
        errorHandler: setError,
        parameters: [PAGE_SIZE, undefined, filter, ""],
      });
      // setAllUsers([users]);
      if (result) {
        setAllUsers([[...result.users]]);
        setTotalPages(Math.ceil(result.totalCount / PAGE_SIZE));
      }
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
          parameters: [PAGE_SIZE, afterId, filter, ""],
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
      headerTitle={
        completed == true
          ? "Users Who Completed Training"
          : "Users Who Did Not Complete Training"
      }
      currentPage={currentPage + 1}
      totalPages={totalPages}
      errorMessage={error}
      pageBody={
        <View style={styles.container}>
          <View style={styles.total}>
            <Text style={styles.leftText}>{usersCompletedTraining}</Text>
            <Text style={styles.rightText}> / {totalUsers} Completed</Text>
          </View>
          {allUsers.length > 0 &&
            allUsers[currentPage].map((user, index) => {
              return (
                <UserEntry
                  userId={user._id}
                  username={user.firstName + " " + user.lastName}
                  userEmail={user.email}
                  key={index}
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

  searchView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#3F3BED",
    alignItems: "center",
    borderWidth: 2,
    height: 45,
    borderRadius: 30,
  },

  searchInput: {
    flex: 1,
    marginLeft: 15,
  },

  searchIcon: {
    resizeMode: "stretch",
    alignItems: "center",
    marginLeft: 10,
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

  total: {
    flexDirection: "row",
    justifyContent: "center",
  },

  leftText: {
    fontWeight: "600",
    color: "blue",
  },

  rightText: {
    fontWeight: "600",
    color: "grey",
  },
});
