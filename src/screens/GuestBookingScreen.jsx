import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, TextInput, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';  // Import Ionicons for the back arrow
import axios from 'axios';  // Import axios for making HTTP requests

const LandingScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'top',
    });
  };

  const options = [
    { id: 1, title: 'Wheat', price: "Grinding: RS 40 Per 10KG", description: 'Check current wheat prices for grinding', image: 'https://tinyurl.com/mrx4xwk3' },
    { id: 2, title: 'Jawari', price: "Grinding: RS 40  Per 10KG", description: 'Check current bajra prices for grinding', image: 'https://4.imimg.com/data4/WX/AL/MY-30813400/bajra-seed-500x500.jpg' },
    { id: 3, title: 'Rice', price: "Grinding: RS 50 Per 10KG", description: 'Check current rice prices for grinding', image: 'https://tinyurl.com/37r5hkbj' },
    { id: 4, title: 'Besan (Chana)', price: "Grinding: RS 50 Per KG", description: 'Check current maize prices for grinding', image: 'https://i0.wp.com/vaerorganic.com/wp-content/uploads/2021/01/besan-flour-2-scaled.jpg?fit=2560%2C2560&ssl=1' },
    { id: 5, title: 'Wet Rice', price: "Grinding: RS 100 Per 10KG", description: 'Check current barley prices for grinding', image: 'https://static.toiimg.com/thumb/msid-102354095,width-1280,height-720,resizemode-4/102354095.jpg' }
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleBooking = async () => {
    if (name && phone && address && selectedOption) {
      try {
        // Make the POST request to the backend
        const response = await axios.post('http://192.168.234.245:5000/guest/book', {
          name,
          phone,
          address,
          item: selectedOption.title, // Sending the selected option's title
        });

        // Check for success
        if (response.data.message === 'Booking successfully made') {
          showToast('Booking Successfully made!');
        } else {
          showToast('Booking failed. Please try again.');
        }
      } catch (error) {
        console.error(error);
        showToast('Error: Could not make booking');
      }
    } else {
      showToast('Please fill in your details and select an option');
    }
  };

  return (
    <ImageBackground
      source={{
        uri: isDarkMode
          ? 'https://images.unsplash.com/photo-1606228969980-e5c38f6dbac3?q=80&w=870&auto=format&fit=crop&blur=25'
          : 'https://images.unsplash.com/photo-1596495577886-d920f1c48a4b?q=80&w=870&auto=format&fit=crop&blur=25',
      }}
      style={styles.background}
    >
      <View style={[styles.overlay, isDarkMode ? styles.darkMode : styles.lightMode]}>
        
        {/* Back Button with Screen Title */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDarkMode ? styles.darkText : styles.lightText]}>
            Rustam's Grinding Mill
          </Text>
        </View>

        <Text style={[styles.subtitle, isDarkMode ? styles.darkText : styles.lightText]}>
          Choose option for Booking 👇
        </Text>

        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOption?.id === option.id && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Image source={{ uri: option.image }} style={styles.optionImage} />
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionTitle, isDarkMode ? styles.darkText : styles.lightText]}>
                  {option.title}
                </Text>
                <Text style={[styles.optionDescription, isDarkMode ? styles.darkText : styles.lightText]}>
                  {option.price}
                </Text>
                <Text style={[styles.optionDescription, isDarkMode ? styles.darkText : styles.lightText]}>
                  {option.description}
                </Text>
              </View>
              <Text
                style={[
                  styles.selectButtonText,
                  selectedOption?.id === option.id && styles.selectedButtonText,
                ]}
              >
                {selectedOption?.id === option.id ? 'Selected' : 'Select'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {selectedOption && (
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
              placeholder="Enter Your Name"
              placeholderTextColor={isDarkMode ? '#ddd' : '#888'}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
              placeholder="Enter Your Phone Number"
              placeholderTextColor={isDarkMode ? '#ddd' : '#888'}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
              placeholder="Enter Your Address"
              placeholderTextColor={isDarkMode ? '#ddd' : '#888'}
              value={address}
              onChangeText={setAddress}
            />

            <TouchableOpacity style={[styles.button, styles.bookButton]} onPress={handleBooking}>
              <Text style={styles.buttonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, paddingTop: 50 },
  darkMode: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  lightMode: { backgroundColor: 'rgba(250, 250, 250, 0.7)' },
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 20, textAlign: 'center', marginBottom: 30 },
  darkText: { color: '#fff' },
  lightText: { color: '#000' },
  optionsContainer: { width: '100%', paddingVertical: 20 },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '100%',
    height: 150,
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  optionImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  optionTextContainer: { flex: 1 },
  optionTitle: { fontSize: 18, fontWeight: 'bold' },
  optionDescription: { fontSize: 14, color: '#888' },
  selectButtonText: {
    color: '#66bb6a',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#66bb6a',
    textAlign: 'center',
  },
  selectedButtonText: {
    color: '#fff',
    backgroundColor: '#4caf50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    textAlign: 'center',
  },
  formContainer: { width: '80%', marginTop: 20 },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  darkInput: { backgroundColor: '#333', borderColor: '#444', color: '#fff' },
  lightInput: { backgroundColor: '#fff', borderColor: '#ccc', color: '#000' },
  button: { width: '100%', paddingVertical: 14, borderRadius: 0, marginVertical: 10, alignItems: 'center' },
  bookButton: { backgroundColor: '#ff6347' },
  guestButton: { backgroundColor: '#4682b4' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { paddingRight: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
});

export default LandingScreen;
