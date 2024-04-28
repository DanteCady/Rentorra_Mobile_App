import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from '@expo/vector-icons';

import theme from "../../../../styles/theme";
import QuickAddButtons from "./quickAddButtons";

// This component represents the bottom navigation bar.
const NavigationBar = ({ navigation, toggleQuickAdd }) => {
  // State to determine if the QuickAdd buttons should be displayed.
  const [showQuickAddButtons, setShowQuickAddButtons] = useState(false);

  // Toggle the visibility of QuickAdd buttons.
  const toggleQuickAddButtonsLocal = () => {
    setShowQuickAddButtons(!showQuickAddButtons);
    toggleQuickAdd();
  };

  // Navigation functions for each button on the bar.
  const goToDashboard = () => {
    navigation.navigate("LandlordDashboard");
  };

  const goToFiles = () => {
    navigation.navigate("LandlordFiles");
  };

  const goToNotifications = () => {
    navigation.navigate("LandlordNotificationPage");
  };

  const goToInbox = () => {
    navigation.navigate("LandlordInbox");
  };

  const goToReports = () => {
    navigation.navigate("LandlordReports");
  };

  return (
    <View style={styles.container}>
      {/* This section contains all the primary navigation buttons. */}
      <View style={styles.buttonsContainer}>
        {/* Each button navigates to a different screen or performs an action. */}
        <TouchableOpacity onPress={goToDashboard} style={styles.button}>
          <MaterialIcons
            name="dashboard"
            size={30}
            color={theme.colors.primary.dark}
          />
          <Text style={styles.iconTitle}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleQuickAddButtonsLocal}
          style={styles.button}
        >
          <MaterialIcons
            name="add-circle"
            size={30}
            color={theme.colors.primary.dark}
          />
          <Text style={styles.iconTitle}>Quick Add</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToNotifications} style={styles.button}>
          <MaterialIcons name="notifications" size={30} color={theme.colors.primary.dark} />
          <Text style={styles.iconTitle}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToFiles} style={styles.button}>
          <MaterialIcons name="folder" size={30} color={theme.colors.primary.dark} />
          <Text style={styles.iconTitle}>Files</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={goToInbox} style={styles.button}>
          <MaterialIcons name="message" size={30} color={theme.colors.primary.dark} />
          <Text style={styles.iconTitle}>Messages</Text>
        </TouchableOpacity> */}
      </View>

      {/* Conditional rendering of the QuickAdd buttons based on state. */}
      {showQuickAddButtons && <QuickAddButtons />}
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
    justifyContent: "space-around",
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
