// app/components/Trips/Logistics.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import Colors from '../../../constants/Colors';

interface LogisticsProps {
  travelTo: string;
  travelBack: string;
  accommodation1: string;
  accommodation2: string;
  extraTravel?: string;
  extraAccommodation?: string;
  notes: string;
  onCancel: () => void;
}

const Logistics: React.FC<LogisticsProps> = ({
  travelTo,
  travelBack,
  accommodation1,
  accommodation2,
  extraTravel,
  extraAccommodation,
  notes,
  onCancel
}) => {

  const handleLinkPress = (url: string, type: string) => {
    if (url.trim() === '') {
      Alert.alert(`${type} Information`, "No information available.");
    } else {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Logistics</Text>
      <View style={styles.linkContainer}>
        <Text style={styles.label}>Travel To:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(travelTo, 'Travel To')}>
          <Text style={styles.link}>Confirmation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.label}>Travel Back:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(travelBack, 'Travel Back')}>
          <Text style={styles.link}>Confirmation</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.label}>Accommodation 1:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(accommodation1, 'Accommodation 1')}>
          <Text style={styles.link}>Confirmation</Text>
        </TouchableOpacity>
      </View>
      {accommodation2 && (
      <View style={styles.linkContainer}>
        <Text style={styles.label}>Accommodation 2:</Text>
        <TouchableOpacity onPress={() => handleLinkPress(accommodation2, 'Accommodation 2')}>
          <Text style={styles.link}>Confirmation</Text>
        </TouchableOpacity>
      </View>
      )}
      {extraTravel && (
        <View style={styles.linkContainer}>
          <Text style={styles.label}>Extra Travel:</Text>
          <TouchableOpacity onPress={() => handleLinkPress(extraTravel, 'Extra Travel')}>
            <Text style={styles.link}>Confirmation</Text>
          </TouchableOpacity>
        </View>
      )}
      {extraAccommodation && (
        <View style={styles.linkContainer}>
          <Text style={styles.label}>Extra Accommodation:</Text>
          <TouchableOpacity onPress={() => handleLinkPress(extraAccommodation, 'Extra Accommodation')}>
            <Text style={styles.link}>Extra accommodation link</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.notes}>{notes}</Text>
      <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 20,
    backgroundColor: Colors.nearWhite,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    height: 1000

  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.darkerBlue,
  },
  linkContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkerGrey,
  },
  link: {
    fontSize: 16,
    color: Colors.darkerBlue,
    textDecorationLine: 'underline',
  },
  notes: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.darkerGrey,
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: Colors.darkerBlue,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Logistics;
