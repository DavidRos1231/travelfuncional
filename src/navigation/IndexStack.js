import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function IndexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="indexs"
        component={IndexScreen}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen
        name="logins"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="registers"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
}
