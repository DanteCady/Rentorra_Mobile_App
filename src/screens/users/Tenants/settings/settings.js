import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../../../styles/theme";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const settingsData = [
  {
    title: "Profile",
    icon: "account",
    subItems: [
      { title: "Edit Profile", route: "TenantEditProfile" },
      { title: "Change Password", route: "TenantChangePassword" },
      { title: "Manage Payment Methods", route: "TenantManagePaymentMethods" },
    ],
  },
  {
    title: "Notifications",
    icon: "bell",
    subItems: [
      { title: "Push Notifications", route: "TenantPushNotificationsSettingsPage" },
      { title: "Email Notifications", route: "TenantEmailNotificationsSettingsPage" },
      { title: "SMS Alerts", route: "TenantSMSAlertsSettingsPage" },
    ],
  },
  {
    title: "Display & Appearance",
    icon: "screen-rotation",
    subItems: [
      { title: "Theme Settings", route: "TenantThemeSettings" },
      { title: "Language", route: "TenantLanguageSettings" },
    ],
  },
  {
    title: "Privacy & Security",
    icon: "lock",
    subItems: [
      { title: "Privacy Policy" },
      { title: "Delete Account", route: "TenantDeleteAccountPage" },
      { title: "Download Data", route: "TenantDownloadDataPage" },
      { title: "Camera", route: "TenantCameraSettings" },
      { title: "Location", route: "TenantLocationSettings" },
      { title: "Photos", route: "TenantPhotosSettings" },
      { title: "Microphone", route: "TenantMicrophoneSettings" },
    ],
  },
  {
    title: "Feedback & Support",
    icon: "help-circle",
    subItems: [
      { title: "Report a Problem" },
      { title: "Contact Support" },
      { title: "FAQs" },
    ],
  },
  {
    title: "About & Legal",
    icon: "information",
    subItems: [
      { title: "Terms of Service" },
      { title: "License Agreement" },
      { title: "Version Info" },
    ],
  },
];

const LandlordSettingsPage = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);
  const navigation = useNavigation(); // Initialize the navigation object

  const handleBack = () => {
    // Handle navigating back to the previous screen
    navigation.navigate("LandlordDashboard"); // Navigate to the specified route
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon
            name="arrow-left"
            size={theme.spacing.large}
            color={theme.colors.grey.dark}
          />
        </TouchableOpacity>
        <Text style={theme.typography.header}>Settings</Text>
        <Icon
          name="help-circle"
          size={theme.spacing.medium}
          color={theme.colors.secondary.main}
        />
      </View>

      <FlatList
        data={settingsData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => {
                setSelectedSetting(
                  selectedSetting === item.title ? null : item.title
                );
              }}
            >
              <Icon
                name={item.icon}
                size={theme.spacing.large}
                color={theme.colors.primary.dark}
              />
              <Text style={[theme.typography.body, styles.listText]}>
                {item.title}
              </Text>
              <Icon
                name={
                  selectedSetting === item.title
                    ? "chevron-down"
                    : "chevron-right"
                }
                size={theme.spacing.large}
                color={theme.colors.grey.dark}
              />
            </TouchableOpacity>

            {selectedSetting === item.title &&
              item.subItems.map((sub) => (
                <TouchableOpacity
                  style={styles.subItem}
                  key={sub.title}
                  onPress={() => {
                    if (sub.route) {
                      navigation.navigate(sub.route); // Navigate to the specified route
                    }
                  }}
                >
                  <Text style={[theme.typography.caption, styles.subItemText]}>
                    {sub.title}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={theme.typography.caption}>Version: 1.0.0</Text>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.large,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.light,
    top: 30,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.large,
    paddingHorizontal: theme.spacing.medium,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.lighter,
    backgroundColor: theme.colors.grey.light,
  },
  listText: {
    flex: 1,
    marginLeft: theme.spacing.medium,
    fontWeight: "bold",
    color: theme.colors.black,
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    marginLeft: theme.spacing.large,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.grey.lighter,
  },
  subItemText: {
    flex: 1,
    marginLeft: theme.spacing.medium,
    color: theme.colors.secondary.main,
  },
  footer: {
    padding: theme.spacing.medium,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: theme.colors.white,
  },
});

export default LandlordSettingsPage;
