import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";

export default function LoadingComponent(props) {
  const { visible, text } = props;
  return (
    <Overlay isVisible={visible} overlayStyle={styles.overlay}>
      <View style={styles.viewLoad}>
        <ActivityIndicator size="large" color="#CCCCCCC" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingComponent.defaultProps = {
  visible: false,
  text: "",
};

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#FFFFFF",
    borderColor: "#00a680",
    borderWidth: 2,
    borderRadius: 10,
  },
  viewLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#00a680",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
