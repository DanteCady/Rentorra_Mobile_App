import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Appbar, RadioButton } from "react-native-paper";
import {Camera} from 'expo-camera';
const CameraSettings = ({ navigation }) => {
  const [cameraAccess, setCameraAccess] = useState("disabled");
  const [permission, requestPermissions] = Camera.useCameraPermissions();
  const handleBack = () => {
    navigation.navigate("LandlordSettingsPage");
  };

  const handleCameraAccessChange = (selectedAccess) => {
    if (selectedAccess === "enabled") {
      Alert.alert(
        "Allow Camera Access",
        "Cazza would like to access your camera for taking photos and videos.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setCameraAccess("disabled");
            },
          },
          {
            text: "Allow",
            onPress: () => {
              setCameraAccess("enabled");
              if (!permission.granted) {
                
              }
            },
          },
        ]
      );
    } else {
      setCameraAccess("disabled");
      // You can add logic here to save the user's preference to your backend or local storage.
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Camera" />
      </Appbar.Header>

      {/* Camera Access Selection */}
      <View style={styles.toggleContainer}>
        <RadioButton.Group
          onValueChange={(value) => handleCameraAccessChange(value)}
          value={cameraAccess}
        >
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Enable Camera Access"
              value="enabled"
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Disable Camera Access"
              value="disabled"
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff", // Change the header background color as needed
  },
  toggleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleItem: {
    marginBottom: 16, // Adjust the spacing between radio buttons as needed
  },
});

export default CameraSettings;
