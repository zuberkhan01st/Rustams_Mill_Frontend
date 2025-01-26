import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

const ResetPasswordScreen = ({ route,navigation }) => {
  const { username } = route.params;
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes = 300 seconds

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(countdown);
        Alert.alert("OTP Expired", "The OTP has expired. Please request a new one.");
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleResetPassword = async () => {
    try {
      const response = await fetch("https://rustams-mill-backend-i7yh.onrender.com/user/changepass", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, otp, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Password Reset Successful", "You can now log in with your new password.");
        navigation.navigate("UserLoginScreen");
      } else {
        Alert.alert("Error", data.message || "Unable to reset password.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{`Time remaining: ${Math.floor(timer / 60)}:${timer % 60}`}</Text>

      <TextInput
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter OTP"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="Enter New Password"
        placeholderTextColor="#888"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
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
  timerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#f00",
    marginBottom: 20,
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

export default ResetPasswordScreen;
