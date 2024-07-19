// app/components/Dashboard.tsx

import React, { useState } from 'react';
import {  Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, RefreshControl } from 'react-native';
import Colors from '../../../constants/Colors';
import DashboardTrip from './DashboardTrip';
import DashboardClass from './DashboardClass';
import DashboardAssignments from './DashboardAssignments';

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 100));
    setRefreshing(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.pageTitle}>Your Upcoming Events</Text>
        <DashboardTrip refresh={refreshing} />
        <DashboardClass />
        <DashboardAssignments />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nearWhite,
  },
  scrollViewContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginBottom: 20,
  },
});

export default Dashboard;
