import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import theme from "../../../../styles/theme";

// A custom dropdown component that displays options from the data prop
const CustomDropdown = ({ data, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false); // Tracks if dropdown is open or closed

  return (
    <View style={styles.dropdownContainer}>
      {/* This is the dropdown header which displays the currently selected value */}
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View style={styles.dropdownHeader}>
          <Text>{selectedValue || "Select..."}</Text>
        </View>
      </TouchableOpacity>
      {/* When the dropdown is open, it shows a list of all the available options */}
      {isOpen && (
        <ScrollView style={styles.dropdownList}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelect(item);
                setIsOpen(false);
              }}
            >
              <Text style={styles.dropdownItem}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// This modal handles the file uploading functionality
const UploadFileModal = ({ isVisible, onClose, files, handleFileUpload }) => {
  const [chosenFileName, setChosenFileName] = useState(""); // Store the name of the chosen file
  const [selectedTenant, setSelectedTenant] = useState(null); // Store the chosen tenant
  const [selectedProperty, setSelectedProperty] = useState(null); // Store the chosen property

  // Function to open the document picker and let user pick a file
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        setChosenFileName(result.name);
      }
    } catch (err) {
      console.error("Error picking document: ", err);
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <View style={styles.modalContainer}>
        {/* Modal header indicating the purpose of the modal */}
        <Text style={styles.modalHeader}>Upload File</Text>

        {/* Button that triggers the document picker */}
        <Button title="Choose File" onPress={pickDocument} />

        {/* If a file is chosen, its name is displayed */}
        {chosenFileName && (
          <Text style={styles.chosenFileName}>Selected: {chosenFileName}</Text>
        )}

        {/* Dropdown for tenant selection */}
        <CustomDropdown
          data={files.map((fileGroup) => fileGroup.tenant)}
          selectedValue={selectedTenant}
          onSelect={(value) => setSelectedTenant(value)}
        />

        {/* Dropdown for property selection */}
        <CustomDropdown
          data={files.map((fileGroup) => fileGroup.property)}
          selectedValue={selectedProperty}
          onSelect={(value) => setSelectedProperty(value)}
        />

        {/* TextInput to rename the selected file if necessary */}
        <TextInput
          value={chosenFileName}
          onChangeText={setChosenFileName}
          placeholder="Name your file..."
          style={styles.searchInput}
        />

        {/* Button to confirm and trigger the upload process */}
        <Button title="Upload" onPress={handleFileUpload} />
      </View>
    </Modal>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
    ...theme.typography.header,
    marginBottom: 30,
  },
  chosenFileName: {
    marginTop: 15,
    marginBottom: 20,
    fontStyle: "italic",
  },
  searchInput: {
    width: "80%",
    padding: theme.spacing.small,
    marginBottom: 15,
    backgroundColor: theme.colors.grey.light,
    borderRadius: theme.borderRadius.small,
  },
  dropdownContainer: {
    width: "80%",
    maxHeight: 200,
    marginBottom: 15,
  },
  dropdownHeader: {
    width: "100%",
    padding: 10,
    backgroundColor: theme.colors.grey.light,
    borderRadius: theme.borderRadius.small,
    borderWidth: 1,
    borderColor: theme.colors.grey.lighter,
  },
  dropdownList: {
    marginTop: 10,
    backgroundColor: theme.colors.grey.lighter,
    borderRadius: theme.borderRadius.small,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
});

export default UploadFileModal;
