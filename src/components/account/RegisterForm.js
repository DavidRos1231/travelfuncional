import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm() {
  const navigation = useNavigation();
  const [showPass, setShowPass] = useState(false);
  const [showRepetPass, setShowRepetPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Formato de correo invalido")
        .required("Correo obligatorio"),
      password: Yup.string().required("Contraseña obligatoria"),
      repeatPassword: Yup.string()
        .required("Contraseña obligatoria")
        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    }),

    validateOnChange: false,

    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        console.log(formValue);
        //navigation.navigate("indexs");
        navigation.goBack();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "El correo ya esta en uso",
        });
        console.log(error);
      }
    },
  });

  const showHidePass = () => {
    setShowPass(!showPass);
  };
  const showHideRepetPass = () => {
    setShowRepetPass(!showRepetPass);
  };
  return (
    <View style={styles.viewContent}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={showPass ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidePass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Repetir contraseña"
        secureTextEntry={showRepetPass ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepetPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHideRepetPass}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Registrarse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContent: {
    marginTop: 30,
  },
  input: {
    width: "100%",
    marginTop: 20,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 15,
    width: "95%",
  },
  btn: {
    backgroundColor: "#0D5BD7",
  },
});
