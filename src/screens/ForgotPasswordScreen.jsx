import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

const ForgotPasswordScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleRequestOTP = async () => {
    try {
      const response = await fetch("https://rustams-mill-backend-i7yh.onrender.com/user/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("OTP Sent", "An OTP has been sent to your email.");
        navigation.navigate("ResetPassword", { username });
      } else {
        Alert.alert("Error", data.message || "Unable to send OTP.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter Username"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleRequestOTP}>
        <Text style={styles.buttonText}>Request OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ForgotPasswordScreen;
