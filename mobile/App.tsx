import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
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
import AdminDetailedUserScreen from "./screens/Admin/AdminDetailedUserScreen";
import PasscodeVerificationScreen from "./screens/Onboarding/PasscodeVerificationScreen";
import CreateAnnouncementScreen from "./screens/Announcements/CreateAnnouncementScreen";
import { Screens } from "./utils/types";
import ForgotPasswordScreen from "./screens/Onboarding/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/Onboarding/ResetPasswordScreen";
import ViewAllAnnouncementsScreen from "./screens/Announcements/ViewAllAnnouncements";
import ViewSingleAnnouncementScreen from "./screens/Announcements/ViewSingleAnnouncementScreen";
import BaseOverlayExampleScreen from "./screens/Development/BaseOverlayExampleScreen";
import AnalyticsDashboardScreen from "./screens/Analytics/AnalyticsDashboardScreen";
import AnalyticsUserList from "./screens/Analytics/AnalyticsUserList";
import * as SplashScreen from "expo-splash-screen";
import { userGetUserInfo } from "./actions/User";
import { Role } from "./utils/types";
import { auth } from "./utils/firebase";
import PartnershipsScreen from "./screens/Onboarding/PartnershipsScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<Screens>(
    Screens.DEVELOPMENT_SCREEN
  );
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setInitialRoute(Screens.DEVELOPMENT_SCREEN);
      setAppIsReady(true);
    } else {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const user = await userGetUserInfo();
          if (user.roles?.includes(Role.NONPROFIT_ADMIN)) {
            setInitialRoute(Screens.ADMIN_DASHBOARD_SCREEN);
          } else {
            setInitialRoute(Screens.USER_DASHBOARD_SCREEN);
          }
        }
        setAppIsReady(true);
      });
    }
  }, []);

  useEffect(() => {
    LogBox.ignoreAllLogs(); //Hide all warning notifications on front-end
  }, []);

  useFonts({
    "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
    "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
  });

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name={Screens.DEVELOPMENT_SCREEN}
          component={DevelopmentScreen}
          options={{ gestureEnabled: false }}
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
        <Stack.Screen
          name={Screens.BASE_OVERLAY_EXAMPLE_SCREEN}
          component={BaseOverlayExampleScreen}
        />
        <Stack.Screen
          name={Screens.ANALYTICS_DASHBOARD_SCREEN}
          component={AnalyticsDashboardScreen}
        />
        <Stack.Screen
          name={Screens.ANALYTICS_USER_LIST}
          component={AnalyticsUserList}
        />
        <Stack.Screen
          name={Screens.PARTNERSHIPS_SCREEN}
          component={PartnershipsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
