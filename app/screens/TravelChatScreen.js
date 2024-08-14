// // app/screens/TravelChatScreen.tsx

import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, RefreshControl} from 'react-native'
import Colors from '../../constants/Colors'
import Header from '../components/Global/Header'
import NavBar from '../components/Global/NavBar'


const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const TravelChat = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [interest, setInterest] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleSend = useCallback(async () => {
    if (inputText.trim() !== '') {
      // Add the user's message to the chat history
      const newChatHistory = [...chatHistory, { user: inputText, bot: '...' }];
      setChatHistory(newChatHistory);
      const userInput = inputText; // Save the user input to be displayed with the bot response
      setInputText('');

      try {
        const result = await model.generateContent(
          `${userInput}\n\n
          Everything before this is the input. Please respond with a concise answer, preferably 4-5 bullet points or a few sentences, focused on the following interest: ${interest}.
          You are a bot for study abroad experiences, so tailor your response to an age group of 18-25 years old in Europe`
          );
        const responseText = result.response.text(); // Accessing the text from the response
        responeText = responseText

        setChatHistory(prevHistory => {
          const updatedHistory = [...prevHistory];
          updatedHistory[updatedHistory.length - 1].bot = responseText || 'No response received';
          return updatedHistory;
        });
      } catch (error) {
        console.error('Error fetching from API:', error);
        setChatHistory(prevHistory => {
          const updatedHistory = [...prevHistory];
          updatedHistory[updatedHistory.length - 1].bot = 'Sorry, there was an error processing your request.';
          return updatedHistory;
        });
      }
    }
  }, [inputText, chatHistory, interest]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setChatHistory([]); // Clear the chat history
    setInterest(''); // Reset the interest input
    setRefreshing(false);
  }, []);


  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.header}>Travel Chat</Text>
        <Text style={styles.description}>
          Ask anything about your trips, places to go, things to do, tips, and more! 
        </Text>

        <View style={styles.interestContainer}>
          <Text style={styles.interestLabel}>Anything Specific in Mind?</Text>
          <TextInput
            style={styles.interestInput}
            value={interest}
            onChangeText={setInterest}
            placeholder="E.g., historical, having fun, exploring nature"
            accessibilityLabel="Interest input"
          />
        </View>

        <View style={styles.chatContainer}>
          {chatHistory.map((chat, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text style={styles.userMessage}>You: {chat.user}</Text>
              <Text style={styles.botMessage}>Travel Chat: {chat.bot}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask about your trip..."
          accessibilityLabel="Chat input"
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
          accessibilityLabel="Send message"
        >
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
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginTop: 20,
    marginLeft: 20,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.darkerGrey,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  interestContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  interestLabel: {
    fontSize: 16,
    color: Colors.darkerBlue,
    marginBottom: 5,
  },
  interestInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.lighterGrey,
    borderRadius: 5,
    backgroundColor: Colors.nearWhite,
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