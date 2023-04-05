import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const UserDeletionModal = (props: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Are you sure you want to delete &quot;{props.username}&quot;? (
            {props.userEmail})
          </Text>
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.confirm]}
              onPress={() => {
                props.callback();
                props.setModalVisible(!props.modalVisible);
              }}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </Pressable>
            <Pressable
              style={[styles.cancel, styles.button]}
              onPress={() => props.setModalVisible(!props.modalVisible)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  button: {
    margin: 4,
    padding: 8,
    borderRadius: 10,
  },
  confirm: {
    backgroundColor: "#28B305",
  },
  cancel: {
    backgroundColor: "#FF3939",
  },
  buttonRow: {
    flexDirection: "row",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default UserDeletionModal;
