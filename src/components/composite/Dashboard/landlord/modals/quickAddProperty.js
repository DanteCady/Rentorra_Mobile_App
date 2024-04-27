import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import theme from "../../../../../styles/theme";

const AddPropertyModal = ({ isVisible, onClose, onSave }) => {
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [associatedTenant, setAssociatedTenant] = useState('');
  const [document, setDocument] = useState(null);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        setDocument(result);
      }
    } catch (error) {
      console.error("Error picking document: ", error);
      Alert.alert("Error", "There was an error picking the document.");
    }
  };

  const handleSave = async () => {
    if (!address || !city || !state || !zip || !rentAmount) {
      Alert.alert("Error", "All required fields must be filled out.");
      return;
    }

    // Convert rentAmount to a number if necessary
    const propertyData = {
      address,
      apartment,
      city,
      state,
      zip,
      rentAmount: Number(rentAmount),
      associatedTenant, // Optional
    };

    try {
      const token = await SecureStore.getItemAsync('userToken');
      const response = await axios.post('http://localhost:3000/api/properties/create', propertyData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        Alert.alert("Error", `Error: ${response.data.message}`);
        return;
      }

      onSave(response.data);
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving property: ", error);
      Alert.alert("Error", "Failed to save property. Please try again later.");
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <TextInput placeholder="Address" placeholderTextColor="grey"
        value={address} onChangeText={setAddress} style={styles.input} />
        <TextInput placeholder="Apartment (Optional)" placeholderTextColor="grey" value={apartment} onChangeText={setApartment} style={styles.input} />
        <TextInput placeholder="City" placeholderTextColor="grey" value={city} onChangeText={setCity} style={styles.input} />
        <TextInput placeholder="State" placeholderTextColor="grey" value={state} onChangeText={setState} style={styles.input} />
        <TextInput placeholder="ZIP Code" placeholderTextColor="grey" value={zip} onChangeText={setZip} style={styles.input} />
        <TextInput placeholder="Rent Amount" placeholderTextColor="grey" value={rentAmount} onChangeText={setRentAmount} style={styles.input} keyboardType="numeric" />
        <Button title="Upload Document (Optional)" onPress={handleDocumentPick} />
        {document && (<Text style={styles.fileName}>File: {document.name}</Text>)}
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} color="#c62828" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
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
  fileName: {
    margin: 10,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default AddPropertyModal;
