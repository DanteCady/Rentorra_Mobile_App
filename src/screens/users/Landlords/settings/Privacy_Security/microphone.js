import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Appbar, RadioButton } from "react-native-paper";

const MicrophoneSettings = ({ navigation }) => {
  const [MicrophoneAccess, setMicrophoneAccess] = useState("disabled");

  const handleBack = () => {
    navigation.navigate("LandlordSettingsPage");
  };

  const handleMicrophoneAccessChange = (selectedAccess) => {
    if (selectedAccess === "enabled") {
      Alert.alert(
        "Allow Microphone Access",
        "Cazza would like to access your Microphone.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setMicrophoneAccess("disabled");
            },
          },
          {
            text: "Allow",
            onPress: () => {
              setMicrophoneAccess("enabled");
              // You can add logic here to save the user's preference to your backend or local storage.
            },
          },
        ]
      );
    } else {
      setMicrophoneAccess("disabled");
      // You can add logic here to save the user's preference to your backend or local storage.
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Microphone" />
      </Appbar.Header>

      {/* Microphone Access Selection */}
      <View style={styles.toggleContainer}>
        <RadioButton.Group
          onValueChange={(value) => handleMicrophoneAccessChange(value)}
          value={MicrophoneAccess}
        >
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Enable Microphone Access"
              value="enabled"
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Disable Microphone Access"
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

export default MicrophoneSettings;
