import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Screen for Home
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Dashboard</Text>
      <Text style={styles.text}>What would you like to do?</Text>

      {/* Buttons for navigation */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('PastBookings')}
      >
        <Text style={styles.buttonText}>View Past Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('NewBooking')}
      >
        <Text style={styles.buttonText}>Make a New Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

// Screen for Past Bookings
const PastBookingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Past Bookings</Text>
      {/* Here, you can add a list of past bookings */}
      <Text style={styles.text}>Booking 1 - Date</Text>
      <Text style={styles.text}>Booking 2 - Date</Text>
      {/* Add more booking information as needed */}
    </View>
  );
};

// Screen for New Booking
const NewBookingScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Make a New Booking</Text>
      {/* You can add a form or options to make a booking */}
      <TouchableOpacity style={styles.button} onPress={() => {
            navigation.navigate('GuestBooking');}}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// Main Tab Navigator for UserDashboardScreen
const UserDashboardScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => <Icon name="home-outline" size={24} color="#007BFF" />,
        }}
      />
      <Tab.Screen
        name="PastBookings"
        component={PastBookingsScreen}
        options={{
          tabBarLabel: 'Past Bookings',
          tabBarIcon: () => <Icon name="bookmarks-outline" size={24} color="#007BFF" />,
        }}
      />
      <Tab.Screen
        name="NewBooking"
        component={NewBookingScreen}
        options={{
          tabBarLabel: 'New Booking',
          tabBarIcon: () => <Icon name="add-circle-outline" size={24} color="#007BFF" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default UserDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
