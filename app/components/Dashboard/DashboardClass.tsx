// app/components/DashboardClass.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

const DashboardClass = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Next Class</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.classTitle}>Global Business, France at the Crossroads</Text>
        <Text>Time: Monday, 2PM</Text>
        <Text>Location: Classroom 201</Text>
        <Text>Next Assignment: Problem Set #2</Text>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  header: {
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
    backgroundColor: Colors.lighterGrey,
    padding: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  classTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginBottom: 5,
  },
});

export default DashboardClass;
