import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../../styles/theme";

// This component represents the bottom navigation bar.
const NavigationBar = ({ navigation }) => {

  // Navigation functions for each button on the bar.
  const goToDashboard = () => {
    navigation.navigate("TenantDashboard");
  };

  const goToFiles = () => {
    navigation.navigate("Files");
  };

  const goToNotifications = () => {
    navigation.navigate("Notifications");
  };

  const goToInbox = () => {
    navigation.navigate("Inbox");
  };


  return (
    <View style={styles.container}>
      {/* This section contains all the primary navigation buttons. */}
      <View style={styles.buttonsContainer}>
        {/* Each button navigates to a different screen or performs an action. */}
        <TouchableOpacity onPress={goToDashboard} style={styles.button}>
          <Icon
            name="view-dashboard"
            size={30}
            color={theme.colors.primary.dark}
          />
          <Text style={styles.iconTitle}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToNotifications} style={styles.button}>
          <Icon name="bell" size={30} color={theme.colors.primary.dark} />
          <Text style={styles.iconTitle}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToFiles} style={styles.button}>
          <Icon name="folder" size={30} color={theme.colors.primary.dark} />
          <Text style={styles.iconTitle}>Files</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={goToInbox} style={styles.button}>
          <Icon name="message" size={30} color={theme.colors.primary.dark} />
          <Text style={styles.iconTitle}>Messages</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

// Styling for the navigation bar.
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#E0E0E0",
    height: 100,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
  },
  iconTitle: {
    fontSize: 12,
    marginTop: 5,
    color: "#0c51a1",
    fontWeight: "bold",
  },
});

export default NavigationBar;
