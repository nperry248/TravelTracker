// app/screens/TripsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Modal } from 'react-native';
import TripList from '../components/Trips/TripList';
import AddTrip from '../components/Trips/AddTrip';
import EditTrip from '../components/Trips/EditTrip';
import Logistics from '../components/Trips/Logistics';
import { initializeDatabase, getTrips, addTrip, updateTrip, deleteTrip } from '../database';
import { Trip } from '../types';
import Header from '../components/Global/Header';
import NavBar from '../components/Global/NavBar';
import Colors from '../../constants/Colors';

const TripsScreen = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingLogistics, setIsViewingLogistics] = useState(false);
  const [editTrip, setEditTrip] = useState<Trip | null>(null); 
  const [logisticsTrip, setLogisticsTrip] = useState<Trip | null>(null);

  useEffect(() => {
    initializeDatabase();
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const allTrips: Trip[] = await getTrips();

      // Sort the trips, pushing those without dates to the bottom
      const sortedTrips = allTrips.sort((a, b) => {
        const dateA = a.startdate ? new Date(a.startdate).getTime() : new Date('3000-01-01').getTime();
        const dateB = b.startdate ? new Date(b.startdate).getTime() : new Date('3000-01-01').getTime();
        return dateA - dateB;
      });

      setTrips(sortedTrips);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const handleAddTrip = () => {
    setIsAdding(true);
    setIsEditing(false);
    setIsViewingLogistics(false);
  };

  const handleEditTrip = (trip: Trip) => {
    setEditTrip(trip);
    setIsEditing(true);
    setIsAdding(false);
    setIsViewingLogistics(false);
  };

  const handleLogistics = (trip: Trip) => {
    setLogisticsTrip(trip);
    setIsViewingLogistics(true);
    setIsEditing(false);
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
    setIsAdding(false);
  };

  const handleCancelLogistics = () => {
    setIsViewingLogistics(false);
    setLogisticsTrip(null);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{ opacity: isViewingLogistics ? 0.3 : 1 }}>
        <Text style={styles.pageTitle}>Your Upcoming Trips</Text>
        {isAdding && <AddTrip onSave={handleSaveNewTrip} onCancel={handleCancelAdd}/>}
        {isEditing && editTrip && <EditTrip trip={editTrip} onUpdate={handleUpdateTrip} onDelete={handleDeleteTrip} onCancel={handleCancelEdit} />}
        {!isAdding && !isEditing && !isViewingLogistics && (
          <TripList trips={trips} onEdit={handleEditTrip} onLogistics={handleLogistics} />
        )}
      </ScrollView>
      {isViewingLogistics && logisticsTrip && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isViewingLogistics}
          onRequestClose={handleCancelLogistics}
        >
          <View style={styles.overlay}>
            <Logistics
              tripTitle={logisticsTrip.title}
              travelTo={logisticsTrip.TravelTo}
              travelBack={logisticsTrip.TravelBack}
              accommodation1={logisticsTrip.Accomodation1}
              accommodation2={logisticsTrip.Accomodation2}
              notes={logisticsTrip.notes}
              onCancel={handleCancelLogistics}
            />
          </View>
        </Modal>
      )}
      {!isAdding && !isEditing && !isViewingLogistics && (
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
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // This darkens the background
    padding: 20,
  },
});

export default TripsScreen;
