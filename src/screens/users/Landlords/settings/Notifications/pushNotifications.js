import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, RadioButton } from "react-native-paper";

const PushNotificationsSettingsPage = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(true); // Change this initial state based on the user's preference

     const handleBack = () => {
       navigation.navigate("LandlordSettingsPage");
     };

  const handleToggle = () => {
    setIsEnabled((prev) => !prev);
    // You can add logic here to save the user's preference (enabled/disabled) to your backend or local storage.
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Push Notifications" />
      </Appbar.Header>

      {/* Push Notifications Toggle */}
      <View style={styles.toggleContainer}>
        <RadioButton.Group
          onValueChange={() => handleToggle()}
          value={isEnabled ? "enabled" : "disabled"}
        >
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Enable Push Notifications"
              value="enabled"
              color="#007AFF" // Change the color as needed
              uncheckedColor="#007AFF" // Change the color as needed
            />
          </View>
          <View style={styles.toggleItem}>
            <RadioButton.Item
              label="Disable Push Notifications"
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

export default PushNotificationsSettingsPage;
