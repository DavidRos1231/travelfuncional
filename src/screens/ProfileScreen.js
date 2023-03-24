import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import ProfileInfo from "../components/account/ProfileInfo";
import LoadingComponent from "../components/common/LoadingComponent";
import ProfileOptions from "../components/account/ProfileOptions";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const logOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigation.navigate("indexs");
    console.log("logout");
  };

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [reload, setReload] = useState(false);

  const onReload = () => {
    setReload((prevState) => !prevState);
  };
  
  return (
    <View>
      <ProfileInfo
        setLoading={setLoading}
        setLoadingText={setLoadingText}
      />
      <ProfileOptions onReload={onReload} />
      <Button
        title="Cerrar sesión"
        onPress={logOut}
        buttonStyle={styles.btn}
        titleStyle={styles.btnText}
      />
      <LoadingComponent visible={loading} text= {loadingText} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#E3E3E3",
    borderBottomColor: "#E3E3E3",
    paddingVertical: 10,
    marginTop: 30,
  },
  btnText: {
    color: "#0d5bd7",
  },
});
