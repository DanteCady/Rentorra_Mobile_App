import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../styles/theme";

// Initial set of notifications
const initialNotifications = [
  {
    id: "1",
    type: "app",
    message: "Your subscription has been renewed.",
    fromUser: null,
    readStatus: false,
    dateReceived: "2023-09-20",
  },
  {
    id: "2",
    type: "user",
    message: "Tenant Alex has requested maintenance.",
    fromUser: "Alex",
    readStatus: true,
    dateReceived: "2023-09-21",
  },
  // ... Add more notifications as needed
];

// Initial set of notifications
const NotificationPage = ({ navigation }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Initial set of notifications
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, readStatus: true }
        : notification
    );
    setNotifications(updatedNotifications);
  };

  // Function to delete a specific notification
  const deleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Function to handle navigation back to the landlord dashboard
  const handleBack = () => {
    navigation.navigate("LandlordDashboard");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon
            name="arrow-left"
            size={theme.spacing.large}
            color={theme.colors.grey.dark}
          />
        </TouchableOpacity>
        <Text style={theme.typography.header}>Notifications</Text>
        <Icon
          name="help-circle"
          size={theme.spacing.medium}
          color={theme.colors.secondary.main}
        />
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={item.readStatus ? styles.read : styles.unread}>
              {item.message}
            </Text>
            <Text style={styles.date}>{item.dateReceived}</Text>
            {!item.readStatus && (
              <Button
                title="Mark as Read"
                onPress={() => markAsRead(item.id)}
              />
            )}
            <Button
              title="Delete"
              onPress={() => deleteNotification(item.id)}
            />
          </View>
        )}
      />
      {notifications.length > 0 && (
        <Button title="Clear All" onPress={clearAllNotifications} />
      )}
    </View>
  );
};

// Styles for the NotificationPage component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.medium,
  },
  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey.light,
  },
  read: {
    ...theme.typography.body,
    color: theme.colors.grey.main,
  },
  unread: {
    ...theme.typography.body,
    fontWeight: "bold",
    color: theme.colors.primary.main,
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.grey.main,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.large,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.light,
    top: 30,
  },
});

export default NotificationPage;
