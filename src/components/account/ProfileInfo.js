import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Text } from "react-native-elements";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

export default function ProfileInfo(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;
  console.log("uid: " + uid);
  console.log("props: " + props);

  const [photoUrl, setPhotoUrl] = useState(photoURL);
  const [displayEmail, setDisplayEmail] = useState(email);

  const changePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    console.log(result);
    if (!result.canceled) uploadPhoto(result.uri);
  };

  const uploadPhoto = async (uri) => {
    setLoadingText("Cargando foto...");
    setLoading(true);
    console.log(uri);
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(getStorage(), `imgProfile/${uid}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("snapshot.metadata:" + snapshot.metadata);
      updatePhoto(snapshot.metadata.fullPath);
    });
  };

  const updatePhoto = async (imgPath) => {
    setLoadingText("Actualizando foto...");
    setLoading(true);
    console.log(imgPath);
    const storageRef = ref(getStorage(), imgPath);

    const urlImg = await getDownloadURL(storageRef);
    console.log("urlImg: " + urlImg);

    updateProfile(getAuth().currentUser, { photoURL: urlImg });
    setPhotoUrl(urlImg);
    setDisplayEmail(displayEmail);
    setLoading(false);
  };

  return (
    <View style={styles.viewPhoto}>
      <Avatar
        size="large"
        rounded={true}
        icon={{ type: "material", name: "person" }}
        containerStyle={styles.avatar}
        source={{ uri: photoUrl }}
      >
        <Avatar.Accessory size={25} onPress={changePhoto} />
      </Avatar>
      <View>
        <Text style={styles.title}>{displayName || "USUARIO"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPhoto: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    backgroundColor: "#f2f2f2",
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "#0d5bd7",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
