// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios'; // Import axios
import { Ionicons } from '@expo/vector-icons'; // For icons
import AsyncStorage from '@react-native-async-storage/async-storage'; // To store the token

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      // Replace this URL with your backend URL
      const response = await axios.post('http://192.168.244.245:5000/admin/login', {
        username: username,
        password: password,
      });

      console.log(response.data); // Log the response to check the structure

      if (response.data.token) {
        // Store the token for future requests
        await AsyncStorage.setItem('token', response.data.token);

        // Directly navigate to AdminDashboardScreen without showing an alert
        navigation.replace('AdminDashboard');
      } else {
        Alert.alert('Error', response.data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Login Failed', 'Invalid username or password. Please try again.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#6200ea" style={styles.icon} />
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholder="Enter your username"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#6200ea" style={styles.icon} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholder="Enter your password"
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#6200ea" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#6200ea',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 15,
    fontSize: 16,
    color: '#333',
    borderRadius: 30,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
