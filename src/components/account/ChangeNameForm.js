import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { getAuth, updateProfile } from "firebase/auth";

export default function ChangeNameForm(props) {
  const { onClose, onReload } = props;
  const formik = useFormik({
    initialValues: {
      displayName: "",
    },

    validationSchema: Yup.object({
      displayName: Yup.string().required("El nombre y apellidos "),
    }),
    validateOnChange: false,

    onSubmit: async (formData) => {
      try {
        
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, {
          displayName: formData.displayName,
        });
        Toast.show({
          type:"success",
          position:"bottom",
          text1:"Nombre y apellido cambiado correctamente"
        });
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type:"error",
          position:"bottom",
          text1:"Error al cambiar nombre y apellido" 
        });
      }
    },
  });
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre y apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre"
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
