// Import necessary libraries and components
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import theme from "../../../styles/theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UploadFileModal from "../../../components/composite/Dashboard/landlord/fileUpload";

// Component to manage files related to tenants
const FilesPage = ({ navigation }) => {
  // State containing file data for tenants
  const [files, setFiles] = useState([
    {
      tenant: "Dante Cady",
      files: [
        {
          id: "1",
          fileName: "Lease Agreement.pdf",
          dateUploaded: "2023-06-12",
        },
      ],
    },
    {
      tenant: "Jane Smith",
      files: [
        {
          id: "2",
          fileName: "Rent Receipt.pdf",
          dateUploaded: "2023-06-14",
        },
      ],
    },
    {
      tenant: "John Doe",
      files: [
        {
          id: "2",
          fileName: "Rent Receipt.pdf",
          dateUploaded: "2023-06-14",
        },
      ],
    },
    {
      tenant: "Oscar Ramos",
      files: [
        {
          id: "2",
          fileName: "Rent Receipt.pdf",
          dateUploaded: "2023-06-14",
        },
      ],
    },
    {
      tenant: "Ashley Grahm",
      files: [
        {
          id: "2",
          fileName: "Rent Receipt.pdf",
          dateUploaded: "2023-06-14",
        },
      ],
    },
  ]);

  // State to track currently selected tenant
  const [selectedTenant, setSelectedTenant] = useState(null);

  // State to handle file search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Modal visibility state for file upload
  const [isUploadModalVisible, setUploadModalVisibility] = useState(false);

  // States for file uploading process
  const [selectedProperty, setSelectedProperty] = useState("");
  const [tags, setTags] = useState([]);

  // Function to handle the file upload action
  const handleFileUpload = () => {
    setUploadModalVisibility(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with navigation and page title */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LandlordDashboard")}
          >
            <Icon
              name="arrow-left"
              size={theme.spacing.large}
              color={theme.colors.grey.dark}
            />
          </TouchableOpacity>
          <Text style={theme.typography.header}>Files</Text>
          <Icon
            name="help-circle"
            size={theme.spacing.medium}
            color={theme.colors.secondary.main}
          />
        </View>

        {/* Horizontal scrollable tenant tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tenantTabs}
        >
          {files.map((fileGroup) => (
            <TouchableOpacity
              key={fileGroup.tenant}
              onPress={() => setSelectedTenant(fileGroup.tenant)}
              style={[
                styles.tab,
                selectedTenant === fileGroup.tenant && styles.selectedTab,
              ]}
            >
              <Text>{fileGroup.tenant}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Search bar for files */}
        <TextInput
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search files..."
          style={styles.searchInput}
        />

        {/* List of files based on selected tenant */}
        <FlatList
          data={
            selectedTenant
              ? files.find((file) => file.tenant === selectedTenant)?.files
              : []
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.fileItem}>
              <Text style={theme.typography.body}>{item.fileName}</Text>
              <Text style={theme.typography.caption}>
                Uploaded: {item.dateUploaded}
              </Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* File upload modal */}
      <UploadFileModal
        isVisible={isUploadModalVisible}
        onClose={() => setUploadModalVisibility(false)}
        files={files}
        selectedTenant={selectedTenant}
        setSelectedTenant={setSelectedTenant}
        handleFileUpload={handleFileUpload}
        selectedProperty={selectedProperty}
        setSelectedProperty={setSelectedProperty}
      />

      {/* Floating button to open file upload modal */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => setUploadModalVisibility(true)}
      >
        <Icon name="plus" size={24} color={theme.colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.large,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.light,
  },
  tenantTabs: {
    flexDirection: "row",
    // justifyContent: "space-between",
    padding: theme.spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey.light,
  },
  tab: {
    padding: theme.spacing.small,
    backgroundColor: theme.colors.grey.light,
    borderRadius: theme.borderRadius.small,
    marginHorizontal: theme.spacing.small,
  },
  selectedTab: {
    backgroundColor: theme.colors.primary.light,
  },
  searchInput: {
    padding: theme.spacing.small,
    margin: theme.spacing.medium,
    backgroundColor: theme.colors.grey.light,
    borderRadius: theme.borderRadius.small,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fileItem: {
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey.light,
  },
  uploadButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary.main,
    borderRadius: 50,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default FilesPage;
