import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { Appbar } from "react-native-paper"; // Import Appbar from react-native-paper

const DownloadDataPage = ({ navigation }) => {
  // Pass navigation as a prop
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadData = async () => {
    try {
      // Set isLoading to true to show a loading indicator
      setIsLoading(true);

      // Send a request to your backend to initiate the data export process
      // Your backend should generate a unique download link and send it to the user's email
      // You can use a fetch or axios to make the request to your backend API.
      // Be sure to replace 'your-api-endpoint' with the actual endpoint.
      const response = await fetch("your-api-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include any necessary authentication headers or tokens
        // body: JSON.stringify({}), // You can include request data if needed
      });

      if (response.ok) {
        Alert.alert(
          "Data Export Request Sent",
          "You will receive an email with a download link once your data is ready."
        );
      } else {
        Alert.alert(
          "Error",
          "An error occurred while processing your request."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while processing your request.");
    } finally {
      // Reset isLoading to false to hide the loading indicator
      setIsLoading(false);
    }
    };
    const handleBack = () => {
        navigation.navigate("LandlordSettingsPage");
        };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Theme Settings" />
      </Appbar.Header>
      <View style={styles.downloadContainer}>
        <Text style={styles.text}>Request to download your data.</Text>
        <Button
          title="Download Data"
          onPress={handleDownloadData}
          disabled={isLoading} // Disable the button while loading
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: "center",
  },
    downloadContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
  }
});

export default DownloadDataPage;
