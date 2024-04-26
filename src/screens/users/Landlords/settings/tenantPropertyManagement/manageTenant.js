// ManageTenants.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// Import relevant components from react-native-paper or other UI libraries
import { Card, Button, Searchbar } from 'react-native-paper';

const ManageTenants = () => {
  const [tenants, setTenants] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tenants/all');
      const data = await response.json();
      setTenants(data.tenants);
      setFilteredTenants(data.tenants); // Initially, filtered tenants are the same as all tenants
    } catch (error) {
      console.error('Error fetching tenants: ', error);
      Alert.alert("Error", "Failed to load tenants");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = tenants.filter(tenant => 
        tenant.firstName.toLowerCase().includes(query.toLowerCase()) || 
        tenant.lastName.toLowerCase().includes(query.toLowerCase()));
      setFilteredTenants(filteredData);
    } else {
      setFilteredTenants(tenants);
    }
  };

  // Define the function to update tenant info (you'll need a separate screen or modal for this)
  const handleUpdateTenant = (tenantId) => {
    // Navigate to update tenant screen or open a modal
  };

  // Define the function to delete a tenant
  const handleDeleteTenant = (tenantId) => {
    // Call API to delete tenant then refresh list
  };

  // Define the function to add a file for a tenant
  const handleAddFile = (tenantId) => {
    // Open file picker and upload file
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={filteredTenants}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={`${item.firstName} ${item.lastName}`} />
            <Card.Content>
              {/* Display tenant details */}
              <Text>Property: {item.assignedProperty}</Text>
              {/* Add more tenant details you wish to display */}
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleUpdateTenant(item.id)}>Edit</Button>
              <Button onPress={() => handleAddFile(item.id)}>Add File</Button>
              <Button onPress={() => handleDeleteTenant(item.id)} color="#b71c1c">Delete</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  }
});

export default ManageTenants;
