// app/components/EditTrip.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../../constants/Colors';
import { Trip } from '../../types';
import DateTimePicker from '@react-native-community/datetimepicker';

interface EditTripProps {
  trip: Trip;
  onUpdate: (trip: Trip) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
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

const EditTrip: React.FC<EditTripProps> = ({ trip, onUpdate, onCancel, onDelete }) => {
  const [title, setTitle] = useState(trip.title);
  const [startDate, setStartDate] = useState<Date | null>(trip.startdate ? new Date(trip.startdate) : null);
  const [endDate, setEndDate] = useState<Date | null>(trip.enddate ? new Date(trip.enddate) : null);
  const [status, setStatus] = useState<'Ideated' | 'Planned' | 'Confirmed'>(trip.status);
  const [people, setPeople] = useState(trip.people);
  const [travelTo, setTravelTo] = useState('');
  const [travelBack, setTravelBack] = useState('');
  const [accommodation1, setAccommodation1] = useState('');
  const [accommodation2, setAccommodation2] = useState('');
  const [extraTravel, setExtraTravel] = useState('');
  const [extraAccommodation, setExtraAccommodation] = useState('');
  const [notes, setNotes] = useState(trip.notes);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleUpdate = () => {
    const updatedTrip = {
      ...trip,
      title,
      startdate: startDate ? startDate.toISOString().split('T')[0] : '',
      enddate: endDate ? endDate.toISOString().split('T')[0] : '',
      status,
      people,
      travelTo,
      travelBack,
      accommodation1,
      accommodation2,
      extraTravel,
      extraAccommodation,
      notes
    };
    onUpdate(updatedTrip);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(trip.id)
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: Colors.red }]} onPress={handleDelete}>
        <Text style={styles.saveButtonText}>Delete Trip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: Colors.lighterGrey }]} onPress={onCancel}>
        <Text style={styles.saveButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  dateInput: {
    borderWidth: 1,
    borderColor: Colors.lighterGrey,
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: Colors.lighterGrey,
    padding: 0,
    borderRadius: 5,
    marginBottom: 15,
    color: 'black',
  },
  saveButton: {
    backgroundColor: Colors.darkerBlue,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditTrip;
