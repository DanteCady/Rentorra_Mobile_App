import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MaterialIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore from Expo
// import { Camera, CameraType } from 'expo-camera';
import theme from "../../../../../styles/theme";

const AddTenantModal = ({ isVisible, onClose, onSave }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [tenantId, settenantId] = useState("");
  const [assignedProperty, setAssignedProperty] = useState(null);
  // const [cameraType, setCameraType] = useState(CameraType.back); // State for camera type

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/properties/all');
        const data = await response.json();
        setProperties(data.properties || []);
        if (data.properties && data.properties.length > 0) {
          setAssignedProperty(data.properties[0].property_id);
        }
      } catch (error) {
        console.error('Error fetching properties: ', error);
        alert("Failed to load properties");
      }
      setIsLoading(false);
    };

    if (isVisible) {
      fetchProperties();
    }
  }, [isVisible]);

  // const toggleCameraType = () => {
  //   setCameraType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  // };

  const handleSave = async () => {
    if (!firstName || !lastName) {
      Alert.alert("Validation Error", "First name and last name are required");
      return;
    }

    const tenantData = { firstName, lastName, userId: tenantId };

    // Check if an assigned property is selected
    if (assignedProperty) {
      tenantData.assignedProperty = assignedProperty;
    }

    try {
      const token = await SecureStore.getItemAsync("userToken"); // Retrieve the JWT token from storage
      const response = await fetch('http://localhost:3000/api/tenants/mapToLandlord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
        body: JSON.stringify(tenantData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Tenant mapped to landlord successfully");
        onSave(data);  // Optionally pass the saved tenant data to the parent component
        onClose();     // Close the modal
      } else {
        Alert.alert("Error", data.message || "An error occurred while mapping the tenant to landlord");
      }
    } catch (error) {
      console.error('Error mapping tenant to landlord: ', error);
      Alert.alert("Error", "Failed to connect to the server");
    }
  };

  if (isLoading) {
    return (
      <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {/* <MaterialIcons
          name="qr-code-scanner"
          size={25}
          color="grey"
          style={styles.qr}
          onPress={toggleCameraType}
        /> */}
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
          placeholderTextColor="grey"
        />
        <TextInput
          placeholder='Tenant ID'
          value={tenantId}
          onChangeText={settenantId}
          style={styles.input}
          placeholderTextColor="grey"
        />
        <Text style={styles.pickerLabel}>Assigned Property:</Text>
        <Picker
          selectedValue={assignedProperty}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setAssignedProperty(itemValue)}
        >
          {properties.map((property) => (
            <Picker.Item
              key={property.property_id}
              label={`${property.address} ${property.apartment ? 'Apt ' + property.apartment : ''}`}
              value={property.property_id}
            />
          ))}
        </Picker>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} color="#c62828" />
        </View>
      </View>
    </Modal>
  );
};

// Styles for the modal and form fields
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
  pickerLabel: {
    fontSize: 16,
    color: theme.colors.primary.dark,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 20,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  qr: {
    marginBottom: 20,
    height: 20,
    textAlign: "right",
    position: "relative",
    bottom: 75
  }
});

export default AddTenantModal;
