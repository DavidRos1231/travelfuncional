import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginScreen from "./LoginScreen";
import LoadingComponent from "../components/common/LoadingComponent";

export default function IndexScreen(props) {
  const { navigation } = props;
  const [session, setSession] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setSession(user ? true : false);
    });
  }, []);

  if (session === null) {
    return <LoadingComponent visible={true} text={"validando"} />;
  }

  return session ? (
    <View>
      <Text>IndexScreen</Text>
      <Button
        title="Detalles"
        onPress={() => {
          navigation.navigate("details");
        }}
      />

      <Button
        title="Información"
        onPress={() => {
          navigation.navigate("info");
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("details", { screen: "logins" }); //nombre del stack , //vista del stack
        }}
      />
    </View>
  ) : (
    <LoginScreen />
  );
}

const styles = StyleSheet.create({});
