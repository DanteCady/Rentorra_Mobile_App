// src/navigation/RootNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

// System (Authentication) Screens
import LoginScreen from '../screens/auth/login_copy';
import SignUpScreen from '../screens/auth/signUp';

// Landlord Screens
import LandlordDashboard from '../screens/users/Landlords/landlordDashboard';
import LandlordNotificationPage from '../screens/users/Landlords/notifications';
import LandlordFilesPage from '../screens/users/Landlords/files';
import LandlordInboxPage from '../screens/users/Landlords/inbox';
import LandlordMessagesPage from '../screens/users/Landlords/messages';
import LandlordChangePassword from '../screens/users/Landlords/settings/Profile/changePassword';
import LandlordEditProfile from '../screens/users/Landlords/settings/Profile/editProfile';
import LandlordPaymentMethods from '../screens/users/Landlords/settings/Profile/paymentMethods';
import LandlordPushNotificationsSettingsPage from '../screens/users/Landlords/settings/Notifications/pushNotifications';
import LandlordSMSAlertsSettingsPage from '../screens/users/Landlords/settings/Notifications/smsAlerts';
import LandlordEmailNotificationsSettingsPage from '../screens/users/Landlords/settings/Notifications/emailNotifications';
import LandlordThemeSettings from '../screens/users/Landlords/settings/Display_Appearance/themeSettings';
import LandlordLanguageSettings from  '../screens/users/Landlords/settings/Display_Appearance/languageSettings';
import LandlordCameraSettings from '../screens/users/Landlords/settings/Privacy_Security/camera';
import LandlordLocationSettings from "../screens/users/Landlords/settings/Privacy_Security/location";
import LandlordPhotosSettings from '../screens/users/Landlords/settings/Privacy_Security/photos';
import LandlordMicrophoneSettings from "../screens/users/Landlords/settings/Privacy_Security/microphone";
import LandlordDeleteAccountPage from '../screens/users/Landlords/settings/Privacy_Security/deleteAccount';
import LandlordDownloadDataPage from '../screens/users/Landlords/settings/Privacy_Security/downloadData';
import LandlordManageTenants from '../screens/users/Landlords/settings/tenantPropertyManagement/manageTenant';
import LandlordSettingsPage from '../screens/users/Landlords/settings/settings';

// Tenant Screens
import TenantDashboard from '../screens/users/Tenants/tenantDashboard';
import TenantsSettingsPage from "../screens/users/Tenants/settings/settings";
import TenantPaymentPortal from '../screens/users/Tenants/payPortal';
import TenantNotificationPage from '../screens/users/Tenants/notifications';
import TenantFilesPage from '../screens/users/Tenants/files';
import TenantInboxPage from '../screens/users/Tenants/inbox';
import TenantMessagesPage from '../screens/users/Tenants/messages';
import TenantChangePassword from '../screens/users/Tenants/settings/Profile/changePassword';
import TenantEditProfile from '../screens/users/Tenants/settings/Profile/editProfile';
import TenantPaymentMethods from '../screens/users/Tenants/settings/Profile/paymentMethods';
import TenantPushNotificationsSettingsPage from '../screens/users/Tenants/settings/Notifications/pushNotifications';
import TenantSMSAlertsSettingsPage from '../screens/users/Tenants/settings/Notifications/smsAlerts';
import TenantEmailNotificationsSettingsPage from '../screens/users/Tenants/settings/Notifications/emailNotifications';
import TenantThemeSettings from '../screens/users/Tenants/settings/Display_Appearance/themeSettings';
import TenantLanguageSettings from  '../screens/users/Tenants/settings/Display_Appearance/languageSettings';
import TenantCameraSettings from '../screens/users/Tenants/settings/Privacy_Security/camera';
import TenantLocationSettings from "../screens/users/Tenants/settings/Privacy_Security/location";
import TenantPhotosSettings from '../screens/users/Tenants/settings/Privacy_Security/photos';
import TenantMicrophoneSettings from "../screens/users/Tenants/settings/Privacy_Security/microphone";
import TenantDeleteAccountPage from '../screens/users/Tenants/settings/Privacy_Security/deleteAccount';
import TenantDownloadDataPage from '../screens/users/Tenants/settings/Privacy_Security/downloadData';
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="LoginScreen" options={{ presentation: 'modal' }}>
        {/* System Routes */}
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />

        {/* Landlord Routes */}
        <Stack.Screen name="LandlordDashboard" component={LandlordDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordNotificationPage" component={LandlordNotificationPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordFiles" component={LandlordFilesPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordInbox" component={LandlordInboxPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordMessages" component={LandlordMessagesPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordSettingsPage" component={LandlordSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordChangePassword" component={LandlordChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordEditProfile" component={LandlordEditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordManagePaymentMethods" component={LandlordPaymentMethods} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordPushNotificationsSettingsPage" component={LandlordPushNotificationsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordSMSAlertsSettingsPage" component={LandlordSMSAlertsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordEmailNotificationsSettingsPage" component={LandlordEmailNotificationsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordThemeSettings" component={LandlordThemeSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordLanguageSettings" component={LandlordLanguageSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordCameraSettings" component={LandlordCameraSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordLocationSettings" component={LandlordLocationSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordPhotosSettings" component={LandlordPhotosSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordMicrophoneSettings" component={LandlordMicrophoneSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordDeleteAccountPage" component={LandlordDeleteAccountPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordDownloadDataPage" component={LandlordDownloadDataPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordManageTenant" component={LandlordManageTenants} options={{ headerShown: false }} />

        {/* Tenant Routes */}
        <Stack.Screen name="TenantDashboard" component={TenantDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="TenantsSettingsPage" component={TenantsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantPaymentPortal" component={TenantPaymentPortal} options={{ headerShown: false }} />
        <Stack.Screen name="TenantNotifications" component={TenantNotificationPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantFiles" component={TenantFilesPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantInbox" component={TenantInboxPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantMessages" component={TenantMessagesPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantChangePassword" component={TenantChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name="TenantEditProfile" component={TenantEditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="TenantManagePaymentMethods" component={TenantPaymentMethods} options={{ headerShown: false }} />
        <Stack.Screen name="TenantPushNotificationsSettingsPage" component={TenantPushNotificationsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantSMSAlertsSettingsPage" component={TenantSMSAlertsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantEmailNotificationsSettingsPage" component={TenantEmailNotificationsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantThemeSettings" component={TenantThemeSettings} options={{ headerShown: false }} />
        <Stack.Screen name="TenantLanguageSettings" component={TenantLanguageSettings} options={{ headerShown: false }} />
        <Stack.Screen name="TenantCameraSettings" component={TenantCameraSettings} options={{ headerShown: false }} />
        <Stack.Screen name="TenantLocationSettings" component={TenantLocationSettings} options={{ headerShown: false }} />
        <Stack.Screen name="TenantPhotosSettings" component={TenantPhotosSettings} options={{ headerShown: false }} />
        <Stack.Screen name="TenantMicrophoneSettings" component={TenantMicrophoneSettings} options={{ headerShown: false }} />
        <Stack.Screen name="TenantDeleteAccountPage" component={TenantDeleteAccountPage} options={{ headerShown: false }} />
        <Stack.Screen name="TenantDownloadDataPage" component={TenantDownloadDataPage} options={{ headerShown: false }} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default RootNavigator;
