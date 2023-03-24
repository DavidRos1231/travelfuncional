import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import RegisterForm from "../components/account/RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen(props) {
  console.log(props);
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../assets/imgs/loadingMomichi.jpg")}
        style={styles.logo}
      />
      <View style={styles.viewForm}>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
