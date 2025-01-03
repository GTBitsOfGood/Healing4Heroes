import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, BackHandler } from "react-native";
import UserEntry from "../../components/UserEntry";
import { ButtonDirection, Screens, User, UserFilter } from "../../utils/types";
import { adminGetUsers } from "../../actions/Admin";
import { Types } from "mongoose";
import PaginatedOverlay from "../../components/Overlays/PaginatedOverlay";
import { ErrorWrapper } from "../../utils/error";
import { AntDesign } from "@expo/vector-icons";

const PAGE_SIZE = 6;

export default function AdminUserList(props: any) {
  const { filter } = props.route.params;
  const [allUsers, setAllUsers] = useState<User[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [totalPages, setTotalPages] = useState<number>(0);

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

  async function loadUsers() {
    const result = await ErrorWrapper({
      functionToExecute: adminGetUsers,
      errorHandler: setError,
      parameters: [PAGE_SIZE, undefined, filter, searchText],
    });

    if (result) {
      setAllUsers([[...result.users]]);
      setTotalPages(Math.ceil(result.totalCount / PAGE_SIZE));
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      props.navigation.navigate(Screens.ADMIN_DASHBOARD_SCREEN);
      return true;
    });
    loadUsers().catch().then();
  }, []);

  const processNext = async (direction: ButtonDirection) => {
    let newPage = currentPage;

    if (direction === ButtonDirection.BUTTON_BACKWARD) {
      newPage = Math.max(currentPage - 1, 0);
    }

    if (direction === ButtonDirection.BUTTON_FORWARD) {
      // If we are on last page and have a full page of users, we want to load more users
      const lastPage = allUsers.length - 1;

      // If we are on the last page and it's full, fetch more users
      if (currentPage === lastPage && allUsers[lastPage].length === PAGE_SIZE) {
        const afterId = allUsers[lastPage][allUsers[lastPage].length - 1]._id;

        const newUsers = await ErrorWrapper({
          functionToExecute: adminGetUsers,
          errorHandler: setError,
          parameters: [PAGE_SIZE, afterId, filter, searchText],
        });

        if (newUsers && newUsers.users.length > 0) {
          setAllUsers([...allUsers, newUsers.users]);
          newPage = currentPage + 1;
        }
      } else if (currentPage !== lastPage) {
        // We are in a page in the middle
        newPage = currentPage + 1;
      }
    }
    setCurrentPage(newPage);
  };

  return (
    <PaginatedOverlay
      navigationProp={props.navigation}
      paginationButtonFunction={processNext}
      headerTitle={
        filter === UserFilter.NONPROFIT_USERS
          ? "All Users"
          : filter === UserFilter.NONPROFIT_ADMINS
          ? "Admins Users"
          : filter === UserFilter.UNVERIFIED_USERS
          ? "User Verification"
          : filter === UserFilter.WITH_800_HOURS_USERS
          ? "Users With 800 Hours"
          : "Viewing Users"
      }
      currentPage={currentPage + 1}
      totalPages={totalPages}
      errorMessage={error}
      pageBody={
        <View style={styles.container}>
          <View style={styles.searchView}>
            <AntDesign
              name="search1"
              size={20}
              color="#3F3BED"
              style={styles.searchIcon}
              onPress={loadUsers}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or email"
              placeholderTextColor="grey"
              onChange={(e) => {
                setCurrentPage(0);
                const { text } = e.nativeEvent;
                setSearchText(text);
              }}
              onEndEditing={loadUsers}
            />
          </View>
          {allUsers.length > 0 &&
            allUsers[currentPage].map((user, index) => {
              return (
                <UserEntry
                  userId={user._id}
                  username={user.firstName + " " + user.lastName}
                  userEmail={user.email}
                  key={index}
                  isVerification={filter === UserFilter.UNVERIFIED_USERS}
                  canDeleteUser={
                    filter === UserFilter.NONPROFIT_USERS ||
                    filter === UserFilter.NONPROFIT_ADMINS ||
                    filter === UserFilter.UNVERIFIED_USERS
                  }
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
});
