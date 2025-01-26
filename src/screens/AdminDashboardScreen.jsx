import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Alert, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const UsersScreen = ({ users, onRefresh, refreshing }) => (
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

const BookingsScreen = ({ bookings, onRefresh, refreshing }) => (
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

const VisualizationScreen = ({ users, bookings }) => {
  const chartWidth = Dimensions.get('window').width - 32;

  // Data for user-based bookings
  const userBookingData = {
    labels: users.map((u) => u.name),
    datasets: [
      {
        data: users.map((u) => bookings.filter((b) => b.name === u.name).length),
        strokeWidth: 2,
      },
    ],
  };

  // Data for monthly bookings
  const monthlyBookingData = (() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyCounts = Array(12).fill(0);

    bookings.forEach((b) => {
      const month = new Date(b.createdAt).getMonth();
      monthlyCounts[month]++;
    });

    return {
      labels: months,
      datasets: [
        {
          data: monthlyCounts,
          strokeWidth: 2,
        },
      ],
    };
  })();

  // Data for pie chart (percentage of bookings by user)
  const pieChartData = users.map((user) => {
    const count = bookings.filter((b) => b.name === user.name).length;
    return {
      name: user.name,
      population: count,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    };
  });

  return (
    <ScrollView style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Booking Statistics</Text>

      {/* User-based bookings */}
      <Text style={styles.chartTitle}>Bookings by User</Text>
      <BarChart
        data={userBookingData}
        width={chartWidth}
        height={250}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Monthly bookings */}
      <Text style={styles.chartTitle}>Monthly Bookings</Text>
      <LineChart
        data={monthlyBookingData}
        width={chartWidth}
        height={250}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Pie chart */}
      <Text style={styles.chartTitle}>Percentage of Bookings by User</Text>
      <PieChart
        data={pieChartData}
        width={chartWidth}
        height={250}
        chartConfig={chartConfig}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        style={styles.chart}
      />
    </ScrollView>
  );
};

const Tab = createBottomTabNavigator();

const AdminDashboardScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'You need to login first.');
        return;
      }

      // Fetching users and bookings
      const [usersResponse, bookingsResponse] = await Promise.all([
        axios.get('https://rustams-mill-backend-i7yh.onrender.com/admin/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('https://rustams-mill-backend-i7yh.onrender.com/admin/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUsers(usersResponse.data);
      setBookings(bookingsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    navigation.replace('AdminLoginScreen');
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
            borderRadius: 15,
            marginHorizontal: 10,
            elevation: 8,
          },
        }}
      >
        <Tab.Screen
          name="Bookings"
          component={() => (
            <BookingsScreen bookings={bookings} onRefresh={onRefresh} refreshing={refreshing} />
          )}
          options={{
            tabBarIcon: ({ color }) => <Icon name="bookmarks" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Users"
          component={() => (
            <UsersScreen users={users} onRefresh={onRefresh} refreshing={refreshing} />
          )}
          options={{
            tabBarIcon: ({ color }) => <Icon name="people" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Visualization"
          component={() => <VisualizationScreen users={users} bookings={bookings} />}
          options={{
            tabBarIcon: ({ color }) => <Icon name="analytics" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#6200ea',
  backgroundGradientTo: '#bb86fc',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 24,
    marginBottom: 20,
    elevation: 8,
  },
  welcomeText: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 8 },
  infoText: { fontSize: 16, color: '#777', lineHeight: 24 },
  actionContainer: { marginBottom: 20, alignItems: 'center' },
  logoutButton: {
    backgroundColor: '#f43f5e',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 6,
  },
  logoutButtonText: { fontSize: 16, color: '#fff', fontWeight: '500' },
  screenContainer: { flex: 1, padding: 16, backgroundColor: '#fff' },
  screenTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#6200ea' },
  bookingItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bookingTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  bookingDetail: { fontSize: 14, color: '#555', marginTop: 4 },
  itemName: { fontSize: 16, color: '#333' },
});

export default AdminDashboardScreen;
