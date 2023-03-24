import { StyleSheet } from "react-native";
import React from "react";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
  const { isVisible, close, children } = props;

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={close}
      overlayStyle={styles.overlay}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
  },
});
