// app/components/AddTrip.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../../constants/Colors';
import { Trip } from '../../types';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddTripProps {
  onSave: (trip: Omit<Trip, 'id'>) => void;
  onCancel: () => void;
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  return `${month} ${day}`;
};

const AddTrip: React.FC<AddTripProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [status, setStatus] = useState<'Ideated' | 'Planned' | 'Confirmed'>('Ideated');
  const [people, setPeople] = useState('');
  const [transportation, setTransportation] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [notes, setNotes] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSave = () => {
    if (title.trim() === '') {
      Alert.alert('Validation Error', 'Trip name is required');
      return;
    }

    const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : '';
    const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : '';

    const newTrip = {
      title,
      startdate: formattedStartDate,
      enddate: formattedEndDate,
      status,
      people,
      transportation,
      accommodation,
      notes
    };

    onSave(newTrip);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Trip Name</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter trip name"
      />
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateInput}>
        <Text>{startDate ? formatDate(startDate) : 'Select start date'}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartDatePicker(Platform.OS === 'ios');
            if (date) setStartDate(date);
          }}
        />
      )}
      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateInput}>
        <Text>{endDate ? formatDate(endDate) : 'Select end date'}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowEndDatePicker(Platform.OS === 'ios');
            if (date) setEndDate(date);
          }}
        />
      )}
      <Text style={styles.label}>Status</Text>
      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={(itemValue) => setStatus(itemValue as 'Ideated' | 'Planned' | 'Confirmed')}
      >
        <Picker.Item label="Ideated" value="Ideated" />
        <Picker.Item label="Planned" value="Planned" />
        <Picker.Item label="Confirmed" value="Confirmed" />
      </Picker>
      <Text style={styles.label}>People</Text>
      <TextInput
        style={styles.input}
        value={people}
        onChangeText={setPeople}
        placeholder="Enter people"
      />
      <Text style={styles.label}>Transportation</Text>
      <TextInput
        style={styles.input}
        value={transportation}
        onChangeText={setTransportation}
        placeholder="Enter transportation URL"
      />
      <Text style={styles.label}>Accommodation</Text>
      <TextInput
        style={styles.input}
        value={accommodation}
        onChangeText={setAccommodation}
        placeholder="Enter accommodation URL"
      />
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Enter notes"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Trip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: Colors.lighterGrey }]} onPress={onCancel}>
        <Text style={styles.saveButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 100
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lighterGrey,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: 'black',
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors.lighterGrey,
    padding: 0,
    borderRadius: 5,
    marginBottom: 15,
    color: 'black',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: Colors.lighterGrey,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: Colors.darkerBlue,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTrip;
