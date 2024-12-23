import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PastBookingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Past Bookings</Text>
      {/* List of past bookings or some dynamic content */}
      <Text style={styles.text}>Booking 1 - Date</Text>
      <Text style={styles.text}>Booking 2 - Date</Text>
    </View>
  );
};

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
});

export default PastBookingsScreen;
