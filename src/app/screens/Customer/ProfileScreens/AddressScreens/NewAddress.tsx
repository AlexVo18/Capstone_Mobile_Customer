import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Map from "~/src/app/components/map/Map";
import { Button, Modal, Portal } from "react-native-paper";

const NewAddress = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Map />
        </Modal>
      </Portal>
      <Button style={{ marginTop: 30 }} onPress={showModal} >
        Show
      </Button>
    </View>
  );
};

export default NewAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: "white",
    height: "80%", // Adjust as needed
    width: "100%",
  },
});
