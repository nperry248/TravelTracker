// app/components/DashboardAssignments.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

const DashboardAssignments = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState([
    "Global Business Paper",
    "Phonetics Problem Set",
    "Make sure to book flight for Ibiza"
  ]);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Assignments and Notes</Text>
        <TouchableOpacity onPress={toggleEditing}>
          <FontAwesome name="edit" size={24} color={Colors.nearWhite} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.assignmentTitle}>Next Assignment: Problem Set #2</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            multiline
            placeholder="Add your notes here"
            value={notes.join("\n")}
            onChangeText={(text) => setNotes(text.split("\n"))}
          />
        ) : (
          notes.map((note, index) => (
            <Text key={index} style={styles.note}>{`\u2022 ${note}`}</Text>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.darkerBlue,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: Colors.nearWhite,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: Colors.lighterGrey,
    borderWidth: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colors.nearWhite,
    padding: 10,
    borderRadius: 5,
    height: 150,  // Increase the height of the input box
    textAlignVertical: 'top',
  },
});

export default DashboardAssignments;
