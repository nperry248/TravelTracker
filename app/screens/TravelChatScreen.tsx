import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import NavBar from '../components/Global/NavBar';
import Header from '../components/Global/Header';
import Dashboard from '../components/Dashboard/Dashboard';

const TravelChatScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
        <Dashboard />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
});

export default TravelChatScreen;
