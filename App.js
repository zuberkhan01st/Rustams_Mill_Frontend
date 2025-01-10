import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import LandingScreen from './src/screens/LandingScreen';
import GuestBookingScreen from './src/screens/GuestBookingScreen';
import UserDashboardScreen from './src/screens/UserDashboardScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import PastBookingsScreen from './src/screens/PastBookingsScreen';
import AdminLoginScreen from './src/screens/AdminLoginScreen';
import ChatBotScreen from './src/screens/ChatBotScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';
import UserLoginScreen from './src/screens/UserLoginScreen';
import UserSignup from './src/screens/UserSignupScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GuestBooking"
            component={GuestBookingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserDashboard"
            component={UserDashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminLoginScreen"
            component={AdminLoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminDashboard"
            component={AdminDashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PastBookingsScreen"
            component={PastBookingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChatBotScreen"
            component={ChatBotScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ContactUsScreen"
            component={ContactUsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserLoginScreen"
            component={UserLoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserSignupScreen"
            component={UserSignup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
