import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function DetailsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="details"
        component={DetailsScreen}
        options={{ title: "Detalles" }}
      />
    </Stack.Navigator>
  );
}
