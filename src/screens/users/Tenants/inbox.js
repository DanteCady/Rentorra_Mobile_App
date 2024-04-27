import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../styles/theme";

// The InboxPage component displays a list of message conversations for a landlord.

const InboxPage = ({ navigation }) => {
  const [conversations, setConversations] = useState([
    {
      id: "1",
      tenantName: "John Doe",
      lastMessage: "Hey, about the rent...",
      timestamp: "10:45 AM",
      unread: true,
      profilePhoto: "https://placeimg.com/64/64/people/1",
    },
    {
      id: "2",
      tenantName: "Jane Smith",
      lastMessage: "All set for this month!",
      timestamp: "Yesterday",
      unread: false,
      profilePhoto: "https://placeimg.com/64/64/people/2",
    },
  ]);

  // The InboxPage component displays a list of message conversations for a landlord.
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedChats, setSelectedChats] = useState([]);

  // The InboxPage component displays a list of message conversations for a landlord.
  const handleBack = () => {
    if (selectionMode) {
      clearSelection();
    } else {
      navigation.navigate("LandlordDashboard");
    }
  };

  // The InboxPage component displays a list of message conversations for a landlord.
  const toggleChatSelection = (id) => {
    if (selectedChats.includes(id)) {
      setSelectedChats((prev) => prev.filter((chatId) => chatId !== id));
    } else {
      setSelectedChats((prev) => [...prev, id]);
    }
  };

  // The InboxPage component displays a list of message conversations for a landlord.
  const handleLongPress = (id) => {
    setSelectionMode(true);
    toggleChatSelection(id);
  };

  // Marks the selected chats as read
  const handleMarkSelectedAsRead = () => {
    let updatedConversations = [...conversations];
    selectedChats.forEach((id) => {
      let chat = updatedConversations.find((conv) => conv.id === id);
      chat.unread = false;
    });
    setConversations(updatedConversations);
    clearSelection();
  };

  const clearSelection = () => {
    setSelectedChats([]);
    setSelectionMode(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon
            name={selectionMode ? "close" : "arrow-left"}
            size={theme.spacing.large}
            color={theme.colors.grey.dark}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Inbox</Text>
      </View>
      {selectionMode && (
        <View style={styles.actionBar}>
          <Button title="Mark as Read" onPress={handleMarkSelectedAsRead} />
          <Button title="Cancel" onPress={clearSelection} />
        </View>
      )}
      <FlatList
        data={conversations}
        style={styles.flatList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => {
              if (selectionMode) {
                toggleChatSelection(item.id);
              } else {
                navigation.navigate("MessagesPage");
              }
            }}
            onLongPress={() => handleLongPress(item.id)}
          >
            {selectionMode && (
              <Icon
                name={
                  selectedChats.includes(item.id)
                    ? "checkbox-marked-circle"
                    : "checkbox-blank-circle-outline"
                }
                size={24}
                color={theme.colors.primary}
                style={{ marginRight: 10 }}
              />
            )}
            <Image
              source={{ uri: item.profilePhoto }}
              style={styles.profilePhoto}
            />
            <View style={styles.chatTextContainer}>
              <Text style={styles.chatTitle}>{item.tenantName}</Text>
              <Text style={styles.chatSubtitle}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.chatTimestamp}>{item.timestamp}</Text>
            {item.unread && <View style={styles.unreadIndicator}></View>}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Styling for the InboxPage component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.large,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.light,
    // top: 30,
  },
  backButton: {
    position: "absolute",
    left: theme.spacing.large,
    zIndex: 10,
    padding: 10,
    top: 50
  },
  headerText: {
    ...theme.typography.header,
    top: 30,
  },
  flatList: {
    marginTop: 30,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.light,
  },
  chatTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  chatTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  chatSubtitle: {
    color: theme.colors.grey.medium,
    maxWidth: "70%",
  },
  chatTimestamp: {
    color: theme.colors.grey.medium,
    fontSize: 12,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    marginLeft: 10,
  },
  profilePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey.light,
  },
});

export default InboxPage;
