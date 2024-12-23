import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, Alert, ToastAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

// Dummy screens for Users and Bookings
const UsersScreen = ({ users }) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Users List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text> {/* Assuming each user has a name */}
          </View>
        )}
      />
    </View>
  );
};

const BookingsScreen = ({ bookings }) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Bookings List</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={styles.bookingTitle}>{item.name}</Text>
            <Text style={styles.bookingDetail}>Item: {item.item}</Text>
            <Text style={styles.bookingDetail}>Address: {item.address}</Text>
            <Text style={styles.bookingDetail}>Phone: {item.phone}</Text>
            <Text style={styles.bookingDetail}>Date: {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false} // To remove the scroll indicator
      />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const AdminDashboardScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [prevBookings, setPrevBookings] = useState([]); // To track previous bookings data

  useEffect(() => {
    const fetchUsersAndBookings = async () => {
      try {
        const usersResponse = await axios.get('http://192.168.172.245:5000/admin/bookings');
        setUsers(usersResponse.data);

        const bookingsResponse = await axios.get('http://192.168.172.245:5000/admin/bookings');
        setBookings(bookingsResponse.data);

        // Check for new bookings
        if (prevBookings.length > 0 && bookingsResponse.data.length !== prevBookings.length) {
          // If the bookings length is different, show a toast
          ToastAndroid.show('New booking received!', ToastAndroid.SHORT);
        }

        // Set previous bookings to the current bookings after each fetch
        setPrevBookings(bookingsResponse.data);

      } catch (error) {
        Alert.alert('Error', 'Unable to fetch data from the server.');
        console.error(error);
      }
    };

    // Fetch data every 10 seconds
    const intervalId = setInterval(fetchUsersAndBookings, 5000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [prevBookings]); // Rerun when previous bookings change

  const handleLogout = () => {
    navigation.replace('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Welcome, Admin!</Text>
        <Text style={styles.infoText}>Manage bookings, users, and system reports.</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#6200ea',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0 },
        }}
      >
        
        <Tab.Screen
          name="Bookings"
          component={() => <BookingsScreen bookings={bookings} />}
          options={{
            tabBarIcon: ({ color }) => <Icon name="bookmarks" size={24} color={color} />,
            tabBarLabel: 'Bookings',
          }}

        />

        <Tab.Screen
          name="Users"
          component={() => <UsersScreen users={users} />}
          options={{
            tabBarIcon: ({ color }) => <Icon name="people" size={24} color={color} />,
            tabBarLabel: 'Users',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#777',
    lineHeight: 24,
  },
  actionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#f43f5e',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bookingItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bookingDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
});

export default AdminDashboardScreen;
