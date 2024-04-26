import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../../styles/theme";

// Main MessagesPage component for displaying and sending messages
const MessagesPage = () => {
  // Main MessagesPage component for displaying and sending messages
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  // Main MessagesPage component for displaying and sending messages
  const handleSendMessage = () => {
    if (inputMessage.trim().length > 0) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), content: inputMessage },
      ]);
      setInputMessage("");
    }
  };

  // Main MessagesPage component for displaying and sending messages
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        setAttachedFile(result.uri);
      }
    } catch (err) {
      console.error("Error picking document: ", err);
    }
  };

  // Main MessagesPage component for displaying and sending messages
  const exportMessages = () => {
    // Handle the export functionality here
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={pickDocument} style={styles.iconButton}>
            <MaterialIcons name="attach-file" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={exportMessages} style={styles.iconButton}>
            <MaterialIcons name="import-export" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={[styles.inputContainer, { marginBottom: 25 }]}>
        <TextInput
          value={inputMessage}
          onChangeText={setInputMessage}
          style={styles.input}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

// Styling for the MessagesPage component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 8,
  },
  message: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.grey.light,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.grey.light,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: theme.colors.grey.light,
  },
});

export default MessagesPage;
