import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../../../styles/theme";
import BankAccountModal from "../../../../../components/composite/Payments/landlord/addBankAccountModal";
import ModifyBankAccountModal from "../../../../../components/composite/Payments/landlord/modifyBankAccountModaj";

// Function to format a number with asterisks, leaving the last 4 digits visible
const formatNumberWithAsterisks = (number) => {
  if (!number) return "";

  const visibleLength = 4;
  const visiblePart = number.slice(-visibleLength);

  return `************${visiblePart}`;
};

// PaymentMethodsPage Component
const PaymentMethodsPage = ({ navigation }) => {
  const [isAddingBankAccount, setIsAddingBankAccount] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
  const [modifyAccount, setModifyAccount] = useState(null);

  // Function to set a bank account as primary
  const setAsPrimary = (account) => {
    const updatedAccounts = bankAccounts.map((item) => ({
      ...item,
      primary: item === account, // Set the primary flag to true for the selected account
    }));
    setBankAccounts(updatedAccounts);
  };

  // Function to handle opening the bank account modal
  const handleOpenModal = () => {
    if (bankAccounts.length >= 3) {
      alert("You can only add up to 3 bank accounts.");
    } else {
      setIsAddingBankAccount(true);
    }
  };

  // Function to handle closing the bank account modal
  const handleCloseModal = () => {
    setIsAddingBankAccount(false);
  };

  // Function to add a bank account manually
  const addBankAccountManually = (accountNumber, routingNumber) => {
    if (bankAccounts.length >= 3) {
      alert("You can only add up to 3 bank accounts.");
      handleCloseModal();
      return;
    }

    const formattedAccountNumber = formatNumberWithAsterisks(accountNumber);
    const formattedRoutingNumber = formatNumberWithAsterisks(routingNumber);

    console.log("Account Number:", formattedAccountNumber);
    console.log("Routing Number:", formattedRoutingNumber);

    const newBankAccount = {
      accountNumber: formattedAccountNumber,
      routingNumber: formattedRoutingNumber,
    };

    setBankAccounts([...bankAccounts, newBankAccount]);

    handleCloseModal();
  };

  // Function to navigate back to the Landlord Settings page
  const handleBack = () => {
    navigation.navigate("LandlordSettingsPage");
  };

  // Function to handle long-press on a bank account item
  const handleLongPress = (item) => {
    if (!selectionMode) {
      setSelectionMode(true);
      setSelectedAccounts([item]);
    } else {
      const isSelected = selectedAccounts.includes(item);
      if (isSelected) {
        setSelectedAccounts((prev) =>
          prev.filter((account) => account !== item)
        );
      } else {
        setSelectedAccounts((prev) => [...prev, item]);
      }
    }
  };

  // Function to delete selected bank accounts
  const deleteSelectedAccounts = () => {
    const updatedAccounts = bankAccounts.filter(
      (item) => !selectedAccounts.includes(item)
    );
    setBankAccounts(updatedAccounts);
    setSelectedAccounts([]);
    setSelectionMode(false);
  };

  // Function to open the modify bank account modal
  const openModifyModal = (account) => {
    setModifyAccount(account);
    setIsModifyModalVisible(true);
  };

  // Function to handle canceling the selection mode
  const handleCancelSelection = () => {
    setSelectedAccounts([]);
    setSelectionMode(false);
  };

  // Function to handle modifying a bank account
  const handleModifyAccount = (modifiedAccount) => {
    // Find the index of the modified account in the bankAccounts array
    const index = bankAccounts.findIndex(
      (account) =>
        account.routingNumber === modifiedAccount.routingNumber &&
        account.accountNumber === modifiedAccount.accountNumber
    );

    if (index !== -1) {
      // Create a new array with the modified account replacing the old one
      const updatedBankAccounts = [...bankAccounts];
      updatedBankAccounts[index] = modifiedAccount;

      // Update the bankAccounts state with the updated array
      setBankAccounts(updatedBankAccounts);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon
            name="arrow-left"
            size={theme.spacing.large}
            color={theme.colors.grey.dark}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Bank Account</Text>
      </View>

      {/* Button to open the modal */}
      <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
        <Text style={[theme.typography.body, styles.addButtonLabel]}>
          + Add Bank Account
        </Text>
        <Icon
          name="plus-circle"
          size={theme.spacing.medium}
          color={theme.colors.primary.dark}
        />
      </TouchableOpacity>

      {selectionMode && (
        <View style={styles.selectionOptions}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => openModifyModal(selectedAccounts[0])}
          >
            <Icon name="pencil" size={24} color={theme.colors.primary.main} />
            <Text style={styles.optionText}>Modify</Text>
          </TouchableOpacity>
          {selectedAccounts[0] && ( // Check if selectedAccounts[0] is defined
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setAsPrimary(selectedAccounts[0])}
            >
              <Icon
                name="check-circle"
                size={24}
                color={
                  selectedAccounts[0].primary
                    ? theme.colors.primary.light // If already primary, use primary color
                    : theme.colors.primary.light // Otherwise, use blue color
                }
              />
              <Text style={styles.optionText}>
                {selectedAccounts[0].primary ? "Primary" : "Set as Primary"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.optionButton}
            onPress={deleteSelectedAccounts}
          >
            <Icon name="delete" size={24} color="red" />
            <Text style={styles.optionText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleCancelSelection}
          >
            <Icon
              name={selectionMode ? "close" : "cancel"} // Change icon based on the condition
              size={24}
              color={theme.colors.primary.dark}
            />
            <Text style={styles.optionText}>
              {selectionMode ? "Close" : "Cancel"}{" "}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* List of Bank Accounts */}
      <FlatList
        data={bankAccounts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (selectionMode) {
                handleLongPress(item);
              } else {
                // Implement navigation to account details here
              }
            }}
            onLongPress={() => handleLongPress(item)}
            style={styles.bankAccountItem}
          >
            {selectionMode && (
              <View style={styles.bankAccountSelection}>
                <Icon
                  name={
                    selectedAccounts.includes(item)
                      ? "checkbox-marked-circle"
                      : "checkbox-blank-circle-outline"
                  }
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
            )}
            <View style={styles.accountInfo}>
              <Text style={theme.typography.body}>Account Number:</Text>
              <Text style={theme.typography.body}>
                {formatNumberWithAsterisks(item.accountNumber)}
              </Text>
            </View>
            <View style={styles.accountInfo}>
              <Text style={theme.typography.body}>Routing Number:</Text>
              <Text style={theme.typography.body}>
                {formatNumberWithAsterisks(item.routingNumber)}
              </Text>
            </View>
            {item.primary && ( // Render the blue checkmark if the account is primary
              <Icon
                name="check-circle"
                size={24}
                color={theme.colors.primary.main} // You can adjust the color as needed
              />
            )}
          </TouchableOpacity>
        )}
      />

      {/* Bank Account Modal */}
      <BankAccountModal
        visible={isAddingBankAccount}
        onClose={handleCloseModal}
        onManualAdd={addBankAccountManually}
        onPlaidAdd={() => {
          // Handle Plaid bank account addition here
          // You can initiate the Plaid flow to link the account
          handleCloseModal();
        }}
      />

      {/* Modify Bank Account Modal */}
      <ModifyBankAccountModal
        visible={isModifyModalVisible}
        onClose={() => setIsModifyModalVisible(false)}
        onModify={handleModifyAccount} // Pass the function here
      />
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
  bankAccountItem: {
    padding: theme.spacing.medium,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.lighter,
    flexDirection: "row",
    alignItems: "center",
  },
  bankAccountSelection: {
    marginRight: theme.spacing.medium,
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
    alignItems: "center",
  },
  optionText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
  accountInfo: {
    flexDirection: "column",
    flex: 1,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    width: "80%",
    padding: theme.spacing.large,
    borderRadius: theme.spacing.small,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing.medium,
  },
  input: {
    padding: theme.spacing.medium,
    borderWidth: 0.5,
    borderRadius: theme.spacing.small,
    borderColor: theme.colors.grey.light,
    marginBottom: theme.spacing.medium,
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    alignItems: "center",
    borderRadius: theme.spacing.small,
  },
  closeButtonLabel: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentMethodsPage;
