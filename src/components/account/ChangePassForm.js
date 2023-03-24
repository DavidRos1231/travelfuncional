import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export default function ChangePassForm(props) {
  const { onClose } = props;

  const [showPass, setShowPass] = useState(false);
  const formik = useFormik({
    initialValues: {
      pass: "",
      newPass: "",
      confirmPass: "",
    },

    validationSchema: Yup.object({
      pass: Yup.string().required("Contraseña actual requerida"),
      newPass: Yup.string().required("Nueva contraseña requerida"),
      confirmPass: Yup.string()
        .required("Confirmar contraseña requerida")
        .oneOf([Yup.ref("newPass")], "Las contraseñas no coinciden"),
    }),
    validateOnChange: false,

    onSubmit: async (formData) => {
      try {
        console.log(formData);
        const user = getAuth().currentUser;
        const credential = EmailAuthProvider.credential(
          user.email,
          formData.pass
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, formData.newPass);
        
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Contraseña cambiada correctamente",
        });
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar contraseña",
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
        placeholder="Contraseña actual"
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
        onChangeText={(text) => formik.setFieldValue("pass", text)}
        errorMessage={formik.errors.pass}
      />
      <Input
        placeholder="Nueva contraseña"
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
        onChangeText={(text) => formik.setFieldValue("newPass", text)}
        errorMessage={formik.errors.newPass}
      />
      <Input
        placeholder="Confirmar cotraseña"
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
        title="Cambiar contraseña"
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
