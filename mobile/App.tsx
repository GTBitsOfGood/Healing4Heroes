import React from "react";
import { StyleSheet, View, Text } from "react-native";
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

type RootStackParamList = {
  "Development": undefined,
  "Animal Information": {
    handlerName: string,
    handlerRole: string
  },
  "Landing": undefined,
  "Login": undefined,
  "Sign Up": undefined,
  "Handler Information": undefined,
  "User Dashboard": undefined,
  "Admin Dashboard": undefined,
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Development">
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
