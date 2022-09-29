import React from "react";
import { StyleSheet } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./screens/SignUpScreen";
import HandlerInformationScreen from "./screens/HandlerInformationScreen";
import AnimalInformationScreen from "./screens/AnimalInformationScreen";
import UserDashboardScreen from "./screens/UserDashboardScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import LandingScreen from "./screens/LandingScreen";
import DevelopmentScreen from "./screens/DevelopmentScreen";
import { useFonts } from "expo-font";
import AddTrainingLog from "./screens/AddTrainingLog";
import UploadVideoScreen from "./screens/UploadVideoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
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
        <Stack.Screen name="Add Training Log" component={AddTrainingLog} />
        <Stack.Screen name="Upload Video Log" component={UploadVideoScreen} />
        <Stack.Screen name="User Dashboard" component={UserDashboardScreen} />
        <Stack.Screen name="Admin Dashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
