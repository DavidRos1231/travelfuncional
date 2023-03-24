import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Icon, Button } from "react-native-elements";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";


export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email no valido")
        .required("Email obligatorio"),
      password: Yup.string().required("Contraseña Obligatoria"),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate("indexXS")
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Usuario y/o comtraseña incorrectos",
        });
      }
    },
    // onSubmit: (values, { setSubmitting }) => {
    //   // Submit login form
    // }
  });

  const showHidePass = () => {
    setShowPass(!showPass);
  };

  return (
    <View style={styles.viewContent}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        value={formik.values.email}
        errorMessage={formik.touched.email && formik.errors.email}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={!showPass}
        containerStyle={styles.input}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        errorMessage={formik.touched.password && formik.errors.password}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={showHidePass}
          />
        }
      />
      <Button
        title="Iniciar Sesion"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        //loading={formik.isSubmitting}
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
    marginTop: 15,
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
