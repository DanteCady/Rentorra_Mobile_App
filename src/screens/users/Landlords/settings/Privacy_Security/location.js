import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Appbar, RadioButton } from "react-native-paper";

const LocationSettings = ({ navigation }) => {
  const [locationAccess, setlocationAccess] = useState("disabled");

  const handleBack = () => {
    navigation.navigate("LandlordSettingsPage");
  };

  const handlelocationAccessChange = (selectedAccess) => {
    if (selectedAccess === "enabled") {
      Alert.alert(
        "Allow location Access",
        "Cazza would like to access your location.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              setlocationAccess("disabled");
            },
          },
          {
            text: "Allow",
            onPress: () => {
              setlocationAccess("enabled");
              // You can add logic here to save the user's preference to your backend or local storage.
            },
          },
        ]
      );
    } else {
      setlocationAccess("disabled");
      // You can add logic here to save the user's preference to your backend or local storage.
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="location" />
      </Appbar.Header>

      {/* location Access Selection */}
      <View style={styles.toggleContainer}>
        <RadioButton.Group
          onValueChange={(value) => handlelocationAccessChange(value)}
          value={locationAccess}
        >
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Enable location Access"
              value="enabled"
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Disable location Access"
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

export default LocationSettings;
