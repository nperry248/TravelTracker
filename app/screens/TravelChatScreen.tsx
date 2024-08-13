import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import Header from '../components/Global/Header';
import NavBar from '../components/Global/NavBar';

const TravelChat = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([{ user: "Welcome to Travel Chat! How can I assist you today?", bot: "" }]);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const newChatHistory = [...chatHistory, { user: inputText, bot: '...' }];
      setChatHistory(newChatHistory);
      setInputText('');

      // Placeholder for API call
      // This is where you'd integrate the API call to the Gemini API
      // Replace the '...' in the bot's response with the actual API response

      // Example (pseudo-code):
      // const response = await fetchGeminiApi(inputText);
      // const newChatHistory = [...chatHistory, { user: inputText, bot: response }];
      // setChatHistory(newChatHistory);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>Travel Chat</Text>
      <Text style={styles.description}>
        Ask anything about your trips, places to go, things to do, tips, and more! 
        Our travel assistant is here to help you plan and enjoy your journey.
      </Text>
      <ScrollView style={styles.chatContainer}>
        {chatHistory.map((chat, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.userMessage}>You: {chat.user}</Text>
            <Text style={styles.botMessage}>Bot: {chat.bot}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about your trip..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: Colors.nearWhite,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginTop: 20,
    marginLeft: 20,
  },
  description: {
    fontSize: 16,
    color: Colors.darkerGrey,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  chatContainer: {
    padding: 20,
    flex: 1,
    marginBottom: 20,
  },
  messageContainer: {
    marginVertical: 10,
  },
  userMessage: {
    fontSize: 16,
    color: Colors.darkerBlue,
    alignSelf: 'flex-start',
  },
  botMessage: {
    fontSize: 16,
    color: Colors.darkerGrey,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.lighterGrey,
    padding: 10,
    marginBottom: 75,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.lighterGrey,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: Colors.nearWhite,
  },
  sendButton: {
    backgroundColor: Colors.darkerBlue,
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TravelChat;
