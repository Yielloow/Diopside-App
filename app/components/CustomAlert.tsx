import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

interface CustomAlertProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export default function CustomAlert({ visible, message, onClose }: CustomAlertProps) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.message}>{message}</Text>
          <Button title="OK" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
});
