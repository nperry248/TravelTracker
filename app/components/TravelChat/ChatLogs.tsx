import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { getChatLogs, deleteChatLog, initializeDatabase } from '../../database';  // Import the functions to fetch and delete logs from the database

// Define the types for the props and state
interface ChatLog {
  log_id: number;
  query_name: string;
  query_response: string;
}

interface ChatLogsProps {
  onClose: () => void;
}

const ChatLogs: React.FC<ChatLogsProps> = ({ onClose }) => {
  const [logs, setLogs] = useState<ChatLog[]>([]);

  useEffect(() => {
    initializeDatabase();
    const fetchLogs = async () => {
      try {
        const savedLogs: ChatLog[] = await getChatLogs();
        setLogs(savedLogs);
      } catch (error) {
        console.error('Error fetching chat logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const handleDelete = async (logId: number) => {
    try {
      await deleteChatLog(logId);
      setLogs(prevLogs => prevLogs.filter(log => log.log_id !== logId));
    } catch (error) {
      console.error('Error deleting chat log:', error);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.logModal}>
        <Text style={styles.modalHeader}>Saved Chats</Text>
        <ScrollView style={styles.logsContainer}>
          {logs.map((log) => (
            <View key={log.log_id} style={styles.logItem}>
              <View style={styles.logHeader}>
                <Text style={styles.queryName}>{log.query_name}</Text>
                <TouchableOpacity 
                  style={styles.deleteButton} 
                  onPress={() => handleDelete(log.log_id)}
                >
                  <Text style={styles.deleteButtonText}>-</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.queryResponse}>{log.query_response}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logModal: {
    width: '80%',
    backgroundColor: Colors.nearWhite,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.darkerBlue,
    fontFamily: 'futura'
  },
  logsContainer: {
    width: '100%',
    height: '75%',
  },
  logItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lighterGrey,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5, // Space between the header and the response text
  },
  queryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    fontFamily: 'futura'
  },
  queryResponse: {
    fontSize: 14,
    color: Colors.darkerGrey,
    fontFamily: 'futura'
  },
  deleteButton: {
    backgroundColor: Colors.red,
    borderRadius: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'futura'
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Colors.darkerBlue,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'futura'
  },
});

export default ChatLogs;
