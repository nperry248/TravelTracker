// app/components/Calendar/CalendarTripItem.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

interface Trip {
  id: number;
  title: string;
  startdate: string;
  enddate: string;
  status: "Ideated" | "Planned" | "Confirmed";
  people: string;
  logistic_id: number;
  notes: string;
}

interface TripItemProps {
  trip: Trip;
}

const TripItem: React.FC<TripItemProps> = ({ trip }) => {
  const startDate = new Date(trip.startdate);
  const dayNumber = startDate.getDate();
  const dayName = startDate.toLocaleString('default', { weekday: 'short' });

  return (
    <View style={styles.tripItem}>
      <View style={styles.dateContainer}>
        <Text style={styles.dayNumber}>{dayNumber}</Text>
        <Text style={styles.dayName}>{dayName}</Text>
      </View>
      <View style={styles.tripDetails}>
        <Text style={styles.tripTitle}>{trip.title}</Text>
        <Text style={styles.tripInfo}>{trip.people} • {trip.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: Colors.nearWhite,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 50,
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
  },
  dayName: {
    fontSize: 12,
    color: Colors.darkerGrey,
  },
  tripDetails: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginBottom: 5,
  },
  tripInfo: {
    fontSize: 14,
    color: Colors.darkerGrey,
  },
});

export default TripItem;