import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { Card, Title, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import NavigationBar from "../../../components/composite/Dashboard/landlord/navigationBar";
import { Calendar } from "react-native-calendars";
import Swiper from "react-native-swiper";
import QuickAddButtons from "../../../components/composite/Dashboard/landlord/quickAddButtons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../styles/theme";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'; 
import AddPropertyModal from "../../../components/composite/Dashboard/landlord/modals/quickAddProperty"
import AddTenantModal from "../../../components/composite/Dashboard/landlord/modals/quickAddTenant";

const LandlordDashboard = ({ route, navigation }) => {

  const [showQuickAddButtons, setShowQuickAddButtons] = useState(false);
  const { userName } = route.params || {};
  const [isAddPropertyModalVisible, setAddPropertyModalVisible] = useState(false);
  const [isAddTenantModalVisible, setAddTenantModalVisible] = useState(false);
  const [properties, setProperties] = useState([]); 
  const [tenants, setTenants] = useState([]);


// Function to open the AddTenantModal
const openAddTenantModal = () => {
  setAddTenantModalVisible(true);
};

// Function to close the AddTenantModal
const closeAddTenantModal = () => {
  setAddTenantModalVisible(false);
};

  // Function to open the AddPropertyModal
  const openAddPropertyModal = () => {
    setAddPropertyModalVisible(true);
  };

  // Function to close the AddPropertyModal
  const closeAddPropertyModal = () => {
    setAddPropertyModalVisible(false);
  };

  // Function to handle saving a new property
  const handleSaveProperty = (propertyData) => {
    console.log("Property Data:", propertyData);
    // TODO: Add logic to handle saving the property data
    closeAddPropertyModal();
  };

  const toggleQuickAddButtons = () => {
    setShowQuickAddButtons(!showQuickAddButtons);
  };

  const goToSettings = () => {
    navigation.navigate("LandlordSettingsPage");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    // Define the fetchTenants function inside useEffect to avoid defining it on each render
    const fetchTenants = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const response = await axios.get('http://localhost:3000/api/tenants/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response);
        if (response.status === 200) {
          setTenants(response.data.tenants);
        } else {
          console.error('Failed to fetch tenants:', response.status);
        }
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };
  
    fetchTenants();
  }, []);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const response = await axios.get('http://localhost:3000/api/properties/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setProperties(response.data.properties); 
        } else {
          console.error('Failed to fetch properties:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
  
    fetchProperties();
  }, []);
  
  const upcomingPayments = [
    { tenant: "John Doe", dueDate: "2023-10-01", amount: 500 },
    { tenant: "Jane Smith", dueDate: "2023-10-05", amount: 550 },
    { tenant: "Dante Cady", dueDate: "2023-10-01", amount: 500 },
    { tenant: "Omar Santos", dueDate: "2023-10-05", amount: 550 },
    { tenant: "Greg Davis", dueDate: "2023-10-01", amount: 500 },
    // ... add more upcoming payments data as needed
  ];

  const getDaysRemaining = (dueDate) => {
    const currentDate = new Date();
    const paymentDate = new Date(dueDate);
    const differenceInTime = paymentDate - currentDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };


  const totalRentExpected = tenants.reduce(
    (sum, tenant) => sum + tenant.rent,
    0
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#43ecf5", "#f7f7f7"]}
        style={styles.gradientContainer}
      >
        <Text style={styles.welcomeText}>
          Welcome Back, {userName || "User"}!
        </Text>
        <TouchableOpacity style={styles.settingsIconContainer}>
          <Icon
            name="cog"
            size={30}
            color="#FFF"
            style={styles.settingsIcon}
            onPress={goToSettings}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutIconContainer}
          onPress={handleLogout}
        >
          <Icon
            name="logout"
            size={30}
            color="#FFF"
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView>
        <Swiper style={styles.swiper}>
          {/* Financial Summary Swiper */}
          {/* Page 1 - Total Expected Rent */}
          <View style={styles.summaryPage}>
            <Card.Content>
              <Title style={styles.incomeTitle}>Total Expected Rent</Title>
              <Text style={styles.incomeAmount}>
                ${totalRentExpected.toFixed(2)}
              </Text>
            </Card.Content>
          </View>
          {/* Page 2 - Metric 2 */}
          <View style={styles.summaryPage}>
            <Card.Content>
              <Title style={styles.incomeTitle}>Total Rent Received</Title>
              <Text>Add content for Metric 2 here</Text>
            </Card.Content>
          </View>
          {/* Page 3 - Metric 3 */}
          <View style={styles.summaryPage}>
            <Card.Content>
              <Title style={styles.incomeTitle}>Vacancy Rate</Title>
              <Text>Add content for Metric 3 here</Text>
            </Card.Content>
          </View>
          {/* Page 4 - Metric 6 */}
          <View style={styles.summaryPage}>
            <Card.Content>
              <Title style={styles.incomeTitle}>Rent Arrears</Title>
              <Text>Add content for Metric 6 here</Text>
            </Card.Content>
          </View>
          {/* Page 5 - Metric 10 */}
          <View style={styles.summaryPage}>
            <Card.Content>
              <Title style={styles.incomeTitle}>Projected Income</Title>
              <Text>Add content for Metric 10 here</Text>
            </Card.Content>
          </View>
        </Swiper>

        <View style={styles.content}>
          <Text style={styles.boxName}>Tenants</Text>
          <View style={styles.tenantBox}>
  <Card.Content>
    {tenants.slice(0, 5).map((tenant, index) => (
      <View key={index} style={styles.tenantRow}>
        <Text style={styles.tenantName}>{tenant.firstName} {tenant.lastName}</Text>
      </View>
    ))}
  </Card.Content> 
</View>

          <TouchableOpacity onPress={() => navigation.navigate("AllTenants")}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {/* Properties Section */}
<View style={styles.content}>
  <Text style={styles.boxName}>Properties</Text>
  <View style={styles.tenantBox}>
    <Card.Content>
      {properties.slice(0, 5).map((property, index) => (
        <View key={index} style={styles.tenantRow}>
          <Text style={styles.tenantName}>{property.address}</Text>
          {/* Display additional property details here as needed */}
        </View>
      ))}
    </Card.Content>
  </View>
  <TouchableOpacity onPress={() => navigation.navigate("AllProperties")}>
    <Text style={styles.viewAll}>View All</Text>
  </TouchableOpacity>
</View>

        <View style={styles.content}>
          <Text style={styles.boxName}>Upcoming Payments</Text>
          <View style={styles.upcomingPaymentsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {upcomingPayments.map((payment, index) => (
                <View key={index} style={styles.paymentTile}>
                  <Text style={styles.paymentTenant}>{payment.tenant}</Text>
                  <Text style={styles.paymentAmount}>
                    ${payment.amount.toFixed(2)}
                  </Text>
                  <Text style={styles.paymentDueDate}>
                    Due: {payment.dueDate}
                  </Text>
                  <Text style={styles.daysRemaining}>
                    {getDaysRemaining(payment.dueDate)} days to go
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("AllPayments")}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {/* Calendar */}
        <View style={styles.content}>
          <Text style={styles.boxName}>Calendar</Text>
          <Calendar
          // Customize calendar appearance and behavior here
          />
        </View>
      </ScrollView>

      <NavigationBar
        navigation={navigation}
        toggleQuickAdd={toggleQuickAddButtons} // Pass the function here
      />

      {/* Conditionally render QuickAddButtons component */}
   {/* QuickAddButtons component with the openAddPropertyModal function passed as a prop */}
   {showQuickAddButtons && (
        <QuickAddButtons onAddProperty={openAddPropertyModal} onAddTenant={openAddTenantModal} />
      )}

      {/* AddPropertyModal component */}
      <AddPropertyModal
        isVisible={isAddPropertyModalVisible}
        onClose={closeAddPropertyModal}
        onSave={handleSaveProperty}
      />    

       {/* AddTenantModal component */}
       <AddTenantModal
        isVisible={isAddTenantModalVisible}
        onClose={closeAddTenantModal}
        // onSave={handleSaveTenant}
        properties={properties} // Pass the properties for the picker
      />
      </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  content: {
    padding: 15,
    flex: 1,
  },
  gradientContainer: {
    height: 200,
  },
  incomeCard: {
    marginBottom: 20,
    shadowOpacity: 0,
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 15,
  },
  incomeTitle: {
    fontSize: 18,
    color: "black",
  },
  incomeAmount: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0c51a1",
  },
  summaryPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swiper: {
    height: 250,
  },
  tenantBox: {
    marginTop: -10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
  },
  boxName: {
    color: "black",
    marginBottom: 30,
  },
  tenantRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
  },
  tenantName: {
    fontSize: 18,
    color: "black",
  },
  tenantRent: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0c51a1",
  },
  paymentTile: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: 12,
    padding: 8,
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paymentTenant: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  paymentAmount: {
    fontSize: 16,
    color: "#0c51a1",
  },
  paymentDueDate: {
    fontSize: 12,
    color: "#333",
  },
  daysRemaining: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  viewAll: {
    color: "#0c51a1",
    textAlign: "right",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary.dark,
    textAlign: "center",
    marginTop: 140,
  },
  upcomingPaymentsContainer: {
    marginTop: -10,
    marginBottom: 20,
    borderRadius: 10,
    // backgroundColor: "white",
    padding: 15,
    height: 170,
  },
  upcomingPaymentsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  settingsIconContainer: {
    position: "absolute",
    right: 35,
    top: 55,
  },
  settingsIcon: {
    fontWeight: "bold",
  },
  logoutIconContainer: {
    position: "absolute",
    left: 35,
    top: 55,
  },
  logoutIcon: {
    fontWeight: "bold",
  },
});

export default LandlordDashboard;
