// app/components/AddTrip.tsx

import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
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
  const [travelTo, setTravelTo] = useState('');
  const [travelBack, setTravelBack] = useState('');
  const [accommodation1, setAccommodation1] = useState('');
  const [accommodation2, setAccommodation2] = useState('');
  const [extraTravel, setExtraTravel] = useState('');
  const [extraAccommodation, setExtraAccommodation] = useState('');
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
      TravelTo: travelTo,
      TravelBack: travelBack,
      Accomodation1: accommodation1,
      Accomodation2: accommodation2,
      ExtraTravel: extraTravel,
      ExtraAccomodation: extraAccommodation,
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
      <Text style={styles.label}>Travel Plans To</Text>
      <TextInput
        style={styles.input}
        value={travelTo}
        onChangeText={setTravelTo}
        placeholder="Enter primary travel details"
      />
      <Text style={styles.label}>Travel Plans Back</Text>
      <TextInput
        style={styles.input}
        value={travelBack}
        onChangeText={setTravelBack}
        placeholder="Enter return travel details"
      />
      <Text style={styles.label}>Primary Accommodation</Text>
      <TextInput
        style={styles.input}
        value={accommodation1}
        onChangeText={setAccommodation1}
        placeholder="Enter primary accommodation"
      />
      <Text style={styles.label}>Secondary Accommodation</Text>
      <TextInput
        style={styles.input}
        value={accommodation2}
        onChangeText={setAccommodation2}
        placeholder="Enter secondary accommodation (if any)"
      />
      <Text style={styles.label}>Extra Transportation</Text>
      <TextInput
        style={styles.input}
        value={extraTravel}
        onChangeText={setExtraTravel}
        placeholder="Enter extra transportation (if any)"
      />
      <Text style={styles.label}>Extra Accommodation</Text>
      <TextInput
        style={styles.input}
        value={extraAccommodation}
        onChangeText={setExtraAccommodation}
        placeholder="Enter extra accommodation (if any)"
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
