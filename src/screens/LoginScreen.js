import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "../components/account/LoginForm";

export default function LoginScreen() {
  //siempre y cuando esten en un stack o en un tab
  const navigation = useNavigation();
  console.log(navigation);

  const registerNow = () => {
    navigation.navigate("registers");
  };
  return (
    <View>
      <Image
        source={require("../../assets/imgs/loadingMomichi.jpg")}
        style={styles.logo}
      />

      <View style={styles.contentForm}>
        <LoginForm />
        <Text style={styles.text}>
          ¿Aún no tienes cuenta?{" "}
          <Text style={styles.textBtn} onPress={registerNow}>
            Registrate
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  contentForm: {
    marginHorizontal: 40,
  },
  text: {
    marginTop: 15,
    marginHorizontal: 10,
    textAlign: "center",
  },
  textBtn: {
    color: "#0d5bd7",
    fontWeight: "bold",
  },
});
