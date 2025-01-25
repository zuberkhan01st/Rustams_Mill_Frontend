import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatbotScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: "Welcome to Rustam's Grinding Mill App!", sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backendAPI = 'http://192.168.4.245:5000/chatbot/chat'; // Replace with your backend API URL

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { id: `${Date.now()}`, text: inputText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(backendAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();

      if (data && data.text) {
        const botMessage = { id: `${Date.now() + 1}`, text: data.text, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const errorMessage = {
          id: `${Date.now() + 1}`,
          text: 'Something went wrong. Please try again later.',
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: `${Date.now() + 1}`,
        text: 'Error connecting to the chatbot. Please check your internet connection.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'bot' ? styles.botMessage : styles.userMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Header with Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chatbot</Text>
      </View>

      {/* Chat Messages */}
  
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />

      {isLoading && (
        <ActivityIndicator size="large" color="#42a5f5" style={styles.loadingIndicator} />
      )}

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20, // Increased height for a larger blue bar
    backgroundColor: '#3f51b5',
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24, // Larger font size for emphasis
    color: '#fff',
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 10,
  },
  loadingIndicator: {
    marginVertical: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e8f0fe',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#42a5f5',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -3 },
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default ChatbotScreen;
