import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {
  getAuth,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default function ChangeEmailForm(props) {
  const { onClose, onReload } = props;

  const [showPass, setShowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      confirmPass: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Correo electrónico no válido").required("Correo electrónico requerido"),
      confirmPass: Yup.string().required("Contraseña requerida"),
    }),
    validateOnChange: false,

    onSubmit: async (formData) => {
      try {
        console.log(formData);
        const currentUser = getAuth().currentUser;
        const credential = EmailAuthProvider.credential(
            currentUser.email,
            formData.confirmPass
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updateEmail(currentUser, formData.email);
        Toast.show({
            type: "success",
            position: "bottom",
            text1: "Correo electrónico actualizado correctamente",
        });
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al actualizar correo electrónico",
        });
      }
    },
  });

  const showHidePass = () => {
    setShowPass(!showPass);
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nuevo correo electrónico"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Confirmar contraseña"
        secureTextEntry={!showPass}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            color="#c2c2c2"
            onPress={showHidePass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("confirmPass", text)}
        errorMessage={formik.errors.confirmPass}
      />
      <Button
        title="Cambiar correo"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForm: {
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
  },
  btnStyle: {
    backgroundColor: "#0d5bd7",
  },
});
