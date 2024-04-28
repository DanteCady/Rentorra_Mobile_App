import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, Alert } from "react-native";
import { Button, TextInput, Title, IconButton } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import theme from "../../styles/theme";
import axios from "axios";
import * as LocalAuthentication from "expo-local-authentication";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons from expo vector icons

const SignUpScreen = ({ navigation }) => {
  // Local state definitions for user sign-up details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userType, setUserType] = useState("");
  
  // Function to navigate back to the Login screen
  const goToLogin = () => {
    navigation.navigate("LoginScreen");
  };

  // Handle date change from date picker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setBirthDate(selectedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
        {/* Page title */}
        <Title style={styles.title}>Sign Up</Title>

        {/* User input fields */}
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={true}
        />
        <TextInput
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
        />

        {/* Birth date input with a date picker */}
        <View style={styles.dateContainer}>
          <TextInput
            label="Birth Date"
            value={birthDate.toLocaleDateString()}
            style={styles.dateInput}
            editable={false} // This input is non-editable
          />
          {/* Calendar icon that triggers the date picker */}
          <IconButton
            icon="calendar"
            size={24}
            onPress={() => setShowDatePicker(true)}
          />
          {/* Conditional rendering of the date picker */}
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
        
        {/* User type radio buttons */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => setUserType("tenant")}
            style={[
              styles.radioButton,
              userType === "tenant" ? styles.selectedRadioButton : {}
            ]}
          >
            <Text style={styles.radioButtonText}>Tenant</Text>
            {userType === "tenant" && (
              <MaterialIcons name="check" size={24} color={styles.selectedRadioButton} /> // Display checkmark icon when selected
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("landlord")}
            style={[
              styles.radioButton,
              userType === "landlord" ? styles.selectedRadioButton : {}
            ]}
          >
            <Text style={styles.radioButtonText}>Landlord</Text>
            {userType === "landlord" && (
              <MaterialIcons name="check" size={24} color={styles.selectedRadioButton}/> // Display checkmark icon when selected
            )}
          </TouchableOpacity>
        </View>

        {/* Sign Up button */}
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.signupButton}
            labelStyle={styles.buttonText}
          >
            Sign Up
          </Button>
        </View>

        {/* Link to navigate back to Login screen */}
        <TouchableOpacity onPress={goToLogin} style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
            <Text style={styles.loginLink}onPress={() => navigation.navigate("LoginScreen")}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles for the SignUpScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
  },
  signupContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20, // Added a bit more spacing between title and the form
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary.light,
    paddingHorizontal: 5,
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 8,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 20,
  },
  selectedRadioButton: {
  Color: theme.colors.primary.dark,
  },
  radioButtonText: {
    fontSize: 16,
    color: theme.colors.primary.dark,
    marginRight: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15, // Adjusted from 20 to 15 for consistency
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signupButton: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary.dark,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
 loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spacing.large,
  },
  loginText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.grey.dark,
  },
 loginLink: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.primary.main,
    textDecorationLine: "underline",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dateInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.primary.light,
    paddingHorizontal: 5,
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default SignUpScreen;
