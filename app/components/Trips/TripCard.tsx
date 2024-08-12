// app/components/TripCard.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import { format } from 'date-fns';

interface TripCardProps {
  title: string;
  startdate: string;
  enddate: string;
  status: 'Ideated' | 'Planned' | 'Confirmed';
  people: string;
  notes: string;
  onEdit: () => void;
  onLogistics: () => void; // Add this prop
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ideated':
      return Colors.red;
    case 'Planned':
      return Colors.yellow;
    case 'Confirmed':
      return Colors.green;
    default:
      return Colors.red;
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return 'No Date Set';
  const date = new Date(dateString);
  return format(date, 'MMMM dd, yyyy');
};

const TripCard: React.FC<TripCardProps> = ({
  title,
  startdate,
  enddate,
  status,
  people,
  notes,
  onEdit,
  onLogistics, // Add this prop
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
      <View style={[styles.card, { borderLeftColor: getStatusColor(status) }]}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.detail}>{`${formatDate(startdate)} - ${formatDate(enddate)}`}</Text>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity onPress={onEdit}>
              <FontAwesome name="edit" size={20} color={Colors.darkerBlue} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <FontAwesome
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color={Colors.darkerBlue}
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {isExpanded && (
          <>
            <Text style={styles.detail}>Status: {status}</Text>
            <Text style={styles.detail}>With: {people}</Text>
            <Text style={styles.detail}>Notes: {notes}</Text>
            <TouchableOpacity onPress={onLogistics}>
              <Text style={styles.logisticsLink}>View Logistics</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: Colors.nearWhite,
    borderRadius: 8,
    borderLeftWidth: 10,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkerBlue,
  },
  detail: {
    fontSize: 14,
    color: Colors.darkerGrey,
    marginBottom: 3,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  logisticsLink: {
    fontSize: 14,
    color: Colors.darkerBlue,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default TripCard;
