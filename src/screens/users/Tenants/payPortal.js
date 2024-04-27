import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { Card } from 'react-native-elements'; // Assuming you're using react-native-elements
import theme from '../../../styles/theme';

const PaymentPortal = ({ navigation }) => {
  const totalRentDue = 1200; // Example total rent due
  const [amount, setAmount] = useState(0);

  const handleConfirmPayment = () => {
    // Logic to process the payment
    console.log(`Paying $${amount}`);
    navigation.goBack(); // Go back to dashboard or show confirmation
  };

  const handleSchedulePayment = () => {
    // Logic to schedule the payment
    console.log(`Scheduling payment of $${amount}`);
    navigation.goBack(); // Go back to dashboard or show confirmation
  };
    
  // Placeholder data for card metrics
  const totalRentPaidYear = 10000; // Example total rent paid for the year
  const totalPaymentsMonth = 5; // Example total payments made this month

  // Placeholder data for payment history
  const paymentHistory = [
    { id: 1, amount: 1100, date: '2024-04-25' },
    { id: 2, amount: 1200, date: '2024-04-18' },
    { id: 3, amount: 1150, date: '2024-04-10' },
    // Add more payment history data as needed
  ];

  // Render item for payment history list
  const renderPaymentItem = ({ item }) => (
    <View style={styles.paymentItem}>
      <Text style={styles.paymentAmount}>{`$${item.amount.toFixed(2)}`}</Text>
      <Text style={styles.paymentDate}>{item.date}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Pay Your Rent</Text>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={totalRentDue}
          value={amount}
          step={50}
          onValueChange={(value) => setAmount(value)}
          minimumTrackTintColor={theme.colors.primary.main}
          maximumTrackTintColor="#ccc"
          thumbTintColor={theme.colors.primary.main}
        />
        <Text style={styles.sliderValue}>{`$${amount.toFixed(2)}`}</Text>
      </View>
      <Text style={styles.balance}>{`Remaining Balance: $${(totalRentDue - amount).toFixed(2)}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirmPayment}>
          <Text style={styles.buttonText}>Confirm Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSchedulePayment}>
          <Text style={styles.buttonText}>Schedule Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Card section for additional metrics */}
      <View style={styles.cardContainer}>
        <Card containerStyle={styles.card}>
          <Text style={styles.cardTitle}>Total Rent Paid This Year</Text>
          <Text style={styles.cardValue}>{`$${totalRentPaidYear.toFixed(2)}`}</Text>
        </Card>
        <Card containerStyle={styles.card}>
          <Text style={styles.cardTitle}>Payments Made This Month</Text>
          <Text style={styles.cardValue}>{totalPaymentsMonth}</Text>
        </Card>
        {/* Add more cards for additional metrics */}
      </View>

      {/* Payment history */}
      <Text style={styles.paymentHistoryTitle}>Payment History</Text>
      <FlatList
        data={paymentHistory}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
      paddingTop: 40, // Adjust as needed for status bar or header
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary.dark,
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    sliderContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    slider: {
      width: '80%',
      height: 40,
    },
    sliderValue: {
      fontSize: 18,
      color: theme.colors.primary.main,
      textAlign: 'center',
    },
    balance: {
      fontSize: 18,
      color: '#666',
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: theme.colors.primary.main,
      paddingVertical: 12,
      borderRadius: 5,
      width: '48%',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    card: {
      flex: 1,
      marginHorizontal: 5,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme.colors.primary.dark,
      textAlign: 'center',
    },
    cardValue: {
      fontSize: 18,
      color: theme.colors.primary.main,
      textAlign: 'center',
    },
    paymentHistoryTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.primary.dark,
      textAlign: 'center',
    },
    paymentItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingHorizontal: 20,
    },
    paymentAmount: {
      fontSize: 16,
      color: theme.colors.primary.main,
    },
    paymentDate: {
      fontSize: 16,
      color: '#666',
    },
  });
  
  export default PaymentPortal;