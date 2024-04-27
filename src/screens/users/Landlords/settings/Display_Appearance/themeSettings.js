import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, RadioButton } from "react-native-paper";

const ThemeSettingsPage = ({ navigation }) => {
  const [theme, setTheme] = useState("system"); // Change this initial state based on the user's preference

  const handleBack = () => {
    navigation.navigate("LandlordSettingsPage");
  };

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    // You can add logic here to save the user's theme preference to your backend or local storage.
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Theme Settings" />
      </Appbar.Header>

      {/* Theme Selection */}
      <View style={styles.toggleContainer}>
        <RadioButton.Group
          onValueChange={(value) => handleThemeChange(value)}
          value={theme}
        >
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Use System Theme"
              value="system"
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Light Mode"
              value="light"
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Dark Mode"
              value="dark"
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

export default ThemeSettingsPage;
