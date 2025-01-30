import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Switch,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Added MaterialIcons for Contact Us

const LandingScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showToast = (message) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
    });
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
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/50', // Replace with your logo URL
            }}
            style={styles.logo}
          />
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? '#f4a261' : '#42a5f5'}
            trackColor={{ false: '#ccc', true: '#666' }}
          />
        </View>

        {/* Welcome Text */}
        <Text
          style={[
            styles.title,
            { fontFamily: 'Cochin', color: isDarkMode ? '#fff' : '#333' },
          ]}
        >
          Rustam's Grinding Mill
        </Text>
        <Text
          style={[
            styles.subtitle,
            { fontFamily: 'Avenir', color: isDarkMode ? '#ddd' : '#555' },
          ]}
        >
          Effortless and Reliable Grinding Services
        </Text>

        {/* Header Image */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1600626337876-9cda4528ec74?q=80&w=870&auto=format&fit=crop',
          }}
          style={styles.headerImage}
          resizeMode="cover"
        />

        {/* Buttons */}
        <TouchableOpacity
          style={[styles.button, styles.adminButton]}
          onPress={() => navigation.navigate('AdminLoginScreen')}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isDarkMode ? '#fff' : '#333' },
            ]}
          >
            Admin Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.userButton]}
          onPress={() => navigation.navigate('UserLoginScreen')}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isDarkMode ? '#fff' : '#333' },
            ]}
          >
            User Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.guestButton]}
          onPress={() => {
            showToast('Guest Access Enabled');
            navigation.navigate('GuestBooking');
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isDarkMode ? '#fff' : '#333' },
            ]}
          >
            Continue as Guest
          </Text>
        </TouchableOpacity>

        {/* Contact Us Icon */}
        <TouchableOpacity
          style={styles.contactUsButton}
          onPress={() => navigation.navigate('ContactUsScreen')}
        >
          <MaterialIcons name="contact-phone" size={30} color="#fff" />
        </TouchableOpacity>


        {/* Chatbot Icon */}
        <TouchableOpacity
          style={styles.chatbotButton}
          onPress={() => navigation.navigate('ChatBotScreen')}
        >
          <Ionicons name="chatbubbles-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  darkMode: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  lightMode: {
    backgroundColor: 'rgba(250, 250, 250, 0.7)',
  },
  header: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  headerImage: {
    width: '90%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 5,
  },
  adminButton: {
    backgroundColor: '#ff7043',
  },
  userButton: {
    backgroundColor: '#42a5f5',
  },
  guestButton: {
    backgroundColor: '#66bb6a',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#6200ea',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 5,
  },
  contactUsButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    backgroundColor: '#f50057',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 5,
  },
});

export default LandingScreen;
