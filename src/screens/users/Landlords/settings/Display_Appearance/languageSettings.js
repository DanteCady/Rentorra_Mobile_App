import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, RadioButton } from "react-native-paper";

const LanguageSettings = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("system"); // Default to system language
  const systemLanguage = "system";

  const handleBack = () => {
    navigation.navigate("LandlordSettingsPage");
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // You can add logic here to save the user's language preference to your backend or local storage.
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Language Settings" />
      </Appbar.Header>

      {/* Language Selection */}
      <View style={styles.toggleContainer}>
        <RadioButton.Group
          onValueChange={(value) => handleLanguageChange(value)}
          value={selectedLanguage}
        >
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Use System Language"
              value={systemLanguage}
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="English (en)"
              value="en"
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
          {/* Add more language options here */}
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

export default LanguageSettings;
