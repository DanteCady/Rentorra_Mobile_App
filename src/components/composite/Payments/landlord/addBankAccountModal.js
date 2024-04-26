import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import theme from "../../../../styles/theme";

const BankAccountModal = ({ visible, onClose, onManualAdd, onPlaidAdd }) => {
  // State variables for user input
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");

  // Function to handle manual bank account addition
  const handleManualAdd = () => {
    // Validation logic here
    if (accountNumber === "" || routingNumber === "") {
      alert("Please enter both account and routing numbers.");
      return;
    }

    if (accountNumber !== confirmAccountNumber) {
      alert("Account numbers do not match.");
      return;
    }

    // Call your function to add the bank account here
    onManualAdd(accountNumber, routingNumber);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <Text style={styles.modalHeader}>Add Bank Account</Text>

          {/* Routing Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Routing Number"
            value={routingNumber}
            onChangeText={(text) => setRoutingNumber(text)}
            placeholderTextColor="grey"
          />

          {/* Account Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            value={accountNumber}
            onChangeText={(text) => setAccountNumber(text)}
            placeholderTextColor="grey"
          />

          {/* Confirm Account Number Input */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Account Number"
            value={confirmAccountNumber}
            onChangeText={(text) => setConfirmAccountNumber(text)}
            placeholderTextColor="grey"
          />

          {/* Button to add bank account manually */}
          <TouchableOpacity style={styles.addButton} onPress={handleManualAdd}>
            <Text style={styles.addButtonLabel}>Add Manually</Text>
          </TouchableOpacity>

          {/* Button to sign in with Plaid */}
          <TouchableOpacity style={styles.addButton} onPress={onPlaidAdd}>
            <Text style={styles.addButtonLabel}>Sign in with Plaid</Text>
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
    backgroundColor: theme.colors.red,
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

export default BankAccountModal;
