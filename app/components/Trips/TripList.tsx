// app/components/TripList.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import TripCard from './TripCard';
import { Trip } from '../../types';

interface TripListProps {
  trips: Trip[];
  onEdit: (trip: Trip) => void;
  onLogistics: (trip: Trip) => void; // New prop for logistics
}

const TripList: React.FC<TripListProps> = ({ trips, onEdit, onLogistics }) => {
  return (
    <View style={styles.container}>
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          title={trip.title}
          startdate={trip.startdate}
          enddate={trip.enddate}
          status={trip.status}
          people={trip.people}
          notes={trip.notes}
          onEdit={() => onEdit(trip)}
          onLogistics={() => onLogistics(trip)} // Pass logistics handler
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});

export default TripList;
