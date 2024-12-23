import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const NewBookingScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  const handleBooking = () => {
    console.log('Booking Details:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Booking Date:', bookingDate);
    // Add any backend API call for saving the booking data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Make a New Booking</Text>

      {/* Input fields for booking details */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter booking date (DD/MM/YYYY)"
        value={bookingDate}
        onChangeText={setBookingDate}
      />

      {/* Book Now Button */}
      <TouchableOpacity style={styles.button} onPress={() => {
            
            navigation.navigate('GuestBooking');
          }}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
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
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
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

export default NewBookingScreen;
