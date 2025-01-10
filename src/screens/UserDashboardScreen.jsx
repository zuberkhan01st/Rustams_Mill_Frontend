import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Screen for Home
const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Fetch the stored username from AsyncStorage
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUsername();
  }, []);

  const handleLogout = async () => {
    // Clear AsyncStorage when logging out
    await AsyncStorage.clear();
    Alert.alert('Logged Out', 'You have been logged out successfully.');
    navigation.navigate('UserLoginScreen'); // Navigate to the login screen after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {username || 'User'}</Text>
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

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

// Screen for Past Bookings
const PastBookingsScreen = () => {
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    // Simulating fetching data for past bookings
    const fetchPastBookings = async () => {
      // Ideally, fetch from an API or database
      const bookings = [
        { id: 1, date: '2024-01-01', title: 'Booking 1' },
        { id: 2, date: '2024-01-05', title: 'Booking 2' },
      ];
      setPastBookings(bookings);
    };

    fetchPastBookings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Past Bookings</Text>
      {pastBookings.length === 0 ? (
        <Text style={styles.text}>No past bookings available</Text>
      ) : (
        pastBookings.map((booking) => (
          <Text key={booking.id} style={styles.text}>
            {booking.title} - {booking.date}
          </Text>
        ))
      )}
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('GuestBooking')}
      >
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
  logoutButton: {
    backgroundColor: '#FF6347',
  },
});
