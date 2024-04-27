import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Appbar, Button } from "react-native-paper";

const DeleteAccountPage = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBack = () => {
    navigation.navigate("LandlordSettingsPage");
  };

  const handleDeleteAccount = () => {
    if (password === "" || confirmPassword === "") {
      Alert.alert(
        "Missing Information",
        "Please enter your password in both fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Passwords do not match. Please try again."
      );
      return;
    }

    // Show a confirmation alert before deleting the account
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone. Make sure to download any important data before proceeding.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete My Account",
          style: "destructive",
          onPress: () => {
            // Perform account deletion logic here
            // You may want to navigate to a confirmation page or log the user out
            // and remove their data from your backend.
            // After the account is deleted, you can navigate to a "Goodbye" screen.
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Delete Your Account" />
      </Appbar.Header>

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="grey"
      />

      {/* Confirm Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        placeholderTextColor="grey"
      />

      {/* Delete Account Button */}
      <Button
        mode="contained"
        style={styles.deleteButton}
        onPress={handleDeleteAccount}
      >
        Delete My Account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 10,
  },
});

export default DeleteAccountPage;
