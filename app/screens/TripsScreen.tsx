// app/screens/TripsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import TripList from '../components/Trips/TripList';
import AddTrip from '../components/Trips/AddTrip';
import EditTrip from '../components/Trips/EditTrip';
import { initializeDatabase, getTrips, addTrip, updateTrip, deleteTrip } from '../database';
import { Trip } from '../types';
import Header from '../components/Global/Header';
import NavBar from '../components/Global/NavBar';
import Colors from '../../constants/Colors';

const TripsScreen = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTrip, setEditTrip] = useState<Trip | null>(null);

  useEffect(() => {
    initializeDatabase();
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const trips = await getTrips();
    // Sort trips by start date
    const sortedTrips = trips.sort((a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime());
    setTrips(sortedTrips);
  };

  const handleAddTrip = () => {
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEditTrip = (trip: Trip) => {
    setEditTrip(trip);
    setIsEditing(true);
    setIsAdding(false);
  };

  const handleSaveNewTrip = async (newTrip: Omit<Trip, 'id'>) => {
    await addTrip(newTrip);
    fetchTrips();
    setIsAdding(false);
  };

  const handleUpdateTrip = async (updatedTrip: Trip) => {
    await updateTrip(updatedTrip);
    fetchTrips();
    setIsEditing(false);
    setEditTrip(null);
  };

  const handleDeleteTrip = async (id: number) => {
    await deleteTrip(id);
    fetchTrips();
    setIsEditing(false);
    setEditTrip(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTrip(null);
  };

  const handleCancelAdd = () => {
    fetchTrips();
    setIsAdding(false);
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
      <Text style={styles.pageTitle}>Your Upcoming Trips</Text>
        {isAdding && <AddTrip onSave={handleSaveNewTrip} onCancel={handleCancelAdd}/>}
        {isEditing && editTrip && <EditTrip trip={editTrip} onUpdate={handleUpdateTrip} onDelete={handleDeleteTrip} onCancel={handleCancelEdit} />}
        {!isAdding && !isEditing && <TripList trips={trips} onEdit={handleEditTrip} />}
      </ScrollView>
      {!isAdding && !isEditing && (
        <TouchableOpacity style={styles.fab} onPress={handleAddTrip}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.nearWhite,
    paddingBottom: 85,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: Colors.darkerBlue,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 75
  },
  fabText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 2
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    margin: 20,
  }
});

export default TripsScreen;
