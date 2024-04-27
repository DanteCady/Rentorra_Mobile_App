import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme from "../../../styles/theme";
import { Picker } from "@react-native-picker/picker";
import { Button, IconButton } from "react-native-paper";

const MaintenanceRequestModal = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    description: "",
    dateOfOccurrence: new Date(),
    urgency: "",
    maintenanceType: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerType, setPickerType] = useState("");

  const handlePickerChange = (type, value) => {
    setPickerType(""); // Close picker modal
    setFormData({ ...formData, [type]: value });
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.dateOfOccurrence || !formData.urgency || !formData.maintenanceType) {
      Alert.alert("Incomplete Form", "Please fill all required fields.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  const PickerModal = ({ type, items }) => (
    <Modal visible={!!pickerType} transparent={true} animationType="slide">
      <TouchableOpacity style={styles.pickerModalContainer} onPress={() => setPickerType("")}>
        <View style={styles.pickerContent}>
          <Picker
            selectedValue={formData[type]}
            onValueChange={(itemValue) => handlePickerChange(type, itemValue)}
          >
            {items.map(item => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
          </Picker>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Maintenance Request</Text>
          <TextInput
            style={styles.input}
            placeholder="Description *"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholderTextColor="grey"
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.fieldContainer} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.fieldLabel}>Date of Occurrence *</Text>
            <Text>{formData.dateOfOccurrence.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="default"
              value={formData.dateOfOccurrence}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                setFormData({ ...formData, dateOfOccurrence: selectedDate || formData.dateOfOccurrence });
              }}
            />
          )}
          <TouchableOpacity style={styles.fieldContainer} onPress={() => setPickerType('urgency')}>
            <Text style={styles.fieldLabel}>Urgency *</Text>
            <Text>{formData.urgency || "Select Urgency *"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fieldContainer} onPress={() => setPickerType('maintenanceType')}>
            <Text style={styles.fieldLabel}>Maintenance Type *</Text>
            <Text>{formData.maintenanceType || "Select Maintenance Type *"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.addButtonLabel}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonLabel}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
      {pickerType && (
        <PickerModal
          type={pickerType}
          items={pickerType === 'urgency' ? [
            { label: 'Low', value: 'Low' },
            { label: 'Medium', value: 'Medium' },
            { label: 'High', value: 'High' }
          ] : [
            { label: 'Plumbing', value: 'Plumbing' },
            { label: 'Electrical', value: 'Electrical' },
            { label: 'Rodent', value: 'Rodent' },
            { label: 'General Repair', value: 'General Repair' }
          ]}
        />
      )}
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
    color: theme.colors.primary.dark,
  },
  fieldContainer: {
    width: "100%",
    marginBottom: theme.spacing.medium,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: theme.colors.primary.dark,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: theme.colors.primary.dark,
    borderWidth: 1,
    borderRadius: theme.spacing.small,
    paddingHorizontal: 10,
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
  pickerModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  pickerContent: {
    backgroundColor: 'white',
    width: '75%',
    borderRadius: theme.spacing.small,
  },
});

export default MaintenanceRequestModal;
