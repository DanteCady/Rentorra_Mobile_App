import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import theme from "../../../../styles/theme";

const ModifyBankAccountModal = ({ visible, onClose, onModify }) => {
  // State variable to store modified bank account information
  const [modifyAccount, setModifyAccount] = useState({
    routingNumber: "",
    accountNumber: "",
  });

  // Function to handle the modification of bank account
  const handleModify = () => {
    Alert.alert(
      "Confirm Update",
      "Are you sure you want to update the bank account information?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // Call the onModify function with the modified account data
            onModify(modifyAccount);
            onClose(); // Close the modal
          },
        },
      ]
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <Text style={styles.modalHeader}>Modify Bank Account</Text>

          {/* Routing Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Routing Number"
            value={modifyAccount.routingNumber}
            onChangeText={(text) =>
              setModifyAccount({ ...modifyAccount, routingNumber: text })
            }
            placeholderTextColor="grey"
          />

          {/* Account Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            value={modifyAccount.accountNumber}
            onChangeText={(text) =>
              setModifyAccount({ ...modifyAccount, accountNumber: text })
            }
            placeholderTextColor="grey"
          />

          {/* Button to submit the modification */}
          <TouchableOpacity style={styles.addButton} onPress={handleModify}>
            <Text style={styles.addButtonLabel}>Submit</Text>
          </TouchableOpacity>

          {/* Button to close the modal */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonLabel}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    width: "80%",
    padding: theme.spacing.large,
    borderRadius: theme.spacing.small,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: theme.spacing.medium,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: theme.colors.primary.dark,
    borderWidth: 1,
    borderRadius: theme.spacing.small,
    paddingHorizontal: 10,
    marginBottom: theme.spacing.medium,
  },
  addButton: {
    backgroundColor: theme.colors.primary.dark,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    marginBottom: theme.spacing.medium,
    width: "100%",
    alignItems: "center",
  },
  addButtonLabel: {
    color: theme.colors.white,
    fontWeight: "bold",
  },
  closeButton: {
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    width: "100%",
    alignItems: "center",
  },
  closeButtonLabel: {
    color: "red",
    fontWeight: "bold",
  },
});

export default ModifyBankAccountModal;
