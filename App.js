import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import LandingScreen from './src/screens/LandingScreen';
import GuestBookingScreen from './src/screens/GuestBookingScreen';
import UserDashboardScreen from './src/screens/UserDashboardScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import PastBookingsScreen from './src/screens/PastBookingsScreen';
import LoginScreen from './src/screens/LoginScreen';
import ChatBotScreen from './src/screens/ChatBotScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';

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
            name="LoginScreen"
            component={LoginScreen}
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
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
