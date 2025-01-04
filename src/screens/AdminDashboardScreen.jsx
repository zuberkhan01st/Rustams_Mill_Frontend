import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dummy screens for Users and Bookings
const UsersScreen = ({ users, onRefresh, refreshing }) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Users List</Text>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {users.map((user) => (
          <View key={user._id} style={styles.item}>
            <Text style={styles.itemName}>{user.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const BookingsScreen = ({ bookings, onRefresh, refreshing }) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Bookings List</Text>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {bookings.map((item) => (
          <View key={item._id} style={styles.bookingItem}>
            <Text style={styles.bookingTitle}>{item.name}</Text>
            <Text style={styles.bookingDetail}>Item: {item.item}</Text>
            <Text style={styles.bookingDetail}>Address: {item.address}</Text>
            <Text style={styles.bookingDetail}>Phone: {item.phone}</Text>
            <Text style={styles.bookingDetail}>Date: {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const AdminDashboardScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You need to login first.');
        return;
      }

      // Fetching users and bookings concurrently
      const [bookingsResponse] = await Promise.all([
        
        axios.get('http://192.168.244.245:5000/admin/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setUsers(bookingsResponse.data); // Set the users data
      setBookings(bookingsResponse.data); // Set the bookings data
    } catch (error) {
      //Alert.alert('Error', 'Unable to fetch data from the server.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    navigation.replace('LoginScreen');
    AsyncStorage.removeItem('token');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
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
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#6200ea',
            borderTopWidth: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 15,
            marginHorizontal: 10,
            elevation: 8,
          },
        }}
      >
        <Tab.Screen
          name="Bookings"
          component={() => <BookingsScreen bookings={bookings} onRefresh={onRefresh} refreshing={refreshing} />}
          options={{
            tabBarIcon: ({ color }) => <Icon name="bookmarks" size={24} color={color} />,
            tabBarLabel: 'Bookings',
          }}
        />
        <Tab.Screen
          name="Users"
          component={() => <UsersScreen users={users} onRefresh={onRefresh} refreshing={refreshing} />}
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
    borderRadius: 15,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6200ea',
  },
  bookingItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '600',
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
