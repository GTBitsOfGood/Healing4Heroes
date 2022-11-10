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
        <Stack.Screen name="Development" component={DevelopmentScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen
          name="Handler Information"
          component={HandlerInformationScreen}
        />
        <Stack.Screen
          name="Animal Information"
          component={AnimalInformationScreen}
        />
        <Stack.Screen
          name="Add Training Log"
          component={AddTrainingLogScreen}
        />
        <Stack.Screen
          name="Upload Video Log"
          component={TrainingVideoLogScreen}
        />
        <Stack.Screen name="User Dashboard" component={UserDashboardScreen} />
        <Stack.Screen name="Admin Dashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="Admin User List" component={AdminUserList} />
        <Stack.Screen
          name="Detailed User Screen"
          component={AdminDetailedUserScreen}
        />

        <Stack.Screen
          name="Admin User Verification"
          component={AdminUserVerificationScreen}
        />

        <Stack.Screen
          name="Storage Example Screen"
          component={StorageExampleScreen}
        />
        <Stack.Screen
          name="Step Overlay Example Screen"
          component={StepOverlayExampleScreen}
        />
        <Stack.Screen
          name="View All Logs Screen"
          component={ViewAllLogsScreen}
        />
        <Stack.Screen
          name="View Single Log Screen"
          component={ViewSingleLogScreen}
        />
        <Stack.Screen
          name="Passcode Screen"
          component={PasscodeVerificationScreen}
        />

        <Stack.Screen
          name="Upload Profile Image"
          component={UploadProfileImageScreen}
        />
        <Stack.Screen
          name="Create Announcement"
          component={CreateAnnouncementScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
