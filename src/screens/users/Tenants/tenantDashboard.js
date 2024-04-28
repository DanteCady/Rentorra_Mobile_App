import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { Card, Title, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import NavigationBar from "../../../components/composite/Dashboard/tenants/navigationBarTenant";
import { Calendar } from "react-native-calendars";
import Swiper from "react-native-swiper";
import MaintenanceRequestModal from "../../../components/composite/Properties/maintenanceRequestModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../styles/theme";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TenantDashboard = ({ route, navigation }) => {
  const [showQuickAddButtons, setShowQuickAddButtons] = useState(false);
  const { userName } = route.params || {};
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);

  // Function to handle saving a new property
  const handleSaveProperty = (propertyData) => {
    console.log("Property Data:", propertyData);
    // TODO: Add logic to handle saving the property data
    closeAddPropertyModal();
  };

  const goToSettings = () => {
    navigation.navigate("TenantsSettingsPage");
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };
  const handlePayPortal = () => {
    navigation.navigate("TenantPaymentPortal"); // Adjust the route as necessary
  };
  
  // Function to handle opening the maintenance request modal
  const handleOpenModal = () => {
    setIsModifyModalVisible(true);
  };

  // Function to handle closing the maintenance request modal
  const handleCloseModal = () => {
    setIsModifyModalVisible(false);
  };

  const getDaysRemaining = (dueDate) => {
    const currentDate = new Date();
    const paymentDate = new Date(dueDate);
    const differenceInTime = paymentDate - currentDate;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const totalRentExpected = tenants.reduce(
    (sum, tenant) => sum + tenant.rent,
    0,
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#ae52d6", "#f7f7f7"]}
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
              <Title style={styles.incomeTitle}>Rent Due</Title>
              <Text style={styles.incomeAmount}>
                ${totalRentExpected.toFixed(2)}
              </Text>
            </Card.Content>
          </View>
          {/* Page 2 - Metric 2 */}
          <View style={styles.summaryPage}>
            <Card.Content>
              <Title style={styles.incomeTitle}>Total Rent Paid</Title>
              <Text>Add content for Metric 2 here</Text>
            </Card.Content>
          </View>
          {/* Page 3 - Metric 3 */}
          <View style={styles.summaryPage}>
            <Card.Content>
              <Title style={styles.incomeTitle}>Time Rented</Title>
              <Text>Add content for Metric 3 here</Text>
            </Card.Content>
          </View>
          {/* Page 4 - Metric 6 */}
        </Swiper>

        {/* Calendar */}
        <View style={styles.content}>
          <Text style={styles.boxName}>Calendar</Text>
          <Calendar
          // Customize calendar appearance and behavior here
          />
        </View>

        {/* Button to submit the modification */}
        <View style={styles.buttonContainer}>
        {/* Maintenance Request Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
            <Icon name="wrench" size={24} color={theme.colors.white} />
            <Text style={styles.addButtonLabel}>Request</Text>
        </TouchableOpacity>

        {/* Pay Portal Button */}
        <TouchableOpacity style={styles.addButton} onPress={handlePayPortal}>
            <Icon name="credit-card" size={24} color={theme.colors.white} />
            <Text style={styles.addButtonLabel}>Pay Portal</Text>
        </TouchableOpacity>
        </View>


        <MaintenanceRequestModal
          visible={isModifyModalVisible}
          onClose={handleCloseModal}
        />
      </ScrollView>

      <NavigationBar navigation={navigation} />
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
    color: theme.colors.primary.main,
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
    color: theme.colors.primary.dark,
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
    color: theme.colors.primary.dark,
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
    color: theme.colors.primary.dark,
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
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.primary.main,
    textDecorationLine: "underline",
    textAlign: "right",
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: theme.colors.primary.dark,
    padding: theme.spacing.medium,
    borderRadius: theme.spacing.small,
    marginBottom: theme.spacing.medium,
    width: "45%",  // Adjusted width for side-by-side buttons
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addButtonLabel: {
    color: theme.colors.white,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default TenantDashboard;
