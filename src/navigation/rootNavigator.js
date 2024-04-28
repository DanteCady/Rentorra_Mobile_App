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
import NotificationPage from '../screens/users/Landlords/notifications';
import FilesPage from '../screens/users/Landlords/files';
import InboxPage from '../screens/users/Landlords/inbox';
import MessagesPage from '../screens/users/Landlords/messages';
import ChangePassword from '../screens/users/Landlords/settings/Profile/changePassword';
import EditProfile from '../screens/users/Landlords/settings/Profile/editProfile';
import PaymentMethods from '../screens/users/Landlords/settings/Profile/paymentMethods';
import PushNotificationsSettingsPage from '../screens/users/Landlords/settings/Notifications/pushNotifications';
import SMSAlertsSettingsPage from '../screens/users/Landlords/settings/Notifications/smsAlerts';
import EmailNotificationsSettingsPage from '../screens/users/Landlords/settings/Notifications/emailNotifications';
import ThemeSettings from '../screens/users/Landlords/settings/Display_Appearance/themeSettings';
import LanguageSettings from  '../screens/users/Landlords/settings/Display_Appearance/languageSettings';
import CameraSettings from '../screens/users/Landlords/settings/Privacy_Security/camera';
import LocationSettings from "../screens/users/Landlords/settings/Privacy_Security/location";
import PhotosSettings from '../screens/users/Landlords/settings/Privacy_Security/photos';
import MicrophoneSettings from "../screens/users/Landlords/settings/Privacy_Security/microphone";
import DeleteAccountPage from '../screens/users/Landlords/settings/Privacy_Security/deleteAccount';
import DownloadDataPage from '../screens/users/Landlords/settings/Privacy_Security/downloadData';
import ManageTenants from '../screens/users/Landlords/settings/tenantPropertyManagement/manageTenant';

// Tenant Screens
import TenantDashboard from '../screens/users/Tenants/tenantDashboard';
import TenantsSettingsPage from "../screens/users/Tenants/settings/settings";
import PaymentPortal from '../screens/users/Tenants/payPortal';
import NotificationPage from '../screens/users/Landlords/notifications';
import FilesPage from '../screens/users/Tenants/files';
import InboxPage from '../screens/users/Tenants/inbox';
import MessagesPage from '../screens/users/Tenants/messages';
import ChangePassword from '../screens/users/Tenants/settings/Profile/changePassword';
import EditProfile from '../screens/users/Tenants/settings/Profile/editProfile';
import PaymentMethods from '../screens/users/Tenants/settings/Profile/paymentMethods';
import PushNotificationsSettingsPage from '../screens/users/Tenants/settings/Notifications/pushNotifications';
import SMSAlertsSettingsPage from '../screens/users/Tenants/settings/Notifications/smsAlerts';
import EmailNotificationsSettingsPage from '../screens/users/Tenants/settings/Notifications/emailNotifications';
import ThemeSettings from '../screens/users/Tenants/settings/Display_Appearance/themeSettings';
import LanguageSettings from  '../screens/users/Tenants/settings/Display_Appearance/languageSettings';
import CameraSettings from '../screens/users/Tenants/settings/Privacy_Security/camera';
import LocationSettings from "../screens/users/Tenants/settings/Privacy_Security/location";
import PhotosSettings from '../screens/users/Tenants/settings/Privacy_Security/photos';
import MicrophoneSettings from "../screens/users/Tenants/settings/Privacy_Security/microphone";
import DeleteAccountPage from '../screens/users/Tenants/settings/Privacy_Security/deleteAccount';
import DownloadDataPage from '../screens/users/Tenants/settings/Privacy_Security/downloadData';
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
        <Stack.Screen name="Notifications" component={NotificationPage} options={{ headerShown: false }} />
        <Stack.Screen name="Files" component={FilesPage} options={{ headerShown: false }} />
        <Stack.Screen name="Inbox" component={InboxPage} options={{ headerShown: false }} />
        <Stack.Screen name="Messages" component={MessagesPage} options={{ headerShown: false }} />
        <Stack.Screen name="LandlordSettingsPage" component={LandlordSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="ManagePaymentMethods" component={PaymentMethods} options={{ headerShown: false }} />
        <Stack.Screen name="PushNotificationsSettingsPage" component={PushNotificationsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="SMSAlertsSettingsPage" component={SMSAlertsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="EmailNotificationsSettingsPage" component={EmailNotificationsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="ThemeSettings" component={ThemeSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LanguageSettings" component={LanguageSettings} options={{ headerShown: false }} />
        <Stack.Screen name="CameraSettings" component={CameraSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LocationSettings" component={LocationSettings} options={{ headerShown: false }} />
        <Stack.Screen name="PhotosSettings" component={PhotosSettings} options={{ headerShown: false }} />
        <Stack.Screen name="MicrophoneSettings" component={MicrophoneSettings} options={{ headerShown: false }} />
        <Stack.Screen name="DeleteAccountPage" component={DeleteAccountPage} options={{ headerShown: false }} />
        <Stack.Screen name="DownloadDataPage" component={DownloadDataPage} options={{ headerShown: false }} />
        <Stack.Screen name="ManageTenant" component={ManageTenants} options={{ headerShown: false }} />

        {/* Tenant Routes */}
        <Stack.Screen name="TenantDashboard" component={TenantDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="TenantsSettingsPage" component={TenantsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="PaymentPortal" component={PaymentPortal} options={{ headerShown: false }} />
        <Stack.Screen name="Notifications" component={NotificationPage} options={{ headerShown: false }} />
        <Stack.Screen name="Files" component={FilesPage} options={{ headerShown: false }} />
        <Stack.Screen name="Inbox" component={InboxPage} options={{ headerShown: false }} />
        <Stack.Screen name="Messages" component={MessagesPage} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="ManagePaymentMethods" component={PaymentMethods} options={{ headerShown: false }} />
        <Stack.Screen name="PushNotificationsSettingsPage" component={PushNotificationsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="SMSAlertsSettingsPage" component={SMSAlertsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="EmailNotificationsSettingsPage" component={EmailNotificationsSettingsPage} options={{ headerShown: false }} />
        <Stack.Screen name="ThemeSettings" component={ThemeSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LanguageSettings" component={LanguageSettings} options={{ headerShown: false }} />
        <Stack.Screen name="CameraSettings" component={CameraSettings} options={{ headerShown: false }} />
        <Stack.Screen name="LocationSettings" component={LocationSettings} options={{ headerShown: false }} />
        <Stack.Screen name="PhotosSettings" component={PhotosSettings} options={{ headerShown: false }} />
        <Stack.Screen name="MicrophoneSettings" component={MicrophoneSettings} options={{ headerShown: false }} />
        <Stack.Screen name="DeleteAccountPage" component={DeleteAccountPage} options={{ headerShown: false }} />
        <Stack.Screen name="DownloadDataPage" component={DownloadDataPage} options={{ headerShown: false }} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};

export default RootNavigator;
