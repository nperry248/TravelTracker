import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getTrips } from '../database';
import Colors from '../../constants/Colors';
import Header from '../components/Global/Header';
import NavBar from '../components/Global/NavBar';
import { format } from 'date-fns';

interface Trip { 
  id: number;
  title: string;
  startdate: string;
  enddate: string;
  status: string;
  people: string;
  transportation: string;
  accommodation: string;
  notes: string;
}

interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
    disabled?: boolean;
  };
}

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTrips, setSelectedTrips] = useState<Trip[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTrips = useCallback(async () => {
    try {
      const fetchedTrips = await getTrips() as Trip[];
      setTrips(fetchedTrips);
      const marked: MarkedDates = {};
      
      fetchedTrips.forEach(trip => {
        const startDate = new Date(trip.startdate);
        const endDate = new Date(trip.enddate);
        
        // Shift start date one day earlier
        startDate.setDate(startDate.getDate() - 1);
        
        for (let d = new Date(startDate); d < endDate;) {
          const dateString = d.toISOString().split('T')[0];
          marked[dateString] = { marked: true, dotColor: Colors.darkerBlue };
          d.setDate(d.getDate() + 1);
        }
      });
  
      setMarkedDates(marked);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTrips();
    setRefreshing(false);
  }, [fetchTrips]);

  const onDayPress = (day: { dateString: string }) => {
    const newMarkedDates = { ...markedDates };
    Object.keys(newMarkedDates).forEach(key => {
      newMarkedDates[key] = { ...newMarkedDates[key], selected: false };
    });
    newMarkedDates[day.dateString] = { 
      ...newMarkedDates[day.dateString], 
      selected: true, 
      selectedColor: Colors.darkerBlue 
    };
    setMarkedDates(newMarkedDates);
    setSelectedDate(day.dateString);
  
    const selectedDate = new Date(day.dateString);
    selectedDate.setHours(0, 0, 0, 0);  // Set time to midnight for accurate comparison
  
    const tripsOnSelectedDate = trips.filter(trip => {
      const startDate = new Date(trip.startdate);
      const endDate = new Date(trip.enddate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      
      // Adjust start date one day earlier for comparison
      startDate.setDate(startDate.getDate() - 1);
      
      // Check if selected date is within the adjusted range
      return selectedDate >= startDate && selectedDate < endDate;
    });
    
    setSelectedTrips(tripsOnSelectedDate);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.header}>Calendar</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={markedDates}
            onDayPress={onDayPress}
            theme={{
              backgroundColor: Colors.nearWhite,
              calendarBackground: Colors.nearWhite,
              textSectionTitleColor: Colors.lighterGrey,
              selectedDayBackgroundColor: Colors.darkerBlue,
              selectedDayTextColor: Colors.nearWhite,
              todayTextColor: Colors.darkerBlue,
              dayTextColor: Colors.darkerGrey,
              textDisabledColor: Colors.lighterGrey,
              dotColor: Colors.darkerBlue,
              selectedDotColor: Colors.nearWhite,
              arrowColor: Colors.darkerBlue,
              monthTextColor: Colors.darkerBlue,
              indicatorColor: Colors.darkerBlue,
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}
          />
        </View>
        <View style={styles.tripInfoContainer}>
          {selectedDate && (
            selectedTrips.length > 0 ? (
              <ScrollView style={styles.tripList}>
                {selectedTrips.map(trip => (
                  <View key={trip.id} style={styles.tripCard}>
                    <Text style={styles.tripTitle}>{trip.title}</Text>
                    <Text style={styles.tripDates}>
                      {formatDate(trip.startdate)} - {formatDate(trip.enddate)}
                    </Text>
                    <Text style={styles.tripDates}>
                        {trip.status}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <Text style={styles.noEventsText}>No Events Today!</Text>
            )
          )}
        </View>
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nearWhite,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    marginTop: 25,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.darkerBlue,
    paddingHorizontal: 20,
    fontFamily: 'futura'
  },
  calendarContainer: {
    paddingHorizontal: 20,
  },
  tripInfoContainer: {
    flex: 0.5,
    padding: 20,
    justifyContent: 'center',
  },
  noEventsText: {
    fontSize: 18,
    color: Colors.darkerGrey,
    textAlign: 'center',
  },
  tripList: {
    maxHeight: 10000,
  },
  tripCard: {
    backgroundColor: Colors.lighterGrey,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tripTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
    marginBottom: 5,
  },
  tripDetail: {
    fontSize: 16,
    color: Colors.darkerGrey,
    marginBottom: 5,
  },
  tripLink: {
    fontSize: 16,
    color: Colors.darkerBlue,
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  tripDates: {
    fontSize: 14,
    color: Colors.darkerGrey,
  },
});

export default CalendarScreen;
