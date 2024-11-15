import React from "react";
import {
  View,
  Modal,
  Text,
  Pressable,
  StyleSheet,
  Vibration,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ModalContent } from "../utils/types";

const DashboardModal = ({
  content,
  onClose,
}: {
  content: ModalContent | null;
  onClose: () => void;
}) => {
  const handleCloseModal = () => {
    onClose();
  };

  if (!content) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!content}
      onShow={() => Vibration.vibrate(10000)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleCloseModal}
          >
            <MaterialIcons name="close" size={20} color="grey" />
          </Pressable>
          <Text style={styles.modalText}>{content.content}</Text>
          {content.additionalContent && (
            <Text style={styles.modalText}>{content.additionalContent}</Text>
          )}
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: 0.25,
    borderColor: "#B6D0E2",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#B6D0E2",
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 5,
  },
  button: {
    position: "absolute",
    right: "1.5%",
    top: "5%",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "transparent",
  },
  modalText: {
    paddingTop: 10,
    textAlign: "center",
    display: "flex",
  },
});

export default DashboardModal;
