import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import Colors from '../../../constants/Colors';
import { getTrips } from '../../database';
import { Trip } from '../../types';
import { format, isBefore, isAfter } from 'date-fns';
import Logistics from '../Trips/Logistics'; // Import the Logistics component

interface DashboardTripProps {
  refresh: boolean;
}

const DashboardTrip: React.FC<DashboardTripProps> = ({ refresh }) => {
  const [nextTrip, setNextTrip] = useState<Trip | null>(null);
  const [isViewingLogistics, setIsViewingLogistics] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // For fade-in effect

  const fetchNextTrip = async () => {
    try {
      const trips: Trip[] = await getTrips();
      const confirmedTrips = trips.filter(trip => trip.status === 'Confirmed');
      const upcomingTrips = confirmedTrips.filter(trip => isAfter(new Date(trip.enddate), new Date()));
      const sortedUpcomingTrips = upcomingTrips.sort((a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime());
      const next = sortedUpcomingTrips[0];
      setNextTrip(next)

    } catch (error) {
      console.log('Error fetching trips:', error);
    }
  };

  useEffect(() => {
    fetchNextTrip();
  }, [refresh]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date set';
    const date = new Date(dateString);
    return format(date, 'MMMM dd, yyyy');
  };

  const handleViewLogistics = () => {
    setIsViewingLogistics(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCancelLogistics = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsViewingLogistics(false));
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
          <TouchableOpacity onPress={handleViewLogistics}>
            <Text style={styles.hyperlink}>View Logistics</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <Text>No Current Trips Planned!</Text>
        </View>
      )}

      {/* Modal for Logistics */}
      {isViewingLogistics && (
        <Modal transparent visible={isViewingLogistics} animationType="fade">
          <View style={styles.modalBackground}>
            <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
              {nextTrip && (
                <Logistics 
                  tripTitle={nextTrip.title}
                  travelTo={nextTrip.TravelTo}
                  travelBack={nextTrip.TravelBack}
                  accommodation1={nextTrip.Accomodation1}
                  accommodation2={nextTrip.Accomodation2}
                  notes={nextTrip.notes}
                  onCancel={handleCancelLogistics}
                />
              )}
            </Animated.View>
          </View>
        </Modal>
      )}
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
    borderColor: Colors.darkerBlue,
    borderWidth: 1.25

  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginBottom: 5,
  },
  hyperlink: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.darkerBlue,
    textDecorationLine: 'underline',
    marginBottom: 3,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.nearWhite,
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardTrip;
