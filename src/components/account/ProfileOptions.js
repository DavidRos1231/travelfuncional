import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";
import ChangeNameForm from "./ChangeNameForm";
import ChangePassForm from "./ChangePassForm";
import ChangeEmailForm from "./ChangeEmailForm";

export default function ProfileOptions(props) {
  const { onReload } = props;
  
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null);
  const onClose = () => setShowModal((prevState) => !prevState);
  const menuOptions = getOptionMenu();
  //console.log(menuOptions);

  const selectedComponent = (key) => {
    if (key === "displayName") {
      setRenderComponent(<ChangeNameForm onClose={onClose} onReload={onReload} />);
    }
    if (key === "pasword") {
      setRenderComponent(<ChangePassForm onClose={onClose} />);
    }
    if (key === "email") {
      setRenderComponent(<ChangeEmailForm onClose={onClose} onReload={onReload} />);
    }
    onClose();
  };

  const optionsMenu = getOptionMenu(selectedComponent);
  return (
    <View>
      {map(optionsMenu, (option, index) => (
        <ListItem key={index} style={styles.menuItem} onPress={option.onPress}>
          <Icon
            type={option.typeIcon}
            name={option.nameIconLeft}
            color={option.colorIcon}
          />
          <ListItem.Content>
            <ListItem.Title>{option.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={option.typeIcon}
            name={option.nameIconRight}
            color={option.colorIcon}
          />
        </ListItem>
      ))}
      <Modal isVisible={showModal} close={onClose}>
        {/* la palabra reservada de childen hace alusion el contenido anidado dentro de un componnete */}
        {renderComponent}
      </Modal>
    </View>
  );
}

function getOptionMenu(selectedComponent) {
  return [
    {
      title: "Cambiar nombre y apellidos",
      typeIcon: "material-community",
      nameIconLeft: "account-circle",
      nameIconRight: "chevron-right",
      colorIcon: "#0d5bd7",
      onPress: () => selectedComponent("displayName"),
    },
    {
      title: "Cambiar contraseña",
      typeIcon: "material-community",
      nameIconLeft: "lock-reset",
      nameIconRight: "chevron-right",
      colorIcon: "#0d5bd7",
      onPress: () => selectedComponent("pasword"),
    },
    {
      title: "Cambiar correo electronico",
      typeIcon: "material-community",
      nameIconLeft: "at",
      nameIconRight: "chevron-right",
      colorIcon: "#0d5bd7",
      onPress: () => selectedComponent("email"),
    }
  ];
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E3",
  },
});
