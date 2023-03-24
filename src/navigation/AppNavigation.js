import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InformationScreen from "../screens/InformationScreen";
import IndexStack from "./IndexStack";
import DetailsStack from "./DetailsStack";
import { Icon } from "react-native-elements";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "#CCCCCC",
        tabBarIcon: ({ color, size }) => showIcon(route, color, size),
      })}
    >
      <Tab.Screen
        name="index"
        component={IndexStack}
        options={{ title: "Inicio" }}
      />

      <Tab.Screen
        name="details"
        component={DetailsStack}
        options={{ title: "Detalles" }}
      />

      <Tab.Screen
        name="info"
        component={InformationScreen}
        options={{ title: "Información", headerShown: true }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileStack}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

function showIcon(route, color, size) {
  let icon;
  if (route.name === "index") {
    icon = "account-cowboy-hat-outline";
  } else if (route.name === "details") {
    icon = "deathly-hallows";
  } else if (route.name === "info") {
    icon = "minecraft";
  } else if (route.name === "profile") {
    icon = "account";
  }

  return (
    <Icon type="material-community" name={icon} color={color} size={size} />
  );
}

//const Drawer = createDrawerNavigator();

// <Drawer.Navigator>
//   <Drawer.Screen
//     name="index"
//     component={IndexScreen}
//     options={{ title: "Inicio" }}
//   />

//   <Drawer.Screen
//     name="details"
//     component={DetailsScreen}
//     options={{ title: "Detalles" }}
//   />

//   <Drawer.Screen
//     name="info"
//     component={InformationScreen}
//     options={{ title: "Información" }}
//   />
// </Drawer.Navigator>

// const Stack = createNativeStackNavigator();

// export default function AppNavigation() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="index"
//         component={IndexScreen}
//         options={{ title: "Inicio" }}
//       />

//       <Stack.Screen
//         name="details"
//         component={DetailsScreen}
//         options={{ title: "Detalles" }}
//       />

//       <Stack.Screen
//         name="info"
//         component={InformationScreen}
//         options={{ title: "Información" }}
//       />
//     </Stack.Navigator>
//   );
// }
