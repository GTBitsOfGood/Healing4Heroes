import React from "react";
import LoginScreen from "./screens/Onboarding/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./screens/Onboarding/SignUpScreen";
import HandlerInformationScreen from "./screens/Onboarding/HandlerInformationScreen";
import AnimalInformationScreen from "./screens/Onboarding/AnimalInformationScreen";
import UserDashboardScreen from "./screens/User/UserDashboardScreen";
import AdminDashboardScreen from "./screens/Admin/AdminDashboardScreen";
import LandingScreen from "./screens/Onboarding/LandingScreen";
import DevelopmentScreen from "./screens/Development/DevelopmentScreen";
import { useFonts } from "expo-font";
import StorageExampleScreen from "./screens/Development/StorageExampleScreen";
import StepOverlayExampleScreen from "./screens/Development/StepOverlayExampleScreen";
import TrainingVideoLogScreen from "./screens/Training/TrainingVideoLogScreen";
import ViewAllLogsScreen from "./screens/Training/ViewAllLogsScreen";
import ViewSingleLogScreen from "./screens/Training/ViewSingleLogScreen";
import UploadProfileImageScreen from "./screens/Onboarding/UploadProfileImageScreen";
import AddTrainingLogScreen from "./screens/Training/AddTrainingLogScreen";
import AdminUserList from "./screens/Admin/AdminUserListScreen";
import AdminUserVerificationScreen from "./screens/Admin/AdminUserVerificationScreen";
import AdminDetailedUserScreen from "./screens/Admin/AdminDetailedUserScreen";
import PasscodeVerificationScreen from "./screens/Onboarding/PasscodeVerificationScreen";
import CreateAnnouncementScreen from "./screens/Announcements/CreateAnnouncementScreen";
import { Screens } from "./utils/types";
import ForgotPasswordScreen from "./screens/Onboarding/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/Onboarding/ResetPasswordScreen";
import ViewAllAnnouncementsScreen from "./screens/Announcements/ViewAllAnnouncements";
import ViewSingleAnnouncementScreen from "./screens/Announcements/ViewSingleAnnouncementScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  useFonts({
    "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
    "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Development"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={Screens.DEVELOPMENT_SCREEN}
          component={DevelopmentScreen}
        />
        <Stack.Screen name={Screens.LANDING_SCREEN} component={LandingScreen} />
        <Stack.Screen name={Screens.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={Screens.SIGN_UP_SCREEN} component={SignUpScreen} />
        <Stack.Screen
          name={Screens.HANDLER_INFORMATION_SCREEN}
          component={HandlerInformationScreen}
        />
        <Stack.Screen
          name={Screens.ANIMAL_INFORMATION_SCREEN}
          component={AnimalInformationScreen}
        />
        <Stack.Screen
          name={Screens.ADD_TRAINING_LOG_SCREEN}
          component={AddTrainingLogScreen}
        />
        <Stack.Screen
          name={Screens.UPLOAD_VIDEO_LOG_SCREEN}
          component={TrainingVideoLogScreen}
        />
        <Stack.Screen
          name={Screens.USER_DASHBOARD_SCREEN}
          component={UserDashboardScreen}
        />
        <Stack.Screen
          name={Screens.ADMIN_DASHBOARD_SCREEN}
          component={AdminDashboardScreen}
        />
        <Stack.Screen
          name={Screens.ADMIN_USER_LIST_SCREEN}
          component={AdminUserList}
        />
        <Stack.Screen
          name={Screens.ADMIN_DETAILED_USER_SCREEN}
          component={AdminDetailedUserScreen}
        />

        <Stack.Screen
          name={Screens.ADMIN_USER_VERIFICATION_SCREEN}
          component={AdminUserVerificationScreen}
        />

        <Stack.Screen
          name={Screens.STORAGE_EXAMPLE_SCREEN}
          component={StorageExampleScreen}
        />
        <Stack.Screen
          name={Screens.STEP_OVERLAY_EXAMPLE_SCREEN}
          component={StepOverlayExampleScreen}
        />
        <Stack.Screen
          name={Screens.VIEW_ALL_LOGS_SCREEN}
          component={ViewAllLogsScreen}
        />
        <Stack.Screen
          name={Screens.VIEW_SINGLE_LOG_SCREEN}
          component={ViewSingleLogScreen}
        />
        <Stack.Screen
          name={Screens.PASSCODE_VALIDATION_SCREEN}
          component={PasscodeVerificationScreen}
        />

        <Stack.Screen
          name={Screens.UPLOAD_PROFILE_IMAGE_SCREEN}
          component={UploadProfileImageScreen}
        />
        <Stack.Screen
          name={Screens.CREATE_ANNOUNCEMENT_SCREEN}
          component={CreateAnnouncementScreen}
        />
        <Stack.Screen
          name={Screens.FORGOT_PASSWORD_SCREEN}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={Screens.RESET_PASSWORD_SCREEN}
          component={ResetPasswordScreen}
        />
        <Stack.Screen
          name={Screens.VIEW_ALL_ANNOUNCEMENTS_SCREEN}
          component={ViewAllAnnouncementsScreen}
        />
        <Stack.Screen
          name={Screens.VIEW_SINGLE_ANNOUNCEMENT_SCREEN}
          component={ViewSingleAnnouncementScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
