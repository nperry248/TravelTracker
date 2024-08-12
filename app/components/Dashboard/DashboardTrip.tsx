// app/components/DashboardTrip.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, Alert, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import { getTrips } from '../../database';
import { Trip } from '../../types';
import { format } from 'date-fns';

interface DashboardTripProps {
  refresh: boolean;
}

const DashboardTrip: React.FC<DashboardTripProps> = ({ refresh }) => {
  const [nextTrip, setNextTrip] = useState<Trip | null>(null);

  const fetchNextTrip = async () => {
    try {
      const trips: Trip[] = await getTrips();
      const confirmedTrips = trips.filter(trip => trip.status === 'Confirmed');
      const sortedConfirmedTrips = confirmedTrips.sort((a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime());
      const next = sortedConfirmedTrips[0]


      if (next) {
        setNextTrip(next)
      }
      else {
        setNextTrip(null);
      }


    } catch (error) {
      console.log('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchNextTrip();
  }, [refresh]);
  

  const handleLinkPress = (url: string, type: string) => {
    if (url.trim() === '') {
      Alert.alert(`${type} Plan`, "No plan yet!");
    } else {
      Linking.openURL(url);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return format(date, 'MMMM dd, yyyy');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Next Trip</Text>
      </View>
      {nextTrip ? (
        <View style={styles.card}>
          <Text style={styles.eventTitle}>{nextTrip.title}</Text>
          <Text>Dates: {`${formatDate(nextTrip.startdate)} - ${formatDate(nextTrip.enddate)}`}</Text>
          <Text>People: {nextTrip.people}</Text>
            <TouchableOpacity onPress={() => handleLinkPress(nextTrip.TravelTo, 'Transportation')}>
              <Text style={styles.hyperlink}>Travel To</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress(nextTrip.TravelBack, 'Transportation')}>
              <Text style={styles.hyperlink}>Travel Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLinkPress(nextTrip.Accomodation1, 'Accommodation')}>
              <Text style={styles.hyperlink}>Accommodation</Text>
            </TouchableOpacity>
            {nextTrip.Accomodation2 && (
            <TouchableOpacity onPress={() => handleLinkPress(nextTrip.Accomodation2, 'Accommodation')}>
              <Text style={styles.hyperlink}>Accommodation 2</Text>
            </TouchableOpacity>
            )}
            {nextTrip.ExtraTravel && (
              <TouchableOpacity onPress={() => handleLinkPress(nextTrip.ExtraTravel, 'Extra Travel')}>
                <Text style={styles.hyperlink}>Extra Travel</Text>
              </TouchableOpacity>
            )}
            {nextTrip.ExtraAccomodation && (
              <TouchableOpacity onPress={() => handleLinkPress(nextTrip.ExtraAccomodation, 'Extra Accommodation')}>
                <Text style={styles.hyperlink}>Extra Accommodation</Text>
              </TouchableOpacity>
            )}
        </View>
      ) : (
        <View style={styles.card}>
          <Text>No Current Trips Planned!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
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
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginBottom: 5,
  },
  hyperlink: {
    fontSize: 14,
    color: Colors.darkerBlue,
    textDecorationLine: 'underline',
    marginBottom: 3,
  },
});

export default DashboardTrip;
