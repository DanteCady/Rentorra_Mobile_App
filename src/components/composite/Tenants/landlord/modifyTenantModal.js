import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import theme from "../../../../styles/theme";

const ModifyTenantModal = ({ visible, onClose, onModify, tenant }) => {
  const [modifiedTenant, setModifiedTenant] = useState(tenant);

  const handleModify = () => {
    Alert.alert(
      "Confirm Update",
      "Are you sure you want to update this tenant's information?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
            onModify(modifiedTenant);
            onClose();
          }
        }
      ]
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Modify Tenant</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={modifiedTenant.firstName}
            onChangeText={(text) => setModifiedTenant({ ...modifiedTenant, firstName: text })}
            placeholderTextColor="grey"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={modifiedTenant.lastName}
            onChangeText={(text) => setModifiedTenant({ ...modifiedTenant, lastName: text })}
            placeholderTextColor="grey"
          />
          <TextInput
            style={styles.input}
            placeholder="Assigned Property"
            value={modifiedTenant.assignedProperty}
            onChangeText={(text) => setModifiedTenant({ ...modifiedTenant, assignedProperty: text })}
            placeholderTextColor="grey"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleModify}>
            <Text style={styles.addButtonLabel}>Submit</Text>
          </TouchableOpacity>
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
    color: theme.colors.white,
    fontWeight: "bold",
  },
});

export default ModifyTenantModal;
