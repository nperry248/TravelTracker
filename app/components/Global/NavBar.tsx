import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter, usePathname } from 'expo-router';
import Colors from '../../../constants/Colors';

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/(tabs)' && (pathname === '/' || pathname === '/index' || pathname === '/(tabs)')) {
      return true;
    }
    return pathname.startsWith(route);
  };

  const getIconColor = (route: string) => {
    return isActive(route) ? Colors.darkerBlue : Colors.darkerGrey;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/calendar')}>
        <FontAwesome name="calendar" size={24} color={getIconColor('/calendar')} />
        <Text style={styles.iconText}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/trips')}>
        <FontAwesome name="map" size={24} color={getIconColor('/trips')} />
        <Text style={styles.iconText}>Trips</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/(tabs)')}>
        <FontAwesome name="home" size={24} color={getIconColor('/(tabs)')} />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/travelChat')}>
        <Entypo name="chat" size={24} color={getIconColor('/travelChat')} />
        <Text style={styles.iconText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={() => router.push('/media')}>
        <FontAwesome name="photo" size={24} color={getIconColor('/media')} />
        <Text style={styles.iconText}>Media</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: Colors.nearWhite,
    borderTopWidth: 1,
    borderColor: Colors.lighterGrey,
    paddingBottom: 25,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
  },

  iconText: {
    fontSize: 10,
    color: Colors.darkerGrey,
    marginTop: 2,
  },
});

export default NavBar;
