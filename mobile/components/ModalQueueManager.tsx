import React, { useState, useEffect, useRef } from "react";
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

const ModalQueueManager = ({
  modals,
  onComplete,
}: {
  modals: ModalContent[];
  onComplete: () => void;
}) => {
  const [currentModal, setCurrentModal] = useState<ModalContent | null>(null);
  const [queue, setQueue] = useState<ModalContent[]>([]);
  const seenTypes = useRef<Set<ModalContent["type"]>>(new Set());

  // Process new modals
  useEffect(() => {
    if (modals.length > 0) {
      // Filter out modals that have already been seen based on type
      const newModals = modals.filter((modal) => {
        if (!seenTypes.current.has(modal.type)) {
          seenTypes.current.add(modal.type); // Mark as seen immediately
          return true;
        }
        return false;
      });

      if (newModals.length > 0) {
        setQueue((prev) => [...prev, ...newModals]);
      }
    }
  }, [modals]);

  // Show next modal
  useEffect(() => {
    if (queue.length > 0 && !currentModal) {
      const nextModal = queue[0];
      setCurrentModal(nextModal);
      setQueue((prev) => prev.slice(1));
    }
  }, [queue, currentModal]);

  const handleCloseModal = () => {
    setCurrentModal(null);
    if (queue.length === 0) {
      onComplete?.();
    }
  };

  if (!currentModal) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!currentModal}
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
          <Text style={styles.modalText}>{currentModal.content}</Text>
          {currentModal.additionalContent && (
            <Text style={styles.modalText}>
              {currentModal.additionalContent}
            </Text>
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

export default ModalQueueManager;
