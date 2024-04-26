import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../../../styles/theme";
import AddTenantModal from "../../../../../components/composite/Tenants/landlord/addTenantModal";
import ModifyTenantModal from "../../../../../components/composite/Tenants/landlord/modifyTenantModal";

const ManageTenantsPage = ({ navigation }) => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);

  const handleAddTenant = (firstName, lastName, property) => {
    const newTenant = {
      id: tenants.length + 1,
      firstName,
      lastName,
      assignedProperty: property,
    };
    setTenants([...tenants, newTenant]);
  };

  const handleModifyTenant = (modifiedTenant) => {
    const updatedTenants = tenants.map(tenant =>
      tenant.id === modifiedTenant.id ? modifiedTenant : tenant
    );
    setTenants(updatedTenants);
  };

  const openModifyModal = (tenant) => {
    setSelectedTenant(tenant);
    setIsModifyModalVisible(true);
  };

  const handleLongPress = (tenant) => {
    if (!selectionMode) {
      setSelectionMode(true);
      setSelectedTenant(tenant);
    } else {
      // additional logic if needed for deselecting or handling multiple selections
    }
  };

  const deleteSelectedTenant = () => {
    if (selectedTenant) {
      setTenants(tenants.filter(tenant => tenant.id !== selectedTenant.id));
      setSelectedTenant(null);
      setSelectionMode(false);
    }
  };

  const handleCancelSelection = () => {
    setSelectionMode(false);
    setSelectedTenant(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={theme.spacing.large} color={theme.colors.grey.dark} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Tenants</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddModalVisible(true)}>
        <Text style={[theme.typography.body, styles.addButtonLabel]}>+ Add Tenant</Text>
        <Icon name="plus-circle" size={theme.spacing.medium} color={theme.colors.primary.dark} />
      </TouchableOpacity>

      {selectionMode && (
        <View style={styles.selectionOptions}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => openModifyModal(selectedTenant)}
          >
            <Icon name="pencil" size={24} color={theme.colors.primary.main} />
            <Text style={styles.optionText}>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={deleteSelectedTenant}
          >
            <Icon name="delete" size={24} color="red" />
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleCancelSelection}
          >
            <Icon name="close" size={24} color={theme.colors.primary.dark} />
            <Text style={styles.optionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={tenants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => !selectionMode && openModifyModal(item)}
            onLongPress={() => handleLongPress(item)}
            style={styles.tenantItem}
          >
            <Text style={theme.typography.body}>{`${item.firstName} ${item.lastName}`}</Text>
            <Text style={theme.typography.body}>{`Property: ${item.assignedProperty}`}</Text>
          </TouchableOpacity>
        )}
      />

      {isAddModalVisible && (
        <AddTenantModal
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          onAdd={handleAddTenant}
        />
      )}

      {isModifyModalVisible && selectedTenant && (
        <ModifyTenantModal
          visible={isModifyModalVisible}
          onClose={() => setIsModifyModalVisible(false)}
          onModify={handleModifyTenant}
          tenant={selectedTenant}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.large,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.light,
    position: "relative", // To allow absolute positioning
    top: 30,
  },
  backButton: {
    position: "absolute", // Position the back button absolutely
    left: 10, // Adjust the left position as needed
  },
  headerText: {
    flex: 1, // Allow the text to take the remaining space
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center", // Center the text horizontally
  },
  addButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.medium,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.lighter,
    backgroundColor: theme.colors.grey.light,
  },
  addButtonLabel: {
    flex: 1,
    marginLeft: theme.spacing.medium,
    fontWeight: "bold",
    color: theme.colors.black,
  },
  tenantItem: {
    padding: theme.spacing.medium,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.lighter,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectionOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey.lighter,
    backgroundColor: theme.colors.grey.light,
  },
  optionButton: {
    marginHorizontal: 10,
  },
  optionText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
});

export default ManageTenantsPage;
