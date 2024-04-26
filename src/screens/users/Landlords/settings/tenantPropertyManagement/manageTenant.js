import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../../../styles/theme";
import AddTenantModal from "../../../../../components/composite/Tenants/landlord/addTenantModal";
import ModifyTenantModal from "../../../../../components/composite/Tenants/landlord/modifyTenantModal";

const ManageTenantsPage = ({ navigation }) => {
  const [tenants, setTenants] = useState([]);
  const [selectedTenants, setSelectedTenants] = useState([]);
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
    setIsModifyModalVisible(false);  // Close the modal after updating
    if (selectionMode) {
      handleCancelSelection();  // Reset selection mode if active
    }
  };

  const handleSelectTenant = (tenant) => {
    if (selectedTenants.includes(tenant)) {
      setSelectedTenants(selectedTenants.filter(t => t !== tenant));
    } else {
      setSelectedTenants([...selectedTenants, tenant]);
    }
  };

  const handleLongPress = (tenant) => {
    if (!selectionMode) {
      setSelectionMode(true);
      setSelectedTenants([tenant]);
    } else {
      handleSelectTenant(tenant);
    }
  };

  const deleteSelectedTenants = () => {
    setTenants(tenants.filter(tenant => !selectedTenants.includes(tenant)));
    setSelectedTenants([]);
    setSelectionMode(false);  // Exit selection mode after deleting
  };

  const handleBack = () => {
    if (selectionMode) {
      handleCancelSelection();
    } else {
      navigation.goBack();
    }
  };

  const handleCancelSelection = () => {
    setSelectionMode(false);
    setSelectedTenants([]);
  };

  const handleEditTenant = () => {
    if (selectedTenants.length === 1) { // Only allow editing if one tenant is selected
      setIsModifyModalVisible(true);
      setModifyTenant(selectedTenants[0]);
    } else {
      Alert.alert("Edit Error", "Please select exactly one tenant to edit.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-left" size={theme.spacing.large} color={theme.colors.grey.dark} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Manage Tenants</Text>
        {selectionMode && (
          <View style={styles.selectionOptions}>
            <TouchableOpacity style={styles.optionButton} onPress={handleEditTenant}>
              <Icon name="pencil" size={24} color={theme.colors.primary.main} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={deleteSelectedTenants}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handleCancelSelection}>
              <Icon name="close" size={24} color={theme.colors.primary.dark} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setIsAddModalVisible(true)}>
        <Text style={[theme.typography.body, styles.addButtonLabel]}>+ Add Tenant</Text>
        <Icon name="plus-circle" size={theme.spacing.medium} color={theme.colors.primary.dark} />
      </TouchableOpacity>

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

      {isModifyModalVisible && (
        <ModifyTenantModal
          visible={isModifyModalVisible}
          onClose={() => setIsModifyModalVisible(false)}
          onModify={handleModifyTenant}
          tenant={selectedTenants[0]} // Assumes only one tenant is selected for modification
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
    position: "relative",
    top: 30,
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: "center",
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
    justifyContent: "flex-end",
    alignItems: "center",
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
